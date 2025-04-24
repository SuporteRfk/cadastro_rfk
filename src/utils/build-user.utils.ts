import { IResourceAccess, ITokenBearer } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";

/**
 * Extrai o nome do departamento a partir do Distinguished Name fornecido.
 * Regex é usada para localizar a informação dentro de um padrão específico.
 * Se o padrão não for encontrado, retorna "Grupo Refriko" como valor padrão.
 */
const getDepartmentFromDistinguishedName = (distinguished: string): string => {
    const regex = /OU=([^,]+),OU=Departamentos/;
    const match = distinguished.match(regex);
    return match ? match[1] : "Grupo Refriko";
};

/**
 * Verifica se o usuário tem permissão de aprovador.
 * Baseia-se no acesso ao recurso (`resource_access`) fornecido pelo token decodificado.
 * Compara o `clientId` e a `roleApproved` configurados no ambiente com os dados do token.
 */
const userHasAccessApprover = (resource_access: IResourceAccess): boolean => {
    const clientId = import.meta.env.VITE_KEYCLOAK_CLIENT_ID;
    const roleApproved = import.meta.env.VITE_KEYCLOAK_ACCESS_APPROVED;
    const accessUserList = Object.keys(resource_access);

    if (accessUserList.includes(clientId)) {
        const rolesClient = resource_access[clientId].roles;
        return rolesClient.includes(roleApproved);
    }
    return false;
};

/**
 * Constrói um objeto `IUser` baseado nos dados decodificados do token.
 * - `id_keycloak`: ID único do Keycloak.
 * - `email`: E-mail do usuário.
 * - `username`: Nome de usuário preferido.
 * - `name`: Primeiro nome.
 * - `fullName`: Nome completo (primeiro nome + sobrenome).
 * - `groups`: Lista de grupos aos quais o usuário pertence.
 * - `resource_access`: Acessos disponíveis ao usuário no token.
 * - `departaments`: Nome do departamento extraído do Distinguished Name.
 * - `access_approver`: Indica se o usuário possui permissão de aprovador.
 */
export const buildUserFromToken = (decodedToken: ITokenBearer): IUser => {
    return {
        id_keycloak: decodedToken.sub,
        email: decodedToken.email,
        username: decodedToken.preferred_username,
        name: decodedToken.given_name,
        fullName: `${decodedToken.given_name} ${decodedToken.family_name}`,
        groups: decodedToken.groups,
        resource_access: decodedToken.resource_access,
        departaments: getDepartmentFromDistinguishedName(decodedToken.distinguished),
        access_approver: userHasAccessApprover(decodedToken.resource_access),
    };
};
