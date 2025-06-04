# 📁 Documentação (`main.tsx`)

### 📁 Localização
`/src/main.tsx`

---

## 📊 Visão Geral

O `main.tsx` é o **ponto de entrada da aplicação React**. Ele é responsável por:

- Inicializar a renderização React com `createRoot`
- Envolver a aplicação com os contextos globais necessários
- Configurar o roteador com `BrowserRouter`
- Adicionar o sistema global de notificações (`Toaster`)
- Aplicar o modo estrito de verificação (`StrictMode`)

---

## ⚙️ Ordem de Montagem

```tsx
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <AuthProvider>
        <ModalProvider>
          <NavigationProvider>
            <RequestProvider>
              <Toaster />
              <App />
            </RequestProvider>
          </NavigationProvider>
        </ModalProvider>
      </AuthProvider>
    </StrictMode>
  </BrowserRouter>
)
```

### 🧱 Estrutura

| Provider             | Função principal                                               |
|----------------------|----------------------------------------------------------------|
| `AuthProvider`       | Controla sessão e autenticação do usuário                      |
| `ModalProvider`      | Gerencia exibição de modais globais                            |
| `NavigationProvider` | Auxilia com navegação programática entre rotas                 |
| `RequestProvider`    | Gerencia dados e contadores relacionados a solicitações        |
| `Toaster`            | Exibe notificações globais (`react-hot-toast`)                 |
| `BrowserRouter`      | Permite navegação baseada em URL com `react-router-dom`        |
| `StrictMode`         | Ativa verificações adicionais no React (dev mode)              |

---

## 📦 Dependências Importadas

- `react-dom/client`: API moderna para criar root (`createRoot`)
- `react-router`: Fornece `BrowserRouter`
- `react-hot-toast`: Sistema de notificações `Toaster`
- `./App.tsx`: Componente principal da aplicação
- `./context`: Agrupa todos os contextos globais
- `./style/global.css`: Estilos globais da aplicação

---

## 🧠 Boas Práticas Aplicadas

- ✅ Contextos organizados e centralizados
- ♻️ Composição limpa e aninhada de providers
- 📦 Importações separadas por responsabilidade
- 🚦 Modo estrito do React habilitado para garantir integridade durante desenvolvimento

