import { supabaseApi } from "./connection-supabase-api";
import { IUser } from "@/interfaces";


// Inserir/Atualizar usuarios na tabela da controladoria 
export const upsertUserFiscal = async (user: IUser): Promise<void> => {
    const {error} = await supabaseApi
        .from("usuarios_ativos_fiscal")
        .upsert({
            id: user.id_keycloak,
            email: user.email || `${user.fullName}@semEmail.com.br`,
            nome: user.fullName,
            ultimo_acesso: new Date() 
        },
        {
            onConflict:'id',  
        })

    if(error){
        throw new Error(`Erro no upsertUserFiscal: ${error.message}`);
    }
        
};