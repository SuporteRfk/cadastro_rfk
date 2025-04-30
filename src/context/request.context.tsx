import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { getCountersRequest } from "@/services/supabase";
import { AuthContext } from "./auth.context";
import { handleApiError } from "@/utils";
import { useSupabaseRealtime } from "@/hooks/use-supabase-realtime.hooks";

type Counters = {
    total: number;
    pending: number;
    review: number;
}


interface IRequestContext {
    counters: Counters
}


export const RequestContext = createContext<IRequestContext>({
    counters: {
        total: 0,
        pending: 0,
        review: 0,
    },

});

export const RequestProvider = ({children}:{children: ReactNode}) => {
    const [counters, setCounters] = useState<Counters>({total: 0,pending: 0,review: 0})
    const {user} = useContext(AuthContext);

    const isApprover = user?.access_approver; // Verifica se o usuário é um aprovador/controladoria

    // Função para buscar os contadores de solicitações
    const getCountersService = async () => {
        try {
            const data = await getCountersRequest();
            setCounters(data);
        } catch (error) {
            handleApiError(error, "Erro ao buscar contadores de solicitações")
        }
    }

    //Primeira carga inicial dos contadores apenas se for da controladoria
    useEffect(() => {
        if(isApprover){
            getCountersService()
        }
    },[isApprover]);


     // Hook supabase para escutar as mudanças em tempo real na tabela de solicitações
     useSupabaseRealtime({
        table: "solicitacoes",
        event: "*",
        schema: "public",
        channelName: "canal-solicitacoes",
        onChange: async () => {
            if(isApprover){
                await getCountersService()
            }
        }
     });

    return (
        <RequestContext.Provider value={{
            counters
        }}>
            {children}
        </RequestContext.Provider>
    )
}