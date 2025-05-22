import { FormLayout, FormProductAttributes, FormProductCategorySelector, FormProductDescription, LoadingModal, SubTitleForm } from "@/components";
import { FamilyCodeIndirectProducts, TypeCodeIndirectProducts } from "../interface/indirect-products-enum";
import { useGroupSelectorIndirectProduct } from "../hook/use-group-selector-indirect-product";
import { IIndirectProducts, IIndirectProductsRegister } from "../interface/indirect-products";
import { updateIndirectProductsService } from "../service/update-indirect-produtcs.service";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { indirectProductsRegisterSchema } from "../schema/indirect-products.schema";
import { PackageCheck as IndirectProductsIcon } from "lucide-react";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";




interface IndirectProductsFormManagerProps{
    defaultValue: IIndirectProducts;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
    reasonFieldReview: {[key: string]: string };
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
}

export const IndirectProductsFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:IndirectProductsFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
  
    console.log(defaultValue)
    const methods= useForm<IIndirectProductsRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(indirectProductsRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IIndirectProductsRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updateIndirectProductsService
    });


    const group = useGroupSelectorIndirectProduct(methods);


    
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Produtos Indiretos - #${defaultValue?.id}`} 
            iconForm={IndirectProductsIcon}
            mode={mode}
            showSector
            showButtonsDefault={false}            
        >
            {/* Sessão dos dados do produto indireto */}
            <SubTitleForm title="Dados do Produto Indireto"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={IndirectProductsIcon}/>
            {/* Sessão de descrição do produto */}
            <FormProductDescription methods={methods} viewKeyUseProduct viewKeyNameScientific={false} mode={mode}/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodeIndirectProducts)}
                group={Object.values(group)}
                type={Object.values(TypeCodeIndirectProducts)}
                methods={methods}
                mode={mode}
            />

            {/* Sessão de atributos (unidades de medida e ncm) */}
            <FormProductAttributes methods={methods} mode={mode}/>

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleEdit(defaultValue.id, data)}
            />
        </FormLayout>
        
    );
};