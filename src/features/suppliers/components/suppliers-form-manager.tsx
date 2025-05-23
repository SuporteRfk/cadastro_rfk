import { FormAddress, FormBusinessNames, FormLayout, FormRegistrationIdentification, FormTaxIdentification, FormTelephone, LoadingModal, SubTitleForm } from "@/components";
import { FormActionsButtonsRequest } from "@/components/form/form-actions-buttons-request";
import { ISupplier, ISupplierRegisterForm } from "../interface/supplier";
import { supplierRegisterSchema } from "../schema/supplier.schema";
import { useEditRequest } from "@/hooks/use-edit-request.hooks";
import { FormStateType, StatusRequest } from "@/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
    MapPinned as ZipCodeIcon,
     Factory as SuppliersIcon
} from "lucide-react";
import { upsertSupplierService } from "../service/update-supplier.service";
import { SupplierTpj, SupplierType } from "../interface/supplier-enum";
import { useState } from "react";




interface SuppliersFormManagerProps{
    defaultValue: ISupplier;
    mode: FormStateType;
    isChange: boolean;
    loadingModal: boolean;
    setReasonFieldReview:  React.Dispatch<React.SetStateAction<{[key: string]: string;}>>
    reasonFieldReview: {[key: string]: string };
    setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
    status: StatusRequest;
    setMode:React.Dispatch<React.SetStateAction<FormStateType>>
    viewRequestId: number;
}

export const SuppliersFormManager = ({defaultValue, mode, isChange, loadingModal, setReasonFieldReview, reasonFieldReview, setLoadingModal, status, setMode, viewRequestId}:SuppliersFormManagerProps) => {
    
    if(loadingModal){
        return <LoadingModal/> 
    }
    
    const [loadingLocal, setLoadingLocal] = useState(false);    

    
    const methods= useForm<ISupplierRegisterForm>({
        defaultValues: defaultValue,
        resolver: yupResolver(supplierRegisterSchema)
    });

    
    // Hook para lidar com editar a form
    const { handleEdit } = useEditRequest<ISupplierRegisterForm>({
        setLoadingModal: setLoadingLocal,
        setMode,
        status,
        viewRequestId,
        updateFunction: upsertSupplierService
    });


    return(
        <FormLayout 
            methods={methods} 
            loading={loadingLocal} 
            titleForm={`Fornecedor - #${defaultValue?.id}`} 
            iconForm={SuppliersIcon}
            mode={mode}
            showButtonsDefault={false}            
        >
            {/* SubTitulo Dados do fornecedor */}
            <SubTitleForm title="Dados do Fornecedor"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={SuppliersIcon}/>
         
            
           {/* Sessão de Identificação do cliente (CNPJ/CPF, tipo do cliente)*/}
            <FormRegistrationIdentification 
                methods={methods} 
                typeForm="supplier" 
                setLoading={setLoadingLocal}
                optionsForType={Object.values(SupplierType)}
                mode={mode}
            />
            
            {/* Sessão de razão social e nome fantasia */}
            <FormBusinessNames methods={methods} mode={mode}/>

            {/* Sessão de identificação jurifica (CNAE, I.E, OPTANTE e Email do cliente) */}
            <FormTaxIdentification 
                methods={methods} 
                optionsTpj={Object.values(SupplierTpj)}
                typeForm="supplier"
                mode={mode}
            />
            
            {/* Sessão telefones */}
            <FormTelephone methods={methods} mode={mode}/>
            
            {/* SubTitulo Endereço */}
            <SubTitleForm title="Endereço"  styleLine="border-t-3 border-dashed border-strong/10 mt-4" icon={ZipCodeIcon}/>
            {/* Sessão endereço */}
            <FormAddress methods={methods} setLoading={setLoadingLocal} mode={mode}/>

            {/* Botões de salvar / cancelar */}
            <FormActionsButtonsRequest
                methods={methods}
                mode={mode}
                setMode={setMode}
                onConfirm={(data) => {
                    const {fisica_juridica, ...dataRegister} = data;
                    handleEdit(defaultValue.id, dataRegister as ISupplierRegisterForm)
                }}
            />
        </FormLayout>
        
    );
};


