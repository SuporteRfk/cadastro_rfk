# 📁 Documentação do Utilitário (`formatText`)

### 📁 Localização

`/utils/format-text.utils.ts`

---

## 📊 Visão Geral

O `formatText` é um utilitário responsável por **formatar textos e datas** para exibição padronizada na interface. Atualmente, ele é utilizado principalmente para conversão de objetos `Date` ou strings de data para o formato legível `"dd/MM/yyyy HH:mm"`.

---

## 📦 Parâmetros

```ts
formatText(text: string | Date, type: "data"): string
```

| Parâmetro | Tipo           | Descrição                                      |
|-----------|----------------|------------------------------------------------|
| `text`    | `string | Date` | Valor a ser formatado                         |
| `type`    | `"data"`       | Tipo de formatação a ser aplicada (atualmente apenas `"data"` é suportado) |

---

## 🔁 Retorno

- Uma `string` representando a data formatada no padrão `dd/MM/yyyy HH:mm`
- Se o valor não for válido, retorna `""` (string vazia)

---

## ⚙️ Lógica Interna

- Verifica se `text` é string ou `Date` e tenta instanciar um objeto `Date`
- Se a data for inválida (`NaN`), retorna string vazia
- Extrai dia, mês, ano, hora e minuto, aplicando `padStart(2, "0")` para manter o padrão
- Retorna string formatada com separadores apropriados

---

## 💻 Exemplo de Uso

```ts
const resultado = formatText("2024-12-01T14:30:00Z", "data");
console.log(resultado); // "01/12/2024 11:30" (horário local pode variar)
```

---

## ⚖️ Regras de Uso

- Deve ser usado exclusivamente para exibição (não para persistência de dados)
- Suporta apenas o tipo `"data"` no momento
- Evita duplicação de lógica de formatação em componentes e tabelas

---

## 🧠 Por que usar esse utilitário?

- 🗓️ Garante consistência visual na exibição de datas
- 🧼 Centraliza lógica de formatação, facilitando manutenção
- 🚀 Simples, reutilizável e facilmente extensível para novos tipos de formatação
