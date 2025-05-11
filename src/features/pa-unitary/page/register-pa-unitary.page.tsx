import { FormLayout, FormProductCategorySelector, FormProductCode, FormProductDescription, PageLayout, SubTitleForm, Toastify } from "@/components";
import { FamilyCodePAUnitary, GroupCodePAUnitary, TypeCodeoPAUnitary } from "../interface/pa-unitary-enum";
import { IPAUnitaryRegister } from "../interface/pa-unitary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    Box as UnitaryIcon,
    Warehouse as StorageIcon,
    Ruler as UnitMeasureIcon,
    Weight as KgIcon,
    Landmark as TaxIcon,
    Cherry as FlavorIcon,
    Crown as MarkIcon,
    Layers as BallastIcon,
    Move3D as DepthIcon,
    MoveHorizontal as WidthIcon,
    MoveVertical as HeightIcon,    
    Clock as ValidityIcon,
    PackageMinus as BatchesMinimumIcon,
    Boxes as BatchesEconomicIcon
} from "lucide-react";
import { useState } from "react";
import { handleApiError } from "@/utils";
import { insertPAUnitaryService } from "../service/insert-pa-unitary.service";
import { paUnitaryRegisterSchema } from "../schema/pa-unitary.schema";
import { FormProductPackagingInfo } from "@/components/form/form-product-packaging-info.components";

export const RegisterPAUnitary = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const methods = useForm<IPAUnitaryRegister>({
        resolver: yupResolver(paUnitaryRegisterSchema)
    });

    const onSubmit = async (data:IPAUnitaryRegister) => {
        try {
            setLoading(true);
            await insertPAUnitaryService(data);
            Toastify({
                type: "success",
                message: "Solicitação realizada com sucesso"
            });
            methods.reset();
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar produto unitário");
        }finally {
            setLoading(false);
        }
    };

    return(
        <PageLayout>
            <FormLayout 
                titleForm="P.A Unitário" 
                iconForm={UnitaryIcon}
                methods={methods}
                loading={loading}
                onSubmit={onSubmit}
            >
                <SubTitleForm title="Dados do P.A Unitário"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={UnitaryIcon}/>
                {/* Sessão de descrição do P.A */}
                <FormProductDescription methods={methods}/>
                
                {/* Sessão do código de barras e código saib */}
                <FormProductCode methods={methods} showSecondCodeBar configSecondCodeBar="formPaUnitary"/>

                {/* Sessão do tipo, grupo e família */}
                <FormProductCategorySelector 
                    methods={methods} 
                    family={Object.values(FamilyCodePAUnitary)}
                    group={Object.values(GroupCodePAUnitary)}
                    type={Object.values(TypeCodeoPAUnitary)}
                />
                {/* Sessão Armazenagem */}
                <SubTitleForm title="Armazenagem e Embalagem"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={StorageIcon}/>
                <FormProductPackagingInfo methods={methods}/>
            
            
            
            </FormLayout>
        </PageLayout>
    );
};