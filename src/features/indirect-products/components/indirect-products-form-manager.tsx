/* eslint-disable react-hooks/exhaustive-deps */
import { FormLayout, FormActionsButtonsRequest, FormProductAttributes, FormProductCategorySelector, FormProductDescription, SubTitleForm, FormObservationDeniedFild} from "@/components/form";
import { FamilyCodeIndirectProducts, TypeCodeIndirectProducts } from "../interface/indirect-products-enum";
import { useDeniedRequest, useObservationDenied, useEditRequest, useReviewRequest } from "@/hooks";
import { useGroupSelectorIndirectProduct } from "../hook/use-group-selector-indirect-product";
import { IIndirectProducts, IIndirectProductsRegister } from "../interface/indirect-products";
import { updateIndirectProductsService } from "../service/update-indirect-produtcs.service";
import { IIndirectProductSimilarity } from "../interface/indirect-products-similarity";
import { indirectProductsRegisterSchema } from "../schema/indirect-products.schema";
import { getSimilarityService } from "../service/get-similarity.service";
import { LoadingModal, RequestDeniedInfo, Toastify } from "@/components";
import { PackageCheck as IndirectProductsIcon } from "lucide-react";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
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
    // estado para mostrar ou não o botão de itens similares
    const [showSimilarity, setShowSimilarity] = useState<'true' | 'false' | 'loading'>('loading');
    const [itemsSimilarity, setItemsSimilarity] = useState<IIndirectProductSimilarity[]>([])    
  
    const methods = useForm<IIndirectProductsRegister>({
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
    

    
    //Função para saber se existe similaridade do item
    const isThereSimilarProduct = async ():Promise<"loading" | "done"> => {
        const resp = await getSimilarityService(defaultValue.id);
        
        if (resp === null) {
            setShowSimilarity('loading');
            return "loading";
        };
        
        if(resp.true.length > 0){
            setShowSimilarity('true');
            setItemsSimilarity(resp.true);
        }else if (resp.false.length > 0){
            setShowSimilarity('false');
            setItemsSimilarity(resp.false);
        
        }
        
        return "done";
    };

    useEffect(() => {
        if(!defaultValue) return
        
        
        let attempts = 0;
        const maxAttempts = 10;
        let interval: NodeJS.Timeout;
        
        (async () => {
            const status = await isThereSimilarProduct();

            if(status === "loading"){
                interval = setInterval(async () => {
                    attempts++;
                    const result = await isThereSimilarProduct();
                    
                    // Parar se já concluiu ou atingiu limite de tentativas
                    if (result === "done" || attempts >= maxAttempts) {
                        setShowSimilarity('false');
                        clearInterval(interval);
                    };
                },2000) 
            }
        })()
        
        return () => clearInterval(interval);
    },[loadingModal])
    

    return(
        <FormLayout 
            methods={methods} 
            loading={loadingModal} 
            titleForm={`Produtos Indiretos - #${defaultValue?.id}`} 
            iconForm={IndirectProductsIcon}
            mode={mode}
            showSector
            showButtonsDefault={false}
            btnShowSimilarity={showSimilarity}
            itemsSimilarity={itemsSimilarity}            
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