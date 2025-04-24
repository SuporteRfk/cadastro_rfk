type ContentType = "application/x-www-form-urlencoded" | "application/json";

/**
 * Gera cabeçalhos HTTP reutilizáveis para requisições de API.
 *
 * @param contentType - O tipo de conteúdo da requisição. Por padrão, é "application/x-www-form-urlencoded".
 * @returns Um objeto contendo a chave `headers` com os cabeçalhos configurados.
 *
 * 📌 Uso recomendado:
 * - Ideal para requisições com Axios, Fetch ou qualquer client HTTP.
 * - Centraliza a definição de headers, evitando duplicações e facilitando manutenção futura.
 *
 * Exemplo:
 * ```ts
 * const response = await axios.post(url, data, getHeaders("application/json"));
 * ```
 *
 * 🚀 Benefícios:
 * - Torna o código mais limpo e reutilizável.
 * - Facilita modificações futuras no padrão de cabeçalhos.
 * - Evita erros comuns de digitação de `Content-Type`.
 */
export const getHeaders = (
  contentType: ContentType = "application/x-www-form-urlencoded"
) => {
  return {
    headers: {
      "Content-Type": contentType,
    },
  };
};
