import { FormLayout, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormProductDimensions, FormProductPackagingInfo, FormWeights, LoadingModal, SubTitleForm } from "@/components";
import { FamilyCodePACopacker, GroupCodePACopacker, TypeCodeoPACopacker } from "../interface/pa-copacker-enum";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { updatePACopackerService } from "../service/update-pa-copacker.service";
import { IPACopackerRegister, IPACopacker } from "../interface/pa-copacker";
import { paCopackerRegisterSchema } from "../schema/pa-copacker.schema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Weight as KgIcon,
    Warehouse as StorageIcon,
    PackageOpen as PAIcon
} from "lucide-react";



interface IndirectProductsFormManagerProps{
    defaultValue: IPACopacker;
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

export const PACopackerFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:IndirectProductsFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
  
    const methods= useForm<IPACopackerRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paCopackerRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPACopackerRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePACopackerService
    });


    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`P.A Copacker - #${defaultValue?.id}`} 
            iconForm={PAIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão dos dados do produto indireto */}
            <SubTitleForm title="Dados do P.A Copacker"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={PAIcon}/>
            {/* Sessão de descrição/nome Científico do P.A */}
            <FormProductDescription methods={methods} mode={mode}/>

            {/* Sessão do código saib e código de barras*/}
            <FormProductCode methods={methods} mode={mode}/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodePACopacker)}
                group={Object.values(GroupCodePACopacker)}
                type={Object.values(TypeCodeoPACopacker)}
                methods={methods}
                mode={mode}
            />

            {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
            <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Copacker" mode={mode}/>

            {/* Sessão de Peso e Medidas */}
            <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
            
            {/* Sessão de paletizao, rastro e lastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters={false} mode={mode}/>

            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>
            
            {/* Sessão de dimenssões (peso, altura e largura) */}
            <FormProductDimensions methods={methods} configSecondDimensions="formCopacker" mode={mode}/>
                            
            {/* Sessão Armazenagem */}
            <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
            <FormProductPackagingInfo methods={methods} mode={mode}/>

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleEdit(defaultValue.id, data as IPACopackerRegister)}
            />
        </FormLayout>
        
    );
};