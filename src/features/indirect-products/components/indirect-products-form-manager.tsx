import { FormLayout, FormActionsButtonsRequest, FormProductAttributes, FormProductCategorySelector, FormProductDescription, SubTitleForm, FormObservationDeniedFild} from "@/components/form";
import { FamilyCodeIndirectProducts, TypeCodeIndirectProducts } from "../interface/indirect-products-enum";
import { useGroupSelectorIndirectProduct } from "../hook/use-group-selector-indirect-product";
import { IIndirectProducts, IIndirectProductsRegister } from "../interface/indirect-products";
import { updateIndirectProductsService } from "../service/update-indirect-produtcs.service";
import { indirectProductsRegisterSchema } from "../schema/indirect-products.schema";
import { useDeniedRequest, useObservationDenied, useEditRequest, useReviewRequest } from "@/hooks";
import { LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { PackageCheck as IndirectProductsIcon } from "lucide-react";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useReview } from "@/context";




interface IndirectProductsFormManagerProps{
    defaultValue: IIndirectProducts;
    mode: FormStateType;
    loadingModal: boolean;
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
    obervationRequest: string | null;
    setStatusLocal: React.Dispatch<React.SetStateAction<StatusRequest>>;
}

export const IndirectProductsFormManager = ({defaultValue, mode, loadingModal, setLoadingModal, status, setMode, viewRequestId, obervationRequest, setStatusLocal}:IndirectProductsFormManagerProps) => {
        
    if(loadingModal){
        return <LoadingModal/> 
    }
  
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
        updateFunction: updateIndirectProductsService,
        setStatusLocal
    });


    const group = useGroupSelectorIndirectProduct(methods);

    // Hooks para lidar com negar a solicitação
    const denyRequest = useDeniedRequest(); // salvar no supabase
    const { errorObservation, observationDenied, reset ,setObservationDenied ,validate} = useObservationDenied(); // lidar com a observação, salvar/apagar
    
    //Hook para lidar com o modo de revisão e contexto da revisão para lidar com campos vazios
    const reviewRequest = useReviewRequest(); // salvar no supabase
    const {hasEmptyReasons, setShowError} = useReview(); // funçao para verificar se existem campos vazios no modo revisão

    // Função para saber qual função irá chamar no botão de salvar, dependendo o modo.
    const handleConfirm = async (data: IIndirectProductsRegister) => {
        if(mode === "editing" || mode === "fiscal"){
            await handleEdit(defaultValue.id, data);
        } else if (mode === "denied"){
            if(!validate()){
                Toastify({
                    type: "warning",
                    message:"Informa o motivo"
                })
                return;
            };
            await denyRequest({
                viewRequestId,
                setLoadingModal,
                setMode,
                observation: observationDenied,
                setStatusLocal
            })
            reset();
         } else if (mode === "reviewing"){
            // modo revisão
            if (hasEmptyReasons()) {
                setShowError(true);
                Toastify({
                   type: "warning",
                    message: "Preencha todos os campos de revisão antes de salvar."
                });
                return;
            }
            setShowError(false);
            await reviewRequest({
                setLoadingModal,
                setMode,
                viewRequestId,
                setStatusLocal
            })
        } else {
            console.warn("Modo não tratado: ", mode)
        }
    };
    
    
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
            {/* Sessão para mostrar a obervação quando a solicitação for negada */}
            {(mode === "viewing" && status === StatusRequest.NEGADO && obervationRequest) && (
                <RequestDeniedInfo
                    observation={obervationRequest}
                />
            )}
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

            {/* Sessão para informar o motivo que está negando a solicitação */}
            {mode === "denied" && (
                <FormObservationDeniedFild
                    observation={observationDenied}
                    setObservation={setObservationDenied}
                    error={errorObservation}
                />
            )}

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => handleConfirm( data as IIndirectProductsRegister)}
            />
        </FormLayout>
        
    );
};