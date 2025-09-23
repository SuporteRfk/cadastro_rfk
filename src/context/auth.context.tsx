/* eslint-disable @typescript-eslint/no-unused-vars */
import { ILoginRequest, IToastifyMessageAuthContext, ITokenBearer, ITokenRefresh, IUser } from "@/interfaces";
import { buildUserFromToken, decodeToken, handleApiError } from "@/utils";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Login, Logout, RefreshToken } from "@/services/keycloak-api";
import { Toastify } from "@/components";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { upsertUserApprover, upsertUserFiscal } from "@/services/supabase";
import { useNavigate } from "react-router-dom";

interface IAuthContextType {
    user: IUser | null;
    isAuthenticated: boolean | null;
    isLoading: boolean;
    loginService: (data: ILoginRequest) => Promise<void>;
    logoutService: (toast?:IToastifyMessageAuthContext) => Promise<void>;
};
 
// 🔹 Criando o contexto de autenticação
export const AuthContext = createContext<IAuthContextType>({
    user: null,
    isAuthenticated: true,
    loginService: async (_dataLogin: ILoginRequest) => {},
    logoutService: async (_toast:IToastifyMessageAuthContext | undefined) => {},
    isLoading: false,
});

// 🔹 Variável global para armazenar o timeout de renovação de token, evitando multiplos agendamentos.
let refreshTimeout: NodeJS.Timeout | null = null;

