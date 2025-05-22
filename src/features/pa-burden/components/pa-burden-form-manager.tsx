import { FormLayout, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormProductDimensions, FormProductPackagingInfo, FormValidity, FormWeights, LoadingModal, SubTitleForm } from "@/components";
import { FamilyCodePABurden, GroupCodePABurden, TypeCodeoPABurden } from "../interface/pa-burden-enum";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { updatePABurdenService } from "../service/update-pa-burden.service";
import { IPABurden, IPABurdenRegister } from "../interface/pa-burden";
import { paBurdenRegisterSchema } from "../schema/pa-burden.schema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Boxes as BurdenIcon,
    Weight as KgIcon,
    Warehouse as StorageIcon,
    Clock as ValidityIcon,
} from "lucide-react";



interface PABurdenFormManagerProps{
    defaultValue: IPABurden;
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

export const PABurdenFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:PABurdenFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
    console.log(defaultValue)
    const methods= useForm<IPABurdenRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paBurdenRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPABurdenRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePABurdenService
    });


    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`P.A Fardo - #${defaultValue?.id}`} 
            iconForm={BurdenIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão dos dados do produto indireto */}
            <SubTitleForm title="Dados do P.A Fardo"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={BurdenIcon}/>
            {/* Sessão de descrição do P.A */}
            <FormProductDescription methods={methods} mode={mode}/>

            {/* Sessão do código saib e códigos de barras */}
            <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPABurden"/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodePABurden)}
                group={Object.values(GroupCodePABurden)}
                type={Object.values(TypeCodeoPABurden)}
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
            <FormProductDimensions methods={methods} configSecondDimensions="formPABurden" mode={mode}/>
            
            {/* Sessão Armazenagem */}
            <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
            <FormProductPackagingInfo methods={methods} mode={mode}/>

            {/* Sessão Validade */}
            <SubTitleForm title="Validade e Lote"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ValidityIcon}/>
            <FormValidity methods={methods} mode={mode}/>

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleEdit(defaultValue.id, data as IPABurdenRegister)}
            />
        </FormLayout>
        
    );
};