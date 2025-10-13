import { FieldValues, FormProvider, UseFormReturn, Path, PathValue} from "react-hook-form";
import { InputWithMask } from "../inputs/input-with-mask.components";
import { LoadingModal } from "../loading-modals.components";
import { SubTitleForm } from "./sub-title-form.components";
import { DateInput, Input, InputSelect } from "../inputs";
import { FormSection } from "./form-section.components";
import { ReactNode, useContext, useState} from "react";
import { FormStateType, Sectors } from "@/interfaces";
import { AuthContext, ModalContext } from "@/context";
import { Button } from "../button/button.components";
import { ScrollArea } from "../ui";
import { 
    LucideIcon, 
    UserRound as UserIcon, 
    Mail as EmailIcon,
    Eye as ShowItensIcon
} from "lucide-react";
import { 
    FaWhatsapp as WhatsAppIcon
} from "react-icons/fa6";
import { ModalXml } from "../modal-xml";
import { ModalSimilarity } from "../modal-similarity";
import { IIndirectProductSimilarity } from "@/features/indirect-products/interface/indirect-products-similarity";


interface BaseFormProps<T extends FieldValues> {
    onSubmit?: (data: T) => void;
    children: ReactNode;
    mode?: FormStateType;
    showSector?: boolean;
    titleForm : string;
    iconForm : LucideIcon;
    showButtonsDefault?: boolean
    modalQuestion?: {
        modalKey: string, 
        message: string;
    };
    onResetStates?: () => void;
    methods: UseFormReturn<T>;
    loading: boolean;
    attachFile?: boolean;
    btnShowSimilarity?:boolean;
    itemsSimilarity?: IIndirectProductSimilarity[]
};

export const FormLayout = <T extends FieldValues> ({
    methods, 
    onSubmit, 
    children, 
    mode, 
    showSector, 
    titleForm, 
    iconForm:IconForm, 
    showButtonsDefault=true, 
    modalQuestion, 
    onResetStates, 
    loading, 
    attachFile=false, 
    btnShowSimilarity=false,
    itemsSimilarity=[]
}: BaseFormProps<T>) => {
    const [openModalXml,setOpenModalXml] = useState<boolean>(false);
    const [openModalSimilarity, setOpenModalSimilarity] = useState<boolean>(false);

    const {openModal} = useContext(ModalContext);
    const {user} = useContext(AuthContext);
    


    const handleReset = () => {
        methods.reset();
  
        if (onResetStates) {
            onResetStates();
        }
    }
    
    // setar o id do keycloak
    methods.setValue("id_usr_keycloak" as Path<T>, user!.id_keycloak as PathValue<T, Path<T>>);

       
    return(
        <ScrollArea className="max-h-[98vh] w-full min-w-0 max-w-[1920px] mx-auto rounded-lg">
            <div className="flex justify-between items-center mt-3">
                {/* Titulo do Formulário */}
                <h1 className="p-3 text-[16px] md:text-xl text-text-strong font-bold flex gap-2 items-center text-nowrap">
                    {<IconForm size={20}/>}
                    {titleForm}
                </h1>
                {/* Botão de Anexar */}
                {(attachFile && user?.access_xml) && 
                    <Button
                        variant="attach"
                        text="Importar XML"
                        sizeWidth="w-fit"
                        onClick={() => setOpenModalXml(true)}
                    />
                }
                {/* Botão para mostrar produtos similares */}
                {btnShowSimilarity && 
                    <Button
                        text="Existe Similaridade"
                        variant="outlineSecondary"
                        sizeWidth="120px flex-row-reverse !py-1"
                        roudend="rounded-sm"
                        iconInText={ShowItensIcon}
                        title="Mostrar os produtos similares encontrados"
                        styleIcon={{
                            color: 'var(--color-medium)',
                            size: 18
                        }}
                        onClick={() => setOpenModalSimilarity(true)}
                    />
                }
            </div>
            <FormProvider {...methods}>
                <form 
                    className="bg-white-default w-full max-w-full min-w-0 px-4 border rounded-lg shadow-lg shadow-black/15 relative"
                    onSubmit={(e) => e.preventDefault()}
                >
                    {/* Componente de loading no envio do formulário */}
                    {loading && <LoadingModal/>}
                    
                    
                    <SubTitleForm title="Dados Solicitantes"/>
                    {/* Dados Solicitantes */}
                    <FormSection className="sm:flex-row gap-4">
                        {/* Data solicitacao */}
                        <DateInput
                            label="Data Solicitação"
                            name="criado_em"
                            mode={mode ? "visualizacao" : "cadastro"}
                            register={methods.register("criado_em" as Path<T>)}
                            error={methods.formState.errors.criado_em?.message as string | undefined}
                        />
                        {/* Nome solicitante */}
                        <Input
                            label="Seu Nome"
                            name="nome_solicitante"
                            register={methods.register("nome_solicitante" as Path<T>)}
                            error={methods.formState.errors.nome_solicitante?.message as string | undefined}
                            placeholder="Digite seu nome"
                            type="text"
                            icon={UserIcon}
                            valueInitial={user?.fullName || ""}
                            readOnly={true}
                        />
                        
                        {/* Setor solicitante Opcional*/}
                        {showSector && 
                            <InputSelect 
                                name="setor" 
                                options={Object.values(Sectors)} 
                                placeholder="Escolhe o seu setor" 
                                label="Setor"
                                selectLabel="Setores"
                                disabled={(mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal')}
                                error={methods.formState.errors.setor?.message as string | undefined}
                            />
                        }
                    </FormSection>
                    
                    <FormSection className="sm:flex-row gap-4">
                        {/* Email */}
                        <Input    
                            label="Seu e-mail" 
                            name={"email" as Path<T>}
                            register={methods.register("email" as Path<T>)}
                            error={methods.formState.errors.email?.message as string | undefined} 
                            placeholder="Digite seu e-mail"
                            type="email"
                            icon={EmailIcon}
                            valueInitial={user?.email}
                            readOnly={mode ? true : false}
                        />
                        <InputWithMask
                            name={"whatsapp" as Path<T>}
                            maskType="whatsapp"
                            register={methods.register("whatsapp" as Path<T>)}
                            error={methods.formState.errors.whatsapp?.message as string | undefined}
                            Icon={WhatsAppIcon}
                            label="WhatsApp"
                            readOnly={(mode === 'viewing' || mode === 'reviewing' || mode === 'fiscal')}
                        />
                    </FormSection>
                    {/* Elementos filhos dinâmicos */}
                    {children}
                    
                    {/* Botões de Ação */}
                    {showButtonsDefault && 
                        <div className="w-full flex my-2 gap-3 justify-end ">
                            <Button
                                text="Cancelar"
                                variant="secondary"
                                sizeWidth="w-[120px]"
                                onClick={handleReset}
                            />
                            <Button
                                text="Salvar"
                                variant="primary"
                                sizeWidth="w-[120px]"
                                onClick={methods.handleSubmit((validatedData) => {
                                    openModal(
                                        modalQuestion?.modalKey || "SUBMIT_FORM",
                                        {
                                            message: modalQuestion?.message || "Você tem certeza que deseja salvar?",
                                            onConfirm: () => {
                                                if (onSubmit) {
                                                    onSubmit(validatedData as T);
                                                }
                                            },
                                        }
                                    )
                                })}
                            />
                        </div>
                    }
                
                </form>
            </FormProvider>

            {/* Abrir o modal para importar o xml */}
            <ModalXml open={openModalXml} close={setOpenModalXml} titleForm={titleForm} user={user}/>  

            {/* Abrir o modal para mostrar os itens similares */}
            <ModalSimilarity open={openModalSimilarity} close={setOpenModalSimilarity} itemsSimilarity={itemsSimilarity!}/>

        </ScrollArea>
    );
};