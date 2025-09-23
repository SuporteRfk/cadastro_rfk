import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCountersRequest, getRequestService } from "@/services/supabase";
import { useSupabaseRealtime } from "@/hooks/use-supabase-realtime.hooks";
import { IQueryRequest, IViewRequest } from "@/interfaces";
import { AuthContext } from "./auth.context";
import { handleApiError } from "@/utils";


type Counters = {
    total: number;
    pending: number;
    review: number;
    fiscal: number;
}


interface IRequestContext {
    counters: Counters
    loadingSkelleton: boolean;
    filter: IQueryRequest | null;
    setFilter: React.Dispatch<React.SetStateAction<IQueryRequest | null>>;
    request: IViewRequest[];
    totalRequest: number;
    getRequest: (filter?:IQueryRequest) => void;
}


export const RequestContext = createContext<IRequestContext>({
    counters: {
        total: 0,
        pending: 0,
        review: 0,
        fiscal: 0
    },
    loadingSkelleton: false,
    filter: null,
    setFilter: () => null,
    request: [],
    totalRequest: 0,
    getRequest:(_filter?:IQueryRequest) => {}
});

export const RequestProvider = ({children}:{children: ReactNode}) => {
    const [counters, setCounters] = useState<Counters>({total: 0,pending: 0,review: 0, fiscal: 0}) 
    const [loadingSkelleton, setLoadingSkelleton] = useState<boolean>(false); // controlar o loading do skelleton
    const [request, setRequest] = useState<IViewRequest[]>([]);  
    const [totalRequest, setTotalRequest] = useState<number>(0);
    
    const {user} = useContext(AuthContext);
    const isApprover = user?.access_approver; // Verifica se o usuário é um aprovador/controladoria
    const isFiscal = user?.access_fiscal; // Verifica se o usuário é um fiscal

    const [filter, setFilter] = useState<IQueryRequest | null>(null); // controle dos filtros e paginação 
    

    // Função para buscar os contadores de solicitações
    const getCountersService = async () => {
        try {
            const data = await getCountersRequest();
            setCounters(data);
        } catch (error) {
            handleApiError(error, "Erro ao buscar contadores de solicitações")
        }
    }

    // Função para buscar os contadores de solicitações para o fiscal
    const getCountersServiceFiscal = async () => {
        try {
            const data = await getCountersRequest();
            setCounters({pending: 0, review: 0, fiscal: data.fiscal, total: data.fiscal});
        } catch (error) {
            handleApiError(error, "Erro ao buscar contadores de solicitações")
        };
    };




    //Primeira carga inicial dos contadores apenas se for da controladoria
    useEffect(() => {
        if (!isApprover && !isFiscal) return 
        
        if(isApprover){
            getCountersService()
            return;
        };

        if(isFiscal){
            getCountersServiceFiscal()
        };

    },[isApprover, isFiscal]);


    //Sempre que o filtro mudar, faz nova requisição  trazendo as solicitações
    useEffect(() => {
        if (!filter) return
        getRequest(filter)
    },[filter])

    
    
    // Hook supabase para escutar as mudanças em tempo real na tabela de solicitações
    useSupabaseRealtime({
        table: "solicitacoes",
        event: "*",
        schema: 'public',
        channelName: "canal-solicitacoes",
        onChange: async () => {
            if(isApprover){
                await getCountersService();
                return
            };
            if(isFiscal){
                await getCountersServiceFiscal();
            }
        }
    });


    const getRequest = async (filter?: IQueryRequest):Promise<void> => {
        try {
            setLoadingSkelleton(true);
            const {data, count} = await getRequestService(filter);
            setRequest(data);
            setTotalRequest(!count ? 0 : count);
        } catch (error) {
            handleApiError(error, "Erro na busca das solicitações");
        } finally {
              setTimeout(()=> {
                setLoadingSkelleton(false);
            },800)
        }
    };

    return (
        <RequestContext.Provider value={{
            counters,
            loadingSkelleton,
            filter,
            setFilter,
            request,
            totalRequest,
            getRequest
        }}>
            {children}
        </RequestContext.Provider>
    )
}