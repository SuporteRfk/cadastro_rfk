import { PfOrPj } from '@/interfaces';
import { unMask } from 'remask';

export const setPjOrPfSuppliers = (cnpjOrCpf:string):PfOrPj.FISICO | PfOrPj.JURIDICO => {
    const originalValue = unMask(cnpjOrCpf);
    if(originalValue.length === 14){
        return PfOrPj.JURIDICO;
    } else {
        return PfOrPj.FISICO;
    }
}
