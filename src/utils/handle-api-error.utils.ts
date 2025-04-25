/**
 * Função para tratar erros de autenticação (ou erros gerais de requisições Axios).
 * 
 * @param error - Objeto de erro capturado (pode ser AxiosError ou outro tipo).
 * @param message - Mensagem personalizada para exibir junto ao erro.
 * 
 * Esta função verifica se o erro é do tipo AxiosError:
 * - Se sim, exibe o `error_description` retornado pela API.
 * - Se não, converte o erro para string e exibe.
 * 
 * Sempre usa o componente Toastify para notificação.
 */

import { Toastify } from "@/components";
import { AxiosError } from "axios";

export const handleApiError = (error: unknown, message: string) => {
    if (error instanceof AxiosError) {
      const backendMessage = error.response?.data?.error_description || error.message;
      Toastify({
        type: "error",
        message: `${message}: ${backendMessage}`,
        duration: 5000,
      });
    } else {
      Toastify({
        type: "error",
        message: `${message}: ${String(error)}`,
        duration: 5000,
      });
    }
};







