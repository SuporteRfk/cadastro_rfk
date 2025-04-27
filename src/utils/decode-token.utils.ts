import { jwtDecode } from "jwt-decode";
import { ITokenBearer, ITokenRefresh } from "../interfaces/token.interface";

/**
 * Decodifica um token JWT e retorna o payload decodificado.
 * @param token O token JWT a ser decodificado.
 * @returns O conteúdo do token (payload).
 */

export const decodeToken = (token: string): ITokenRefresh | ITokenBearer => {
  return jwtDecode(token);
};