export const AuthProvider = ({children}:{children:ReactNode}) => {
    const [user, setUser] = useState<IUser | null>(null); //🔹Estado para armazenar os dados do usuário
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); //🔹Estado que indica se o usuário está autenticado 
    const [isLoading, setIsLoading] = useState<boolean>(false); // 🔹 Estado para controlar o loading de transição
    const [toastMessage, setToastMessage] = useState<IToastifyMessageAuthContext | null>(null);   // 🔹Estado para armazenar uma notificação pendente (Toastify) que será exibida após o carregamento 
    const navigate = useNavigate();

    //🔹useEffect que verifica a sessão ao carregar a aplicação
    useEffect(() => {
        checkSession();
        // 🔹 Se o usuário estiver autenticado, ativa a checagem periódica da sessão
        if (isAuthenticated) {
            const sessionInterval = setInterval(() => {
                checkSession();
            }, 300000); // 300000 ms = 5 minutos
            return () => clearInterval(sessionInterval); // 🔹 Limpa o intervalo ao desmontar 
        }
    }, [isAuthenticated]); // 🔹 Executa quando isAuthenticated muda 


    useEffect(() => {
        if (!isLoading && toastMessage) {
            Toastify({ ...toastMessage });
            setToastMessage(null); // 🔹Limpa a mensagem após exibição 
        }
    },[isLoading, toastMessage])


    //🔹Realiza o login e armazena os tokens nos cookies
    const loginService = async (data:ILoginRequest) => {
        
        try {
            const {access_token, refresh_token} = await Login(data);
            
            //🔹Armazena os tokens nos cookies 
            const isSecure = window.location.protocol === "https:";
            if(isSecure){
                Cookies.set("access_token_keycloak_cad_rfk", access_token, { secure: isSecure});
                Cookies.set("refresh_token_keycloak_cad_rfk", refresh_token, { secure: isSecure});
            }else{
                localStorage.setItem("access_token_keycloak_cad_rfk", access_token);
                localStorage.setItem("refresh_token_keycloak_cad_rfk", refresh_token);
            }

            //🔹Decodifica o token e extrai as informações do usuário
            const tokenDecoded:ITokenBearer = decodeToken(access_token) as ITokenBearer;
            const user = buildUserFromToken(tokenDecoded);
            
            setUser(user);
            await registerUpdateUserController(user); // verificar se o usuario é da controladoria e salvando no banco
            await registerUpdateUserFiscal(user); // verificar se o usuario é responsável pela regra do fiscal e salvando no banco
            setIsAuthenticated(true);
            
            setIsLoading(true);
            navigate("/dashboard", {replace:true});
            /// 🔹Define mensagem de boas vindas ao logar
            setToastMessage({
                type: "success",
                message: `Bem vindo ${user.fullName}`,
                duration: 3000
            })
           // fazer funcao de atualizar ou inserir usuario da controladoria

        } catch (error) {
            const message = error instanceof AxiosError 
                ? (error.status === 401 ? 'Usuário ou senha incorretos' : error.message)
                : "Erro inesperado. Tente novamente em alguns minutos.";

            setToastMessage({
                type: "error",
                message,
                duration: 5000,
            });
            
        }finally{
            setTimeout(()=> {
                setIsLoading(false)
            },1000)
        }
    }

    //🔹Realiza logout, remove os tokens e força atualização da página
    const logoutService = async (toast?: IToastifyMessageAuthContext) => {
        setIsLoading(true);
        
        try {
            const refreshToken = Cookies.get("refresh_token_keycloak_cad_rfk");
            if(refreshToken) await Logout(refreshToken);

            Cookies.remove("access_token_keycloak_cad_rfk");
            Cookies.remove("refresh_token_keycloak_cad_rfk");
            localStorage.removeItem("access_token_keycloak_cad_rfk");
            localStorage.removeItem("refresh_token_keycloak_cad_rfk");
            
            setUser(null);
            setIsAuthenticated(false);
            

            if(toast){
                setToastMessage(toast)
            }

            navigate("/login", {replace:true});
                      
        } catch (error) {
            console.error(error);
            handleApiError(error, "Erro ao encerrar sessão");
        }finally{
            setTimeout(()=> {
                setIsLoading(false)
            },1000)
        }
    };

    //🔹Verifica se um token já expirou
    const isTokenExpired = (token: string): boolean => {
        const decoded: ITokenRefresh = decodeToken(token) as ITokenRefresh;
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime; // 🔹 Retorna true se o token expirou
    };

    //🔹Renova o token de acesso caso tenha expirado
    const refreshTokenService = async(token:string):Promise<void> => {
        try {
            const { access_token, refresh_token } = await RefreshToken(token);
            const isSecure = window.location.protocol === "https:";
            if(isSecure){
                Cookies.set("access_token_keycloak_cad_rfk", access_token, { secure: isSecure});
                Cookies.set("refresh_token_keycloak_cad_rfk", refresh_token, { secure: isSecure});
            }else{
                localStorage.setItem("access_token_keycloak_cad_rfk", access_token);
                localStorage.setItem("refresh_token_keycloak_cad_rfk", refresh_token);
            }
            scheduleTokenRefresh(access_token, refresh_token);  
        } catch (error) {
            handleApiError(error, "Erro ao tentar renovar o token! Faça login novamente");
            logoutService({
                type: "error",
                message: "Erro ao renovar Token! Necessário fazer login novamente."
            }); // 🔹 Se o refresh falhar, faz logout automático
        }
    }
    
    //🔹 Agenda a renovação automática do token antes que ele expire
    const scheduleTokenRefresh = (tokenAccess:string, tokenRefresh:string):void => {
        if (refreshTimeout) clearTimeout(refreshTimeout); // 🔹Evita múltiplos agendamentos
        
        const decoded: ITokenRefresh = decodeToken(tokenAccess);
        const expiresIn = (decoded.exp * 1000) - Date.now() - 30000; // 🔹 30 segundos antes de expirar
        
        if (expiresIn > 0) {
            refreshTimeout = setTimeout(() => refreshTokenService(tokenRefresh), expiresIn);
        }
    }

    //🔹Verifica a sessão do usuário ao carregar a aplicação
    const checkSession = async ():Promise<void> => {
        const accessToken = Cookies.get("access_token_keycloak_cad_rfk") || localStorage.getItem("access_token_keycloak_cad_rfk");
        const refreshToken = Cookies.get("refresh_token_keycloak_cad_rfk") || localStorage.getItem("refresh_token_keycloak_cad_rfk");

        // 🔹 Se não houver tokens, desloga o usuário
        if (!accessToken || !refreshToken) {
            setIsAuthenticated(false);
            setUser(null);
            navigate("/login", {replace:true})
            return;
        }
        
        //🔹Se o refresh token expirou, desloga automaticamente
        if( isTokenExpired(refreshToken)){
            console.warn("Refresh token expirado! Usuário precisa fazer login novamente.");
            logoutService({
                message: "Token expirado! Necessário fazer login novamente.",
                type: "warning",
                style:{color: "var(--text-color-strong)", background: "var(--color-warning)"} 
            });
            return;
        }


        //🔹Se apenas o access token expirou, renova automaticamente
        if (isTokenExpired(accessToken)) {
            await refreshTokenService(refreshToken);
            return;
        }

        //🔹Se os tokens são válidos, autentica o usuário
        const tokenDecoded = decodeToken(accessToken) as ITokenBearer;
        const user = buildUserFromToken(tokenDecoded);
        setUser(user);
        setIsAuthenticated(true);
        //🔹Agendar a renovação automática do token 
        scheduleTokenRefresh(accessToken, refreshToken);
        
    }
    
    //🔹Registar ou atualizar usuario da controladoria 
    const registerUpdateUserController = async(user:IUser):Promise<void> => {
        if(!user.access_approver) return;

        try {
            await upsertUserApprover(user);
        } catch (error) {
            console.error('Upsert usuario controladoria: ', error);
            handleApiError(error,'Upsert usuario controladoria')
        }
    };
    
    //🔹Registar ou atualizar usuario da controladoria 
    const registerUpdateUserFiscal = async(user:IUser):Promise<void> => {
        if(!user.access_fiscal) return;

        try {
            await upsertUserFiscal(user);
        } catch (error) {
            console.error('Upsert usuario fiscal: ', error);
            handleApiError(error,'Upsert usuario fiscal')
        }
    };

    
    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            loginService,
            logoutService,
            isLoading,
        }}
        >
                {children}
        </AuthContext.Provider>
    )
};