import { DefaultValues, FormProvider, useForm } from "react-hook-form";
import { InputWithMask } from "../inputs/input-with-mask.components";
import { SubTitleForm } from "./sub-title-form.components";
import { FormSection } from "./form-section.components";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode, useContext } from "react";
import { DateInput, Input, InputSelect } from "../inputs";
import { AuthContext } from "@/context";
import { ScrollArea } from "../ui";
import * as yup from 'yup';
import { 
    LucideIcon, 
    UserRound as UserIcon, 
    Mail as EmailIcon,
} from "lucide-react";
import { 
    FaWhatsapp as WhatsAppIcon
} from "react-icons/fa6";
import { Sectors } from "@/interfaces";


type FormStateType = 'editing' | 'viewing' | 'reviewing';


interface BaseFormProps<T> {
    schema: yup.AnyObjectSchema;
    onSubmit?: (data: T) => void;
    children: ReactNode;
    formState?: FormStateType;
    defaultValues?: Partial<T>;
    showSector?: boolean;
    titleForm : string;
    iconForm : LucideIcon;
}

export const FormLayout = <T,>({ schema, onSubmit, children, formState, defaultValues, showSector, titleForm, iconForm:IconForm }: BaseFormProps<T>) => {
    const {user} = useContext(AuthContext);
    

    const methods = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues as DefaultValues<Partial<T>> | undefined,
    });

    return(
        <ScrollArea className="h-[90vh] w-full min-w-0 max-w-[1920px] mx-auto ">
            <h1 className="p-3 text-xl text-text-strong font-bold mt-3 flex gap-2 items-center">
                {<IconForm size={20}/>}
                {titleForm}
            </h1>
            <FormProvider {...methods}>
                <form className="bg-white-default w-full max-w-full min-w-0 px-4 border rounded-lg shadow-lg shadow-black/15">
                    <SubTitleForm title="Dados Solicitantes"/>
                    {/* Dados Solicitantes */}
                    <FormSection className="sm:flex-row gap-4">
                        {/* Data solicitacao */}
                        <DateInput
                            label="Data Solicitação"
                            name="criado_em"
                            mode="cadastro"
                            register={methods.register("criado_em")}
                            error={methods.formState.errors.criado_em?.message as string | undefined}
                        />
                        {/* Nome solicitante */}
                        <Input
                            label="Seu Nome"
                            name="nome_solicitante"
                            register={methods.register("nome_solicitante")}
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
                            />
                        }
                    </FormSection>
                    
                    <FormSection className="sm:flex-row gap-4">
                        {/* Email */}
                        <Input    
                            label="Seu e-mail" 
                            name="email"
                            register={methods.register("email")}
                            error={methods.formState.errors.email?.message as string | undefined} 
                            placeholder="Digite seu e-mail"
                            type="email"
                            icon={EmailIcon}
                            valueInitial={user?.email}
                            readOnly={true}
                        />
                        <InputWithMask
                            name="whatsapp"
                            maskType="whatsapp"
                            register={methods.register("whatsapp")}
                            error={methods.formState.errors.whatsapp?.message as string | undefined}
                            Icon={WhatsAppIcon}
                            label="WhatsApp"
                            readOnly={formState === 'viewing' || formState === 'reviewing'}
                        />
                    </FormSection>
                    {children}
                </form>
            </FormProvider>
        </ScrollArea>
    );
};