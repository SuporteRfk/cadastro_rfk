import { FieldValues, FormProvider, UseFormReturn, Path} from "react-hook-form";
import { InputWithMask } from "../inputs/input-with-mask.components";
import { LoadingModal } from "../loading-modals.components";
import { SubTitleForm } from "./sub-title-form.components";
import { DateInput, Input, InputSelect } from "../inputs";
import { FormSection } from "./form-section.components";
import { AuthContext, ModalContext } from "@/context";
import { Button } from "../button/button.components";
import { ReactNode, useContext } from "react";
import { FormStateType, Sectors } from "@/interfaces";
import { ScrollArea } from "../ui";
import { 
    LucideIcon, 
    UserRound as UserIcon, 
    Mail as EmailIcon,
} from "lucide-react";
import { 
    FaWhatsapp as WhatsAppIcon
} from "react-icons/fa6";


interface BaseFormProps<T extends FieldValues> {
    onSubmit?: (data: T) => void;
    children: ReactNode;
    formState?: FormStateType;
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
}

export const FormLayout = <T extends FieldValues> ({methods, onSubmit, children, formState, showSector, titleForm, iconForm:IconForm, showButtonsDefault=true, modalQuestion, onResetStates, loading }: BaseFormProps<T>) => {
    const {user} = useContext(AuthContext);
    const {openModal} = useContext(ModalContext);
    

   

    const handleReset = () => {
        methods.reset();
  
        if (onResetStates) {
            onResetStates();
        }
    }
    

    return(
        <ScrollArea className="h-[90vh] w-full min-w-0 max-w-[1920px] mx-auto ">
            {/* Titulo do Formulário */}
            <h1 className="p-3 text-xl text-text-strong font-bold mt-3 flex gap-2 items-center">
                {<IconForm size={20}/>}
                {titleForm}
            </h1>
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
                            mode="cadastro"
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
                                disabled={formState === 'viewing' || formState === 'reviewing'}
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
                            readOnly={true}
                        />
                        <InputWithMask
                            name={"whatsapp" as Path<T>}
                            maskType="whatsapp"
                            register={methods.register("whatsapp" as Path<T>)}
                            error={methods.formState.errors.whatsapp?.message as string | undefined}
                            Icon={WhatsAppIcon}
                            label="WhatsApp"
                            readOnly={formState === 'viewing' || formState === 'reviewing'}
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
        </ScrollArea>
    );
};