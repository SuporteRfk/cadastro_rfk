# routes.ts

## 📁 Localização
`/src/routes/routes.ts`

## 📊 Visão Geral
Arquivo responsável por armazenar a configuração centralizada das rotas da aplicação, separadas entre:
- **Rotas privadas**: acessíveis apenas por usuários autenticados.
- **Rotas públicas**: acessíveis sem autenticação (ex.: Login).

Este arquivo facilita a organização e expansão das rotas, tornando a manutenção mais simples e evitando a repetição de código.

## 🔎 Detalhes Técnicos
- As rotas privadas (`privateRoutes`) e públicas (`publicRoutes`) são arrays de objetos contendo:
  - `path`: caminho da URL.
  - `element`: componente React a ser renderizado.

- Cada rota é mapeada posteriormente em `PrivateRoutes.tsx` e `PublicRoutes.tsx`.

- A estrutura atual está preparada para ser escalável: adicionar novas rotas exige apenas incluir um novo objeto neste arquivo.

## ⚖️ Regras de Uso
- Todo novo caminho da aplicação deve ser registrado neste arquivo.
- Separar corretamente entre rota pública e privada.
- Não misturar responsabilidades: apenas path e element são configurados aqui.
- Outros dados visuais (nome do menu, ícone, etc.) ficam separados no arquivo `routesData.ts`.

## 💻 Exemplo de Uso
No `PrivateRoutes.tsx`, a lista `privateRoutes` é utilizada para mapear as rotas privadas:

```tsx
import { privateRoutes } from "@/routes/routes";

const PrivateRoutes = () => {
  return (
    <Routes>
      {privateRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
