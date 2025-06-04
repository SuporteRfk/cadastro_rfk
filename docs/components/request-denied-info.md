# 📁 Documentação do Componente `RequestDeniedInfo`

## 📁 Localização
`/components/request-denied-info.components.tsx`

---

## 📊 Visão Geral

O `RequestDeniedInfo` é um componente visual utilizado para **exibir mensagens de solicitação negada**, com destaque visual em vermelho e uma descrição detalhada da observação do motivo da recusa.

---

## 🔧 Props Aceitas

| Prop         | Tipo     | Descrição                                           |
|--------------|----------|-----------------------------------------------------|
| `observation`| `string` | Texto explicativo com o motivo da solicitação negada.|

---

## 🎨 Estilo

```tsx
<div className="bg-red-50 border border-red-200 px-4 py-2 mt-4 rounded-md">
  <p className="flex items-center gap-2 text-error font-semibold mb-1">
    <TriangleAlert size={18} />
    Solicitação negada
  </p>
  <p className="text-sm text-text-medium">{observation}</p>
</div>
```

### Explicação:

| Elemento        | Estilo                           | Descrição                             |
|------------------|----------------------------------|-----------------------------------------|
| `bg-red-50`       | Fundo suave vermelho claro       | Indica estado de erro/atenção           |
| `text-error`      | Cor do tema para texto de erro   | Consistência com outros alertas         |
| `TriangleAlert`   | Ícone da lib `lucide-react`      | Reforça visualmente o aviso             |
| `observation`     | Texto adicional explicativo       | Exibe a justificativa da negação         |

---

## ⚖️ Regras de Uso

- Deve ser utilizado **apenas quando uma solicitação for explicitamente negada**.
- Ideal para exibição abaixo de formulários ou resumos de revisão de solicitações.
- O texto de observação deve ser claro, direto e informativo.

---

## 💻 Exemplo de Uso

```tsx
<RequestDeniedInfo observation="O valor informado está incorreto para o produto selecionado." />
```

---

## 🔗 Conexões

- Pode ser utilizado junto a formulários, painéis de aprovação, ou qualquer fluxo que contenha triagem/validação.

---

## 🧠 Por que usar este componente?

- ⚠️ Destaca mensagens de erro ou rejeição de forma padronizada
- 📢 Reforça a comunicação clara com o usuário
- ♻️ Evita replicação de blocos de erro visual em múltiplos pontos
