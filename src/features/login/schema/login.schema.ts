import { ILoginRequest } from "@/interfaces";
import * as yup from "yup";


export const loginSchema:yup.ObjectSchema<ILoginRequest> = yup.object().shape({
    username: yup.string().required('Informar o seu usúario de login do windows'),
    password: yup.string().required('Informar sua senha')
});