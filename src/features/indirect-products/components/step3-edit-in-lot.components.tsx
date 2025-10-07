import { DateInput, FormSection, Input, InputSelect, InputWithMask, SubTitleForm } from "@/components";
import { IndirectProducStep3 } from "@/features/indirect-products/interface/indirect-products";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { IUser, Sectors } from "@/interfaces";
import { 
    UserRound as UserIcon, 
    Mail as EmailIcon
} from "lucide-react";
import { 
    FaWhatsapp as WhatsAppIcon
} from "react-icons/fa6";



interface Step3EditInLotProps<T extends IndirectProducStep3> {
    methods: UseFormReturn<T>;
    user: IUser | null;
};

export const Step3EditInLot = ({methods, user}:Step3EditInLotProps<IndirectProducStep3>) => {
    
    //Setar o id do keycloak
    methods.setValue("id_usr_keycloak", user!.id_keycloak);
        
    return (
        <FormProvider {...methods}>
            {/* Formulário */}
            <form 
                onSubmit={(e) => e.preventDefault()} 
                className="bg-white w-full h-full max-w-full min-w-0 p-4 border mt-8 flex items-center justify-center"
            >
                <div className="max-w-[820px] flex-1">
                    <SubTitleForm title="Dados Solicitantes"/>
                    <FormSection className="sm:flex-row gap-4">
                        {/* Data */}
                        <DateInput
                            label="Data Solicitação"
                            name="criado_em"
                            register={methods.register("criado_em")}
                            mode="cadastro"
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
                            valueInitial={user?.fullName}
                            readOnly={true}
                        />
                        {/* Setor solicitante*/}
                        <InputSelect 
                            name="setor" 
                            options={Object.values(Sectors)} 
                            placeholder="Escolhe o seu setor" 
                            label="Setor"
                            selectLabel="Setores"
                            error={methods.formState.errors.setor?.message as string | undefined}
                        />
                    </FormSection>

                    <FormSection className="sm:flex-row gap-4">
                        {/* Email */}
                        <Input    
                            label="Seu e-mail" 
                            name={"email"}
                            register={methods.register("email")}
                            error={methods.formState.errors.email?.message as string | undefined} 
                            placeholder="Digite seu e-mail"
                            type="email"
                            icon={EmailIcon}
                            valueInitial={user?.email}
                        />
                        {/* Whatsapp */}
                        <InputWithMask
                            name={"whatsapp"}
                            maskType="whatsapp"
                            register={methods.register("whatsapp")}
                            error={methods.formState.errors.whatsapp?.message as string | undefined}
                            Icon={WhatsAppIcon}
                            label="WhatsApp"
                        />
                    </FormSection>
                </div>
            </form>
        </FormProvider>
    );
};