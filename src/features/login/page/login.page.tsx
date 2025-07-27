import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../schema/login.schema";
import { useContext, useState } from "react";
import { ILoginRequest } from "@/interfaces";
import Logo from "@/assets/logo_rfk.png";
import { AuthContext } from "@/context";
import { Button, Input } from "@/components";
import {
    Eye as ViewPasswordIcon, 
    EyeOff as HidePasswordIcon,
    CircleUser as IconUser , 
    LockKeyhole as IconPassword
} from "lucide-react";


export const LoginPage = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [loadingLocal, setLoadingLocal] = useState<boolean>(false);
    const {loginService } = useContext(AuthContext);

    
    const methods = useForm<ILoginRequest>({
        resolver: yupResolver(loginSchema),
    });

    
    const handleLoginData = async (data:ILoginRequest) => {
        try {
            setLoadingLocal(true)
            await loginService(data);
            methods.reset();
        } finally{
            setLoadingLocal(false);
        }
    } 

    return(
        <main className="p-4 bg-login w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-12">
            <div className="flex-1/2 grow-0 w-full max-w-52 h-52 md:max-w-80 md:h-80 lg:max-w-fit lg:h-[400px]">
                <img 
                    src={Logo} 
                    alt="logo do sistema"
                    className="object-center object-contain h-full w-full" 
                />
            </div>
            <FormProvider {...methods} >
                <form  
                    onSubmit={methods.handleSubmit(handleLoginData)}
                    className="px-4 pt-4 pb-6 w-full max-h-fit max-w-[500px] bg-white-default flex-1 border rounded-lg flex flex-col items-center shadow-md shadow-shadow"
                >
                    <h3 className="font-bold text-text-strong text-2xl mb-2">Bem vindo de volta!</h3>
                    <p className="text-text-neutral text-sm text-center mb-2">Faça login com as credencias do windows</p>
                    <Input 
                        label="Usuário" 
                        icon={IconUser} 
                        name="username"
                        register={methods.register("username")}
                        error={methods.formState.errors.username?.message} 
                        placeholder="Digite seu usúario"
                        type="text"
                        useUppercase={false}
                   />
                    <div className="relative w-full mb-6">
                        <label htmlFor="password"  className="text-sm font-medium pl-0.5 text-text-medium">
                            Senha
                        </label>
                        <div className="relative">
                            <IconPassword className="absolute left-2 top-[7px]" color="var(--text-color-strong)" size={20}/>
                            <input
                                id="password"
                                {...methods.register("password")}
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Digite sua senha"
                                className={`
                                    w-full h-8 pl-10 pr-3 rounded-lg text-sm no-spinner 
                                    border ${methods.formState.errors.password ? 'border-error' : 'border-border'}
                                    focus:outline-hidden ${methods.formState.errors.password ? 'focus:border-error focus:ring-error' : 'focus:border-accent focus:ring-1 focus:ring-accent'}
                                    cursor-text bg-white-default text-text-medium
                                `}
                            />
                            {methods.formState.errors.password && <p className="text-error/80 text-xs mt-1 pl-1">{methods.formState.errors.password.message}</p>}
                        </div>
                        <button
                            type="button"
                            className="absolute right-3 top-[31px]"
                            onClick={() => setShowPassword((view) => !view)}
                        >
                            {showPassword ? <HidePasswordIcon size={20} color="var(--text-color-neutral)"/> : <ViewPasswordIcon size={20} color="var(--text-color-neutral)"/>}
                        </button>
                    </div>
                    <Button type="submit" text="Entrar" isLoading={loadingLocal} />
                </form>
            </FormProvider>
        </main>
    )
};