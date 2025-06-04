# 📁 Documentação do Componente `FormTelephone`

## 📁 Localização
`/components/form/form-telephone.components.tsx`

---

## 📊 Visão Geral

O componente `FormTelephone` é responsável por renderizar até **quatro campos de telefone** com máscara dinâmica e controle de estado de visualização/edição. Ele é usado em formulários que exigem coleta de múltimos contatos telefônicos, como empresas, fornecedores ou clientes.

Cada campo utiliza `SafeReviewField` para respeitar o estado de edição (`editing`), visualização (`viewing`) ou revisão (`reviewing`).

---

## 🧩 Props Aceitas

| Prop       | Tipo                     | Descrição                                               |
|------------|--------------------------|-----------------------------------------------------------|
| `mode`     | `"editing"` \| `"viewing"` \| `"reviewing"` | Controla o modo de exibição dos campos.                   |
| `methods`  | `UseFormReturn<T>`       | Objeto do `react-hook-form` com métodos do formulário.    |

---

## ☎️ Campos Renderizados

| Campo        | Nome do Field | Ícone         | Observações           |
|--------------|---------------|----------------|------------------------|
| Telefone 1   | `telefone_1`  | `WhatsAppIcon` | Obrigatório            |
| Telefone 2   | `telefone_2`  | `WhatsAppIcon` | Opcional               |
| Telefone 3   | `telefone_3`  | `TelephoneIcon`| Opcional               |
| Telefone 4   | `telefone_4`  | `TelephoneIcon`| Opcional               |

Todos os campos usam:
- `InputWithMask` com `maskType="dynamic"`
- Controle de erro por `formState.errors`
- Componente `SafeReviewField` para alternar comportamento com base no `mode`

---

## 🔗 Conexões

- `InputWithMask`: campo com máscara dinâmica para telefone
- `SafeReviewField`: alterna entre edição, visualização e revisão
- `FormSection`: layout flexível para os campos
- `react-hook-form`: controle do estado do formulário e validação
- `react-icons/fa6` e `lucide-react`: ícones utilizados

---

## 💻 Exemplo de Uso

```tsx
<FormTelephone
  mode="editing"
  methods={methods}
/>
```

---

## 🧠 Por que usar este componente?

- ☎️ Centraliza todos os campos de telefone em um único componente reutilizável
- 🔐 Garante consistência visual e comportamental com `SafeReviewField`
- 🔁 Permite uso em múltiplos modos sem duplicação de código
- 🧼 Máscara dinâmica melhora experiência e validação do usuário
