# 📘 Documentação do Projeto

Bem-vindo à documentação oficial do projeto.

## 📂 Índice

- [📁 Estrutura do Projeto](./estrutura-projeto.md)
- [🔁 Fluxo da Aplicação](./fluxo-aplicacao.md)
- [📍 Centralizador de Importação](./centralizador-importacao.md)
- [🧩 Componentes](./components/)
    - 📋Forms     
        🧾 ***Identificação e Dados Gerais***
        - [📇 FormRegistrationIdentification](./components/forms/form-registration-identification.md): Form para identificação cadastral (CNPJ,CPF, tipo de cadastro, etc).
        - [🏛️ FormTaxIdentification](./components/forms/form-tax-identification.md): Form para dados fiscais e tributários.
        - [🧑‍💼 FormBusinessNames](./components/forms/form-business-names): Form para captar razão social e nome fantasia. 
        
        📦 ***Produto***
        - [📦 FormProductCode](./components/forms/form-product-code.md): Form identificação dos código do produtos (cod barra, saib).
        - [📓 FormProductDescription](./components/forms/form-product-description.md): Form para descrição do produto.
        - [🪪 FormProductCategorySelector](./components/forms/form-product-category-selector.md): Form para tipo, grupo e família do produto.
        - [⚙️ FormProductAttributes](./components/forms/form-product-attributes.md): Form para características físicas e tributárias do produto.
        - [📏 FormProductDimensions](./components/forms/form-product-dimensions.md): Form para dimensões físicas do produto.
        - [🎁 FormProductPackagingInfo ](./components/forms/form-product-packaging-info.md): Form para informações de embalagem do produto.  

        🏠 ***Endereço e Contato***
        - [🏠 FormAddress ](./components/forms/form-address.md): Form para captar o endereço.
        - [☎️ FormTelephone ](./components/forms/form-telephone.md): Form para captar número para contato.  
        
        📅 ***Datas e Pesos***
        - [🕒 FormValidity ](./components/forms/form-validity.md): Form para validade do produto.
        - [⚖️ FormWeights ](./components/forms/form-weights.md): Form para peso bruto e peso líquido.  

        📦 ***Paletização***
        - [⚖️ FormPalletizingTrackingConversion ](./components/forms/form-palletizing-tracking-conversion.md): Form para paletização.  

        🧩 ***Utilitários de Layout***
        - [🧱 FormSection](./components/forms/form-section.md): Agrupar campos em seções estruturadas.
        - [🧮 FormLayout](./components/forms/form-layout.md): Define a estrutura visual do formulário.
        - [🔹 SubTitleForm](./components/forms/sub-title-form.md): Componente de subtítulo para separar ou contextualizar seções dentro do formulário.  
        
        ❌ ***Campos e Feedback***
        - [🎛️ FormActionsButtonsRequest](./components/forms/form-actions-buttons-request.md): botões de ação para formulários, usado no form manager de cada feature.
        - [❌ FormObservationDeniedField](./components/forms/form-observation-denied-field.md): Coletar a justificativa textual ao negar uma solicitação.
    - 📥 Inputs
        - [🔤 Input](./components/inputs/input.md): Componente reutilizavel do Input
        - [📆 InputDate](./components/inputs/input-date.md): Componente reutilizavel do Input para tipo `Date`.
        - [💱 InputDecimal](./components/inputs/input-decimal.md): Componente reutilizavel do Input para números decimais.
        - [🎭 InputMask](./components/inputs/input-mask.md): Componente reutilizavel do Input que necessitam de formatação (CPF,CNPJ, etc).
        - [⚪ InputRadio](./components/inputs/input-radio.md): Componente reutilizavel do Input tipo `Radio`.
        - [🔽 InputSelect](./components/inputs/input-select.md): Componente reutilizavel do Input tipo `Select`.
    - 📚 Menus
        - [🖥️ MenuDesktop](./components/menus/menu-desktop.md): Menu Desktop
        - [📱 MenuMobile](./components/menus/menu-mobile.md): Menu Mobile
        - [🧭 NavMenu](./components/menus/nav-menu.md): Lógica de navegação dos menus.
    - 🪟 Modal
        - [❓ ModalQuestion](./components/modal/modal-question.md): Modal de pergunta, antes de alguma ação.
        - [🛠️ ModalRequestActions](./components/modal/modal-request-actions.md): Botões de ações do modal de solicitação(`ModalRequest`).
        - [🔀 ModalRequestRouter](./components/modal/modal-request-router.md): Componente de roteamento do `ModalRequest`, para saber qual form será renderizado.
        - [📦 ModalRequestWrapper](./components/modal/modal-request-wrapper.md): Componente para tratar lógica das solicitações, antes de renderizar os form manager.
        - [📨 ModalRequest](./components/modal/modal-request.md): Modal central , pai de todos os outros componentes referentes ao modal.
    - 🕵️ Review Field 
        - [🔍 ReviewField](./components/review-field/review-field.md): Componente para usar no modo de revisão.
        - [🛡️ SafeReviewField](./components/review-field/safe-review.md): Componente para renderizar o review-field fora do contexto.  
    - 🗃️ Table
        - [📄 RequestTable](./components/table/request-table.md): Componente pai da tabela, onde todos os outros componentes são chamados.    
        - [📄 RequestTableFilter](./components//table/request-table-filter.md): Responsavel pelo filtro da tabela.    
        - [📄 RequestTableBody](./components/table/request-table-body.md): Renderiza o body da tabela.    
        - [📄 RequestTableHeader](./components/table/request-table-header.md): Renderiza o header da tabela.    
        - [📄 RequestTablePagination](./components/table/request-table-pagination.md): Renderiza a paginação da tabela.    
        - [📄 RequestColumns](./components/table/request-columns.md): Responsavel por montar a estrutura da tabela.    
    - [🔢 BadgeCounter](./components/badge-counter.md): Exibe contadores.
    - [🖲️ Button](./components/button.md): Componente de botão reutilizável.
    - [🔄 FullPageLoader](./components/full-page-loader.md): Tela de carregamento exibida em full screen.
    - [⏳ LoadingModals](./components/loading-modals.md): Loading para os modais.
    - [🦴 LoadingSkelleton](./components/loading-skelleton.md): Loading para render do contéudo das tabelas.
    - [☕ MomentCoffe](./components/moment-coffe.md): Componente para exibir mensagens amigáveis.
    - [📐 PageLayout](./components/page-layout.md): Define a estrutura visual da página.
    - [🛑 RequestDeniedInfo](./components/request-denied-info.md): Exibe informações e justificativas para requisições negadas.
    - [🔔 Toastify](./components/toastify.md): Notificações estilo toast.
- [🌐 Context](./context)
    - [🧑‍💻 Auth Context](./context/auth.md): Gerencia autenticação, sessão e dados do usuário.
    - [💬 Modal Context](./context/modal.md): Controla a exibição de modais.
    - [🗺️ Navigation Context](./context/request.md): Gerencia estado de navegação e menus ativos.
    - [📩 Request Context](./context/request.md): Gerencia as solicitações, contadores e filtros.
    - [🧐 Review Context](./context/request.md): Controla o estado das etapas de revisão.
- [🧠 Core](./core/)
    - [💻 App](./core/App.md): Raiz da aplicação, responsável por montar a estrutura principal.
    - [🚀 main](./core/main.md): Ponto de entrada que inicializa a aplicação no DOM
- [🗃️ Data](./data/)
    - [📑 Menu](./data/menu.md): Fonte de dados pra construção dos menus de navegação
- [🛠️ Features](./features/)
    - [📖 Feature Overview](./features/features-overview.md): Overview sobre a modularização do projeto.  
    - [👤 Feature client](./features/features-client.md): Exemplo de uma feature. 
- [🪝 Hooks](./hooks/)
    - [🏢 useCNPJSearch](./hooks/use-CNPJ-search.md): Gerencia lógica de buscar dados de PJ e salvar dados via methods do `react-hook-form`.
    - [🚫 useDeniedRequest](./hooks/use-denied-request.md): Gerencia lógica salvar solicitação negada.
    - [✏️ useEditRequest](./hooks/use-edit-request.md): Gerencia lógica salvar solicitação que foi apenas editada.
    - [⚠️ useObservationDenied](./hooks/use-observation-denied.md): Gerencia observações associadas a requisições negadas.
    - [✅ useRequestApprove](./hooks/use-request-approve.md):  Gerencia lógica salvar solicitação que foi aprovada.
    - [👁️ useReviewRequest](./hooks/use-review-request.md):  Gerencia lógica salvar solicitação que será enviada para revisão.
    - [📡 useSupabaseRealtime](./hooks/use-supabase-realtime.md): Escuta eventos em tempo real no Supabase
- [🔀 Routes](./routes/)
    - [🚪 privateRoutes](./routes/routes.md): Rotas Privadas.
    - [🟢 publicRoutes](./routes/routes.md): Rotas públicas. 
    - [🛣️ routes](./routes/routes.md): Mapeamento das rotas.
- [🔧 Utils](./utils/)
    - [🎭 applyMasks](./utils/apply-masks.md): Aplica máscaras de formatação a strings (ex: CPF, CNPJ, telefone).
    - [🧑‍💼 buildUserFromToken](./utils/build-user.md): Constrói objeto de usuário com base no token decodificado.
    - [🧬 decodeToken](./utils/decode-token.md): Decodifica e interpreta tokens de autenticação.
    - [✂️ formatText](./utils//format-text.md): Formata textos para exibição padronizada. 
    - [📬 getHeaders](./utils/get-headers.md): Gera headers HTTP.
    - [🚨 handleApiError](./utils/handle-api-error.md): Trata e exibe erros vindos da API de forma padronizada.


