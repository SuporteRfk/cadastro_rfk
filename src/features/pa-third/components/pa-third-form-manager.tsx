import { FormLayout, FormPalletizingTrackingConversion, FormProductAttributes, FormProductCategorySelector, FormProductCode, FormProductDescription, FormProductDimensions, FormProductPackagingInfo, FormValidity, FormWeights, Input, LoadingModal, SubTitleForm } from "@/components";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { updatePAThirdService } from "../service/update-pa-third.service";
import { IPAThird , IPAThirdRegister} from "../interface/pa-third";
import { paThirdRegisterSchema } from "../schema/pa-third.schema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Weight as KgIcon,
    Warehouse as StorageIcon,
    Group as SubGroupIcon,
    Building as PAThirdIcon
} from "lucide-react";
import { FamilyCodePAThird, GroupCodePAThird, TypeCodePAThird } from "../interface/pa-third-enum";



interface PAThirdFormManagerProps{
    defaultValue: IPAThird;
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

export const PAThirdFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:PAThirdFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
    console.log(defaultValue)
    const methods= useForm<IPAThirdRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(paThirdRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IPAThirdRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updatePAThirdService
    });


    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`P.A Terceiro - #${defaultValue?.id}`} 
            iconForm={PAThirdIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            <SubTitleForm title="Dados do P.A Terceiro"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={PAThirdIcon}/>
         
            
            {/* Sessão de descrição/nome Científico do P.A */}
            <FormProductDescription methods={methods} viewInstructions mode={mode}/>
            
            {/* Sessão do código saib e código de barras*/}
            <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaThird" mode={mode}/>

            {/* Sessão do tipo, familia e grupo do PA */}
            <FormProductCategorySelector 
                family={Object.values(FamilyCodePAThird)}
                group={Object.values(GroupCodePAThird)}
                type={Object.values(TypeCodePAThird)}
                methods={methods}
                mode={mode}
            />

            {/* Sessão de atributos (unidades de medida, ncm, sabor, marca, grupo tributário e cest) */}
            <FormProductAttributes methods={methods} showSecondUnitMeasure showFlavorAndMark showCestAndTax/>

            {/* SubGrupo do produto */}
            <Input
                register={methods.register("sub_grupo")}
                name="sub_grupo"
                error={methods.formState.errors.sub_grupo?.message}
                label="Sub Grupo"
                type="text"
                placeholder="Fornecedor de quem compramos"
                icon={SubGroupIcon}
                readOnly={mode !== "editing"}
            />

            {/* Sessão de pesos e medidas */}
            <SubTitleForm title="Peso e Medidas"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={KgIcon}/>
            
            {/* Sessão de Conversor e Rastro */}
            <FormPalletizingTrackingConversion methods={methods} showConverters mode={mode}/>

            {/* Sessão Pesos */}
            <FormWeights methods={methods} mode={mode}/>

            {/* Sessão Armazenagem */}
            <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
            <FormProductPackagingInfo methods={methods} valueInitialStorage="055 - REVENDA" mode={mode}/>

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleEdit(defaultValue.id, data as IPAThirdRegister)}
            />
        </FormLayout>
        
    );
};