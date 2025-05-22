import { Button, FormLayout, FormSection, Input, LoadingModal, SubTitleForm } from "@/components";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { ModalContext} from "@/context";
import { 
    Ruler as UnitMeasureIcon,
    PencilRuler as UnitMeasureSubTitleIcon
} from "lucide-react";
import { useContext} from "react";
import { IUnitMeasure, IUnitMeasureRegister } from "../interface/unit-measure";
import { unitMeasureSchema } from "../schema/unit-measure.schema";
import { updateUnitMeasureService } from "../service/update-unit-measure.service";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";



interface PaymentConditionFormManagerProps{
    defaultValue: IUnitMeasure;
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

export const UnitMeasureFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:PaymentConditionFormManagerProps) => {
    const {openModal} = useContext(ModalContext);
    
    if(loadingModal){
        return <LoadingModal/> 
    }
  
  
    const methods= useForm<IUnitMeasureRegister>({
        defaultValues: defaultValue,
        resolver: yupResolver(unitMeasureSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<IUnitMeasureRegister>({
        setLoadingModal,
        setMode,
        status,
        viewRequestId,
        updateFunction: updateUnitMeasureService
    });


    


    
    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Unidade de Medida - #${defaultValue?.id}`} 
            iconForm={UnitMeasureSubTitleIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            <SubTitleForm title="Dados da Unidade de Medida"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitMeasureSubTitleIcon}/>
            <FormSection className="sm:flex-row gap-4 pb-2">
                    <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida")}
                        error={methods.formState.errors.unidade_medida?.message} 
                        placeholder="Digita a unidade de medida"
                        type="text"
                        icon={UnitMeasureIcon}
                        readOnly={mode !== "editing"}
                    />
                    <Input    
                        label="Descrição da Unidade" 
                        name="descricao_unidade"
                        register={methods.register("descricao_unidade")}
                        error={methods.formState.errors.descricao_unidade?.message} 
                        placeholder="Descreva sobre ela"
                        type="text"
                        icon={UnitMeasureSubTitleIcon}
                        readOnly={mode !== "editing"}
                    />
            </FormSection>

            {mode !== "viewing" &&
                <div className="w-full flex my-2 gap-3 justify-end ">
                    <Button
                        text="Cancelar"
                        variant="secondary"
                        sizeWidth="w-[120px]"
                        onClick={() => setMode("viewing")}
                    />
                    <Button
                        text="Salvar"
                        variant="primary"
                        sizeWidth="w-[120px]"
                        onClick={methods.handleSubmit((validatedData) => {
                                    openModal(
                                        "MANAGER_FORM",
                                        {
                                            message: "Você tem certeza que deseja editar a solicitação?",
                                            onConfirm: () => {
                                                handleEdit(defaultValue.id,validatedData as IUnitMeasureRegister);
                                            },
                                        
                                        }
                                    )
                                })}
                    />
                </div>
            }
        </FormLayout>
        
    );
};