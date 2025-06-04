# 📁 Documentação do Componente `SubTitleForm`

## 📁 Localização
`/components/form/sub-title-form.components.tsx`

---

## 📊 Visão Geral

O `SubTitleForm` é um componente visual utilizado para exibir **títulos de seções dentro de formulários**. Ele é composto por um ícone (personalizável ou padrão) e um título estilizado.

---

## 🧩 Props Aceitas

| Prop        | Tipo            | Descrição                                              |
|-------------|------------------|----------------------------------------------------------|
| `title`     | `string`         | Texto a ser exibido como título da seção.               |
| `styleLine` | `string` (opcional) | Classe CSS extra aplicada ao container principal.   |
| `icon`      | `LucideIcon` (opcional) | Ícone customizado exibido ao lado do título.      |

---

## 🧱 Estrutura

```tsx
<div className="...">
  <Icon size={20} />
  <h3>...</h3>
</div>
```

Se nenhuma `icon` for passada, o componente usa `ClipboardList` como padrão.

---

## 💻 Exemplo de Uso

```tsx
<SubTitleForm
  title="Informações de Entrega"
  icon={TruckIcon}
/>
```

---

## 🧠 Por que usar este componente?

- ✏️ Permite destacar visualmente blocos de campos no formulário.
- 🔁 Reutilizável e padronizado com ícones consistentes.
- 🧱 Mantém a interface mais clara e segmentada.
