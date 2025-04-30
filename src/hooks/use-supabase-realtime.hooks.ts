import { supabaseApi } from "@/services/supabase/connection-supabase-api";
import { useEffect } from "react";

type IUseSupabaseRealtimeConfig = {
    table: string;                               // Nome da tabela que será escutada
    schema: string;                              // Schema do banco (padrão: "public")
    channelName: string;                         // Nome do canal Supabase (precisa ser único por uso)
    event: "INSERT" | "UPDATE" | "DELETE" | "*"; // Tipo de evento que queremos escutar
    filter?: string ;                            // Filtro opcional: ex "status=eq.PENDENTE" 
    onChange: (payload: any) => void;            // Função que será executada quando um evento ocorrer
};


/**
 * Hook para escutar eventos realtime do Supabase.
 * Cria canal individual para cada uso.
 */
export const useSupabaseRealtime = ({filter, channelName, event, onChange, schema, table}:IUseSupabaseRealtimeConfig) => {
    useEffect(() => {
        // Monta a configuração do listener
        const config: Record<string, any> = {
            event,
            schema,
            table,
        };

        if (filter) {
            config.filter = filter;
        }

        const channel = supabaseApi
            .channel(channelName)
            .on("postgres_changes", {
                event: config.event,
                schema: config.schema,
                table: config.table,
                ...(filter ? { filter: config.filter } : {})  // ← só inclui se for uma string válida
            }, async (payload) => {
                await onChange(payload);
            })
            .subscribe();

        return () => {
            supabaseApi.removeChannel(channel);
        };

    },[table, schema, event, channelName, filter, onChange])
    /**
         * 🔎 Por que esses parâmetros estão nas dependências do useEffect?
         * - Porque se algum deles mudar (ex: `event = "UPDATE"` → `"INSERT"`),
         *   o React precisa reexecutar o efeito para criar um novo canal
         * - Não colocar eles aqui causaria bugs onde o hook continua escutando o valor antigo
    **/
};


