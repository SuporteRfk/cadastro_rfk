# 📦 Documentação Geral da Pasta `features`

## 📁 Localização
`/src/features`

## 📊 Visão Geral

A pasta `features` organiza funcionalidades independentes do sistema de forma modular. Cada subpasta representa uma **feature autocontenida**, com tudo que ela precisa para funcionar: componentes, serviços, validações, utilitários, interfaces e páginas.

Esse modelo facilita a escalabilidade, manutenção e separação de responsabilidades, seguindo a filosofia de feature-first.

---

## 🧱 Estrutura de uma Feature

Cada feature pode conter:

| Pasta/Arquivo                 | Descrição                                                                 |
|------------------------------|---------------------------------------------------------------------------|
| `components/`                | Componentes React específicos da feature                                  |
| `page/`                      | Páginas que utilizam os componentes e lógica da feature                   |
| `interface/`                 | Tipagens, enums e interfaces relacionadas à feature                       |
| `schema/`                    | Schemas de validação (Zod, Yup, etc)                                      |
| `service/`                   | Ações que se comunicam com APIs ou banco de dados                         |
| `utils/`                     | Funções auxiliares específicas da feature                                 |

---

## 🛠️ Como Adicionar uma Nova Feature

1. **Criar diretório com o nome da feature**:
```bash
mkdir src/features/nome-da-feature
```

2. **Adicionar arquivos conforme necessário**:
- `components/nome-form-manager.tsx`
- `interface/nome.ts`
- `schema/nome.schema.ts`
- `service/insert-nome.service.ts`
- `service/update-nome.service.ts`
- `page/register-nome.page.tsx` (se for necessário uma rota)
- `utils/` (opcional)

3. **Usar o padrão de tipagens e validações já adotado em outras features.**

4. **Garantir que todos os nomes sigam a convenção kebab-case para arquivos e PascalCase para componentes.**

---

## 📚 Boas Práticas

- Use `FormManager` como padrão de nome para componentes principais da feature.
- Sempre centralize os serviços em `service/`.
- Armazene interfaces e enums em `interface/`.
- Utilize o padrão de schemas validando os dados esperados na criação ou edição.
- Adicione um `README` local se a feature tiver regras complexas.

---

## 💡 Melhorias planejadas (futuras)

- Adicionar testes unitários por feature
- Suporte a pastas `hooks/` para lógica reutilizável dentro da feature
- Scripts para scaffolding automático de nova feature
