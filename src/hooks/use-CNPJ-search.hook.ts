import { searchCNPJService } from "@/services/brasil-api/search-cnpj.service";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { SupplierTpj } from "@/features/suppliers/interface/supplier-enum";
import { ClientTpj } from "@/features/client/interface/client-enum";
import { OptionYesNo } from "@/interfaces";
import { mask as applyMask} from 'remask';

interface useCNPJSearchProps<T extends FieldValues> {
    methods: UseFormReturn<T>; 
    cnpjValue: string;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    form?: "client" | "supplier"
}

export const useCNPJSearch = async <T extends FieldValues>({methods, cnpjValue, setLoading, form}:useCNPJSearchProps<T>) => {
    
    const handleMaskPhone = (number:string):string => {
        const maskedValue = applyMask(number, ["(99) 9999-9999", "+55(99) 9 9999-9999"]);
        return maskedValue
    };

    try {
        setLoading(true);
        const cnpjData = await searchCNPJService(cnpjValue);
        if(cnpjData){
            // Endereço
            methods.setValue("cep" as Path<T>        , cnpjData.cep as PathValue<T, Path<T>>); 
            methods.setValue("estado" as Path<T>     , cnpjData.uf as PathValue<T, Path<T>>);
            methods.setValue("municipio" as Path<T>  , cnpjData.municipio as PathValue<T, Path<T>>);
            methods.setValue("bairro" as Path<T>     , cnpjData.bairro as PathValue<T, Path<T>>);
            methods.setValue("endereco" as Path<T>   , `${cnpjData.descricao_tipo_de_logradouro} ${cnpjData.logradouro}` as PathValue<T, Path<T>>);
            methods.setValue("numero" as Path<T>     , cnpjData.numero as PathValue<T, Path<T>>);
            methods.setValue("complemento" as Path<T>, cnpjData.complemento as PathValue<T, Path<T>>);     
            // Dados Legais 
            methods.setValue("razao_social" as Path<T> , cnpjData.razao_social as PathValue<T, Path<T>>);
            methods.setValue("nome_fantasia" as Path<T>, cnpjData.nome_fantasia as PathValue<T, Path<T>>);
            methods.setValue("cnae" as Path<T>, `${cnpjData.cnae_fiscal} - ${cnpjData.cnae_fiscal_descricao}` as PathValue<T, Path<T>>)
            //telefones
            methods.setValue("telefone_3" as Path<T>, handleMaskPhone(cnpjData.ddd_telefone_1) as PathValue<T, Path<T>>)
            methods.setValue("telefone_4" as Path<T>, handleMaskPhone(cnpjData.ddd_telefone_2) as PathValue<T, Path<T>>)

            
            // Se optante pelo simples nacional
            if(cnpjData.opcao_pelo_simples !== null){
                const optInSimple = cnpjData.opcao_pelo_simples
                    ? OptionYesNo.SIM as PathValue<T, Path<T>>
                    : OptionYesNo.NAO as PathValue<T, Path<T>>;

                methods.setValue("optante_simples" as Path<T>, optInSimple);
            };

            // Se optante MEI
            if(cnpjData.opcao_pelo_mei){
                const option = form === "client" ? ClientTpj.MEI : SupplierTpj.MEI
                methods.setValue("tpj" as Path<T>, option as PathValue<T, Path<T>>)
            };

            // Porte da empresa - define TPJ
            if(cnpjData.porte !== null){

                const option = form === "client" 
                    ? ClientTpj as PathValue<T, Path<T>> 
                    : SupplierTpj as PathValue<T, Path<T>>
                
                switch(cnpjData.porte){
                    case "MICRO EMPRESA":
                        methods.setValue("tpj" as Path<T>, option.MICRO_EMPRESA)
                        break;
                    case "EMPRESA DE PEQUENO PORTE":
                        methods.setValue("tpj" as Path<T>, option.PEQUENO_PORTE)
                        break;
                    case "DEMAIS":
                        methods.setValue("tpj" as Path<T>, option.NAO_OPTANTE)
                        break;
                    default:
                        break;
                }
            }
        }
    } catch (error) {
        console.error("Erro ao buscar cnpj: ",error)
    } finally {
        setLoading(false);
    }
};