import { FormLayout, FormSection, Input, InputSelect, InputWithMask, PageLayout, SubTitleForm, Toastify } from "@/components";
import { insertIndirectProductsService } from "../service/insert-indirect-products.service";
import { indirectProductsRegisterSchema } from "../schema/indirect-products.schema";
import { IIndirectProductsRegister } from "../interface/indirect-products";
import { PackageCheck as IndirectProductsIcon } from "lucide-react";
import { yupResolver } from "@hookform/resolvers/yup";
import {
    GroupCodeIndirectProducts_30, 
    GroupCodeIndirectProducts_31, 
    GroupCodeIndirectProducts_32, 
    GroupCodeIndirectProducts_33, 
    GroupCodeIndirectProducts_36, 
    GroupCodeIndirectProducts_37, 
    GroupCodeIndirectProducts_39,
    FamilyCodeIndirectProducts,
    TypeCodeIndirectProducts
} from "../interface/indirect-products-enum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { handleApiError } from "@/utils";
import { 
    TbNumber as NCMIcon
} from "react-icons/tb";
import {
    ClipboardPenLine as DescriptionIcon,
    Ruler as UnidadeMedidaIcon,
} from "lucide-react";

export const RegisterIndirectProducts = () => {
    const [loading, setLoading] = useState(false);

    const [group, setGroup] = useState<
        | typeof GroupCodeIndirectProducts_30
        | typeof GroupCodeIndirectProducts_31 
        | typeof GroupCodeIndirectProducts_32
        | typeof GroupCodeIndirectProducts_33
        | typeof GroupCodeIndirectProducts_36
        | typeof GroupCodeIndirectProducts_37
        | typeof GroupCodeIndirectProducts_39
        | ["Selecione uma família"]
    > (["Selecione uma família"]);

    const methods = useForm<IIndirectProductsRegister>({
        resolver: yupResolver(indirectProductsRegisterSchema),
    });


    const codeFamilyValue = methods.watch("codigo_familia");

    const groupFamily = {
        [FamilyCodeIndirectProducts.IMOBILIZADO]: GroupCodeIndirectProducts_37,
        [FamilyCodeIndirectProducts.INSUMOS_NAO_PRODUTIVOS]: GroupCodeIndirectProducts_30,
        [FamilyCodeIndirectProducts.MATERIAL_CONSUMO]: GroupCodeIndirectProducts_31,
        [FamilyCodeIndirectProducts.MERCADORIA_REVENDA]: GroupCodeIndirectProducts_39,
        [FamilyCodeIndirectProducts.PRODUTO_MANUTENCAO_FROTAS]: GroupCodeIndirectProducts_33,
        [FamilyCodeIndirectProducts.PRODUTO_MANUTENCAO_INDUSTRIAL]: GroupCodeIndirectProducts_32,
        [FamilyCodeIndirectProducts.SUBPRODUTO]: GroupCodeIndirectProducts_36,
    };


    useEffect(()=> {
        const family = groupFamily[codeFamilyValue] ;
        setGroup(family || ["Selecione uma família"])
        
    },[codeFamilyValue])

    const onSubmit = async (data: IIndirectProductsRegister) => {
        try {
            setLoading(true);
            await insertIndirectProductsService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso!",
            });
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar produto indireto")
        }finally{
            setLoading(false);
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="Produtos Indiretos" 
                iconForm={IndirectProductsIcon} 
                showSector
                loading={loading}
                methods={methods}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados do Produto Indireto"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={IndirectProductsIcon}/>
                {/* Sessão de descrição do produto */}
                <FormSection className="gap-4 md:flex-row">
                    {/* Descrição curta do produto*/}
                    <Input    
                        label="Descrição Curta" 
                        name="descricao_curta"
                        register={methods.register("descricao_curta")}
                        error={methods.formState.errors.descricao_curta?.message} 
                        placeholder="Descrição breve do produto"
                        type="text"
                        icon={DescriptionIcon}
                    />

                    {/* Descrição do uso do produto*/}
                    <Input    
                        label="Uso do produto" 
                        name="descricao_uso"
                        register={methods.register("descricao_uso")}
                        error={methods.formState.errors.descricao_uso?.message} 
                        placeholder="Para que o produto será utilizado"
                        type="text"
                        icon={DescriptionIcon}
                    />
                </FormSection>
                {/* Sessão do tipo , familia e grupo */}
                <FormSection className="mt-2 md:mt-3 md:flex-row gap-4">
                    {/* Familia */}
                    <InputSelect
                        label="Família do Produto" 
                        name="codigo_familia"
                        error={methods.formState.errors.codigo_familia?.message} 
                        placeholder="Selecione a família"
                        options={Object.values(FamilyCodeIndirectProducts)}
                        selectLabel="Código da família"
                    />
                    {/* Grupo */}
                    <InputSelect
                        label="Grupo do Produto" 
                        name="codigo_grupo"
                        error={methods.formState.errors.codigo_grupo?.message} 
                        placeholder="Selecione o grupo"
                        options={Object.values(group)}
                        selectLabel="Código do grupo"
                    />
                    {/* Tipo */}
                    <InputSelect
                        label="Tipo de Produto"
                        selectLabel="Tipos"
                        options={Object.values(TypeCodeIndirectProducts)}
                        name="tipo"
                        error={methods.formState.errors.tipo?.message}
                        placeholder="Selecione o tipo"
                    />
                </FormSection>
                {/*  */}
                <FormSection className="md:flex-row gap-1 md:gap-4 md:mt-3">
                     {/* Unidade de medida | unit of measure */}
                     <Input    
                        label="Unidade de Medida" 
                        name="unidade_medida"
                        register={methods.register("unidade_medida")}
                        error={methods.formState.errors.unidade_medida?.message} 
                        placeholder="Unidade de medida por extenso. Ex: Unidade(UN)"
                        type="text"
                        icon={UnidadeMedidaIcon}
                    />
                    {/* NCM | NCM */}
                    <InputWithMask   
                        label="NCM" 
                        name="ncm"
                        maskType="custom"
                        error={methods.formState.errors.ncm?.message} 
                        Icon={NCMIcon}
                        customMask="9999.99.99"
                    />
                </FormSection>
            </FormLayout>
        </PageLayout>
    );
};