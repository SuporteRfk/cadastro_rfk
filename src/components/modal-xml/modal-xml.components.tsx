import { Step1UploadXml } from "./steps/step1/step1-upload-xml.components";
import { XmlProgress } from "./modal-xml-progress.components";
import { XmlIndirectProduct, XmlInfo } from "@/interfaces";
import { Sheet, SheetContent,  SheetTitle  } from "../ui";
import { ModalXmlActions } from "./modal-xml-actions";
import { Dispatch, useState } from "react";
import { Step2 } from "./steps/step2/step2.components";




interface ModalXmlProps {
    open: boolean;
    close: Dispatch<React.SetStateAction<boolean>>;
    titleForm: string;
    user: {email?: string | null; name: string}
};




export const ModalXml = ({open, close, titleForm, user}:ModalXmlProps) => {
    const [step, setStep] = useState<number>(1)
    const [xmlInfos, setXmlInfos] = useState<XmlInfo[]>([]);
    const [items, setItems] = useState<XmlIndirectProduct[]>([]);
    const [itemsOk, setItemsOk] = useState<XmlIndirectProduct[]>([]);
    
  
    

 
    return (
        <Sheet open={open} onOpenChange={close}>
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
                                                <Step1UploadXml 
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
                                                />
                                                
                                            }
                                        </div>
                                        <div className="shrink-0">
                                            <ModalXmlActions step={step} items={items} setItems={setItems} setStep={setStep} quantitySteps={3}/>
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