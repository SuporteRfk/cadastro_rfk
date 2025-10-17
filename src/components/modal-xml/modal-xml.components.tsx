import { IIndirectProductsRegister, IndirectProductStep3 } from "@/features/indirect-products/interface/indirect-products";
import { insertIndirectProductsService } from "@/features/indirect-products/service/insert-indirect-products.service";
import { Step1UploadXmlCsvExcel } from "./steps/step1/step1-upload-xml.components";
import { indirectProductsStep3Schema } from "@/features/indirect-products/schema";
import { Filter, IUser, XmlIndirectProduct, XmlInfo } from "@/interfaces";
import { XmlProgress } from "./modal-xml-progress.components";
import { Sheet, SheetContent,  SheetTitle  } from "../ui";
import { Step2 } from "./steps/step2/step2.components";
import { Step3 } from "./steps/step3/step3.components";
import { ModalXmlActions } from "./modal-xml-actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toastify } from "../toastify.components";
import { Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";






interface ModalXmlProps {
    open: boolean;
    close: Dispatch<React.SetStateAction<boolean>>;
    titleForm: string;
    user: IUser | null;
};





export const ModalXml = ({open, close, titleForm, user}:ModalXmlProps) => {
    const [step, setStep] = useState<number>(1)
    const [xmlInfos, setXmlInfos] = useState<XmlInfo[]>([]);
    const [items, setItems] = useState<XmlIndirectProduct[]>([]);
    const [itemsOk, setItemsOk] = useState<XmlIndirectProduct[]>([]);
    const [filter, setFilter] = useState<Filter>("All");
        

    const methodsStep3 = useForm({
        resolver: yupResolver<IndirectProductStep3>(indirectProductsStep3Schema),
        defaultValues: {
            whatsapp: "", 
            setor: undefined, 
            criado_em: "", 
            nome_solicitante: user!.fullName, 
            email: user!.email || "", 
            id_usr_keycloak: user!.id_keycloak
        }
    })

    const closeModal = ():void => {
        setStep(1);
        setXmlInfos([]);
        setItems([]);
        setItemsOk([]);
        close(false);
    };

    // Ação ao finalizar o passo 3 (criar as solicitações em lote)
    const onSubmitForcreatedRequestsInLot = async (data:IndirectProductStep3) => {
               
        const itemsToCreate = itemsOk.map(item => ({
            criado_em: data.criado_em,
            nome_solicitante: data.nome_solicitante,
            email: data.email,
            whatsapp: data.whatsapp,
            id_usr_keycloak: data.id_usr_keycloak,
            setor: data.setor,
            descricao_curta: item.name,
            descricao_uso: item!.descricao_uso,
            codigo_familia: item!.codigo_familia,
            codigo_grupo: item!.codigo_grupo,
            tipo: item!.tipo,
            unidade_medida: item.unit_measure,
            ncm: item.ncm
        })) as IIndirectProductsRegister[];

        try {
            await insertIndirectProductsService(itemsToCreate)
            
            Toastify({
                type: "success",
                message: `${itemsOk.length} solicitações criadas com sucesso!`,
                duration: 4000
            });
            
            methodsStep3.reset();
            closeModal();

        } catch (error) {
            handleApiError(error, "Erro ao cadastrar produto indireto")
        } 
        
    };

 
    return (
        <Sheet open={open} onOpenChange={closeModal} modal={false}>
            <SheetContent 
                side="right" 
                onInteractOutside={(e) => e.preventDefault()}
                className="w-full bg-bg h-screen max-h-screen overflow-hidden" 
            >
                <div className="flex h-full flex-col">
                    {(() => {
                        switch (titleForm) {
                            case "Produtos Indiretos":
                                return (
                                    <>
                                        {/* header */}
                                        <div className="shrink-0">
                                            <XmlProgress step={step} quantitySteps={3}/>
                                        </div>
                                        {/* body*/}
                                        <div className="min-h-0 flex-1 overflow-auto">
                                            {step === 1 && 
                                                <Step1UploadXmlCsvExcel 
                                                    setXmlInfos={setXmlInfos}
                                                    xmlInfos={xmlInfos}
                                                    items={items}
                                                    setItems={setItems}
                                                />
                                            }
                                            {step === 2 && 
                                                <Step2 
                                                    setItemsOk={setItemsOk}
                                                    setItems={setItems}
                                                    items={items}
                                                    itemsOk={itemsOk} 
                                                    filter={filter}
                                                />
                                                
                                            }
                                            {step === 3 &&
                                                <Step3
                                                    itemsOk={itemsOk}
                                                    itemsPending={items.filter(item => item.status === "Pendente")}
                                                    items={items}
                                                    setStep={setStep}
                                                    setFilter={setFilter}
                                                    user={user}
                                                    methods={methodsStep3}
                                                />
                                            }
                                        </div>
                                        <div className="shrink-0">
                                            <ModalXmlActions 
                                                step={step} 
                                                itemsOk={itemsOk} 
                                                items={items} 
                                                setStep={setStep} 
                                                quantitySteps={3}
                                                methods={methodsStep3}
                                                onSubmit={(data) => onSubmitForcreatedRequestsInLot(data)}
                                            />
                                        </div>
                                    </>
                                )
                            
                            default:
                                return (
                                    <div className="mx-auto w-fit flex flex-col gap-4 justify-center items-center p-10 mt-20 bg-neutral/10 rounded-xl shadow-neutral shadow-inner">
                                        <SheetTitle  className="text-2xl text-text-strong">Importação de XML</SheetTitle >
                                        <p className="text-text-medium">
                                            Não implementado para esse formulário
                                            <span className="text-text-strong font-bold"> {titleForm} </span>
                                        </p>
                                        
                                        <button 
                                            className="w-full bg-neutral p-2 rounded-sm hover:bg-neutral/40 hover:text-text-medium transition-all"
                                            onClick={() => close(false)}
                                        >
                                            Fechar
                                        </button>
                                        
                                    </div>
                                )
                        }
                    })()}
                </div>
            </SheetContent>
        </Sheet>
    );
};