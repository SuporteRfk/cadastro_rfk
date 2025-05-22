import { FormLayout, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormProductDimensions, FormProductPackagingInfo, FormValidity, FormWeights, LoadingModal, SubTitleForm } from "@/components";
import { FamilyCodePAUnitary, GroupCodePAUnitary, TypeCodeoPAUnitary } from "../interface/pa-unitary-enum";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { IPAUnitary, IPAUnitaryRegister } from "../interface/pa-unitary";
import { paUnitaryRegisterSchema } from "../schema/pa-unitary.schema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Box as UnitaryIcon,
    Warehouse as StorageIcon,
    Weight as KgIcon,
    Clock as ValidityIcon,
} from "lucide-react";
import { updatePAUnitaryService } from "../service/update-pa-unitary.service";



interface PAUnitaryFormManagerProps{
    defaultValue: IPAUnitary;
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

export const PAUnitaryFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:PAUnitaryFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
    
    const methods= useForm<IPAUnitaryRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paUnitaryRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPAUnitaryRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePAUnitaryService
    });


    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`P.A Unitário - #${defaultValue?.id}`} 
            iconForm={UnitaryIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* Sessão dos dados do produto indireto */}
            <SubTitleForm title="Dados do P.A Unitário"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitaryIcon}/>
            {/* Sessão de descrição do P.A */}
            <FormProductDescription methods={methods} mode={mode}/>
            
            {/* Sessão do código de barras e código saib */}
            <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaUnitary" mode={mode}/>

            {/* Sessão do tipo, grupo e família */}
            <FormProductCategorySelector 
                methods={methods} 
                family={Object.values(FamilyCodePAUnitary)}
                group={Object.values(GroupCodePAUnitary)}
                type={Object.values(TypeCodeoPAUnitary)}
                mode={mode}
            />
            
            {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
            <FormProductAttributes methods={methods} showFlavorAndMark showCestAndTax labelMarkAndFlavor="Unitário" mode={mode}/>

            {/* Sessão de Peso e Medidas */}
            <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
            
            {/* Sessão de paletizao, rastro e lastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters={false} mode={mode}/>

            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>

            {/* Sessão de dimenssões (peso, altura e largura) */}
            <FormProductDimensions methods={methods} configSecondDimensions="formPaUnitary" mode={mode}/>

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
                onConfirm={(data) => handleEdit(defaultValue.id, data as IPAUnitaryRegister)}
            />
        </FormLayout>
        
    );
};