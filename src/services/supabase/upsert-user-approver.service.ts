import { supabaseApi } from "./connection-supabase-api";
import { IUser } from "@/interfaces";


// Inserir/Atualizar usuarios na tabela da controladoria 
export const upsertUserApprover = async (user: IUser): Promise<void> => {
    const {error} = await supabaseApi
        .from("usuarios_ativos_controladoria")
        .upsert({
            id: user.id_keycloak,
            email: user.email,
            nome: user.fullName,
            ultimo_acesso: new Date() 
        },
        {
            onConflict:'id',  
        })

    if(error){
        throw new Error(`Erro no upsertUserApprover: ${error.message}`);
    }
        
};