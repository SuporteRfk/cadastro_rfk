import { ITypeRequestChange } from "@/features/request-change/interface/request-change-enum";
import { SafeReviewField } from "../review-field/safe-review-field.components";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { Input, InputSelect, InputWithMask } from "../inputs";
import { FormSection } from "./form-section.components";
import { FormStateType } from "@/interfaces";
import {
    MessageCircleMore as ObservationIcon,
    Binary as CodIcon,
    BriefcaseBusiness as CnpjAndCpfIcon,
    FolderSync as TabChangeIcon,
    FolderPen as ChangeIcon,
} from "lucide-react";



interface FormInfoChangeRequestProps<T extends FieldValues> {
    mode?: FormStateType; // 'editing' | 'viewing' | 'reviewing';
    methods: UseFormReturn<T>;
}

export const FormInfoChangeRequest = <T extends FieldValues>({mode, methods}:FormInfoChangeRequestProps<T>) => {
    
    const typeValue = methods.getValues("tipo" as Path<T>);
    const isClientOfSuplier = typeValue === ITypeRequestChange.CLIENT || typeValue === ITypeRequestChange.SUPPLIER;
    

    return(
        <div className="flex flex-col gap-4">
            <FormSection className="flex flex-row! gap-4">
                <SafeReviewField field="tipo" mode={mode || "viewing"}>
                    <InputSelect
                        label="Categoria da alteração" 
                        name="tipo"
                        error={methods.formState.errors.tipo?.message as string | undefined} 
                        placeholder="Cliente, Fornecedor, PA ..."
                        options={Object.values(ITypeRequestChange)}
                        disabled={mode === 'viewing' || mode === 'reviewing'}
                    />
                </SafeReviewField>
                {typeValue && (
                    <SafeReviewField field="documento_ou_codigo" mode={mode || "viewing"}>
                            <InputWithMask    
                                label={isClientOfSuplier? "CPF/CNPJ" : "Código do Produto"} 
                                name="documento_ou_codigo"
                                register={methods.register("documento_ou_codigo" as Path<T>)}
                                error={methods.formState.errors.documento_ou_codigo?.message as string | undefined} 
                                Icon={CodIcon}
                                readOnly={mode === 'viewing' || mode === 'reviewing'}
                                maskType={isClientOfSuplier ? "cpf_cnpj" : "codigo_totvs"}
                            />
                    </SafeReviewField>
                )}
            </FormSection>
            {typeValue && (
                <div className="flex flex-col gap-4">
                    <FormSection className="gap-4">
                        <SafeReviewField field="nome_cadastro" mode={mode || "viewing"}>
                            <Input
                                label={isClientOfSuplier? "Razão Social" : "Descriçao do Produto"} 
                                name="nome_cadastro"
                                register={methods.register("nome_cadastro" as Path<T>)}
                                error={methods.formState.errors.nome_cadastro?.message as string | undefined} 
                                placeholder={isClientOfSuplier ? "Razão social do cliente ou fornecedor" : "Descrição do produto que será alterado"}
                                readOnly={mode === 'viewing' || mode === 'reviewing'}
                                icon={CnpjAndCpfIcon}
                            />
                        </SafeReviewField>
                    
                    
                    </FormSection>
                    
                    <FormSection className="flex-row! gap-4">
                        <SafeReviewField field="aba_alteracao" mode={mode || "viewing"}>
                            <Input
                                label="Aba de alteração" 
                                name="aba_alteracao"
                                register={methods.register("aba_alteracao" as Path<T>)}
                                error={methods.formState.errors.aba_alteracao?.message as string | undefined} 
                                placeholder={"Qual aba será alterada?"}
                                readOnly={mode === 'viewing' || mode === 'reviewing'}
                                icon={TabChangeIcon}
                            />
                        </SafeReviewField>
                    
                        <SafeReviewField field="alteracao" mode={mode || "viewing"}>
                            <Input
                                label="Alteração desejada" 
                                name="alteracao"
                                register={methods.register("alteracao" as Path<T>)}
                                error={methods.formState.errors.alteracao?.message as string | undefined} 
                                placeholder="Qual alteração deseja fazer?"
                                readOnly={mode === 'viewing' || mode === 'reviewing'}
                                icon={ChangeIcon}
                            />
                        </SafeReviewField>
                    </FormSection>
                    <SafeReviewField field="observacao" mode={mode || "viewing"}>
                        <Input
                            label="Observação" 
                            name="observacao"
                            register={methods.register("observacao" as Path<T>)}
                            error={methods.formState.errors.observacao?.message as string | undefined} 
                            placeholder="Informe o motivo da alteração"
                            readOnly={mode === 'viewing' || mode === 'reviewing'}
                            icon={ObservationIcon}
                        />
                    </SafeReviewField>
                </div>
            )}
        </div>
    );
};