import { IResourceAccess } from "./token.interface";


export interface IUser {
    id_keycloak: string;
    username: string;
    email: string;
    fullName: string;
    resource_access: IResourceAccess;
    access_approver: boolean;
    name: string;
    groups: string[];
    departaments: string;
    access_fiscal: boolean;
};