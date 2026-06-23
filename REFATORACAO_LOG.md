# Log de Alterações - Refatoração Trimly (SOLID, Design Patterns & MySQL)

Este arquivo registra todas as alterações arquiteturais e funcionais realizadas no projeto Trimly para fins de histórico e auditoria.

---

### [2026-06-23] - Refatoração Arquitetural e Suporte a Banco de Dados

#### 1. Implementação dos Princípios SOLID e Design Patterns (Frontend Principal)
Refatoração estrutural da camada de acesso a dados e lógica de negócios do frontend, eliminando a dependência direta dos componentes do Vue com o LocalStorage.
*   **Repository Pattern (`src/repositories/`)**:
    *   [NEW] [BaseRepository.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/repositories/BaseRepository.js): Contém as classes abstratas e interfaces de acesso a dados para Usuários, Barbearias, Cortes, Agendamentos e Horários.
    *   [NEW] [LocalStorageRepositories.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/repositories/LocalStorageRepositories.js): Implementação concreta que isola o acesso ao `localStorage`.
    *   [NEW] [ApiRepositories.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/repositories/ApiRepositories.js): Implementação concreta que realiza requisições HTTP REST para o servidor de banco de dados.
*   **Service Layer (`src/services/`)**:
    *   [NEW] [AuthService.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/services/AuthService.js): Centraliza lógica de login, registro, sessão e atualização de perfil.
    *   [NEW] [BookingService.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/services/BookingService.js): Gerencia regras de reserva, prevenção de double-booking, carregamento de horários disponíveis, cancelamentos e reagendamentos.
    *   [NEW] [index.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/services/index.js): Registro centralizador (Facade) que realiza a injeção de dependência baseado na flag `USE_API`.
*   **Factory Pattern (`src/factories/`)**:
    *   [NEW] [UserFactory.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/factories/UserFactory.js): Padroniza a criação de perfis de usuários (`Cliente`, `Barbeiro`, `Administrador`).
*   **Strategy Pattern (`src/strategies/`)**:
    *   [NEW] [RoleStrategy.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/strategies/RoleStrategy.js): Desacopla as permissões e roteamentos de telas específicas baseadas em cargos do usuário.
*   **Refatoração das Views**:
    *   [MODIFY] [Login.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/Login.vue)
    *   [MODIFY] [AdminDashboard.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/AdminDashboard.vue)
    *   [MODIFY] [BarbeariaDetalhes.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/BarbeariaDetalhes.vue)
    *   [MODIFY] [BarbeiroDashboard.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/BarbeiroDashboard.vue)
    *   [MODIFY] [ClienteAgendamentos.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/ClienteAgendamentos.vue)
    *   [MODIFY] [PerfilUsuario.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/PerfilUsuario.vue)
    *   [MODIFY] [home.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/home.vue)

#### 2. Criação da Pasta para Integração MySQL (`trimly-versao-banco/`)
Estruturação e cópia do ecossistema configurado para utilizar banco de dados relacional.
*   **Backend REST API (`trimly-versao-banco/backend/`)**:
    *   [NEW] `package.json`: Configurações de dependências do Express, Mysql2, CORS.
    *   [NEW] `.env.example`: Exemplo de configuração de variáveis do banco.
    *   [NEW] `server.js`: API REST contendo as rotas de leitura/escrita mapeadas para o banco de dados. Implementa controle de sessão por conexão para triggers do MySQL (`SET @usuario_logado_id = ?`).
    *   [NEW] `TrimlyBD_Atualizado.sql`: Modelagem física atualizada.
        *   Adicionado campos `categoria` e `imagem` na tabela `Barbearia`.
        *   Adicionado campo `descricao` na tabela `Agenda` (Requisito R4).
        *   DML ajustado para seedar as **6 barbearias** originais, dados de usuários de testes e senhas padrão `'123'`.
*   **Frontend Banco (`trimly-versao-banco/frontend/`)**:
    *   Cópia estruturada do frontend refatorado.
    *   [MODIFY] `src/services/index.js` configurado para `USE_API = true`.

#### [2026-06-23] - Limpeza de tags redundantes no App.vue
*   [MODIFY] [App.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/App.vue): Removido o componente inativo/redundante `<aboutUs />` que estava declarado no template sem importação no `<script setup>`, o que poderia causar erros de renderização ou inconsistência na exibição do Footer.
*   [MODIFY] `trimly-versao-banco/frontend/src/App.vue`: Aplicada a mesma limpeza no arquivo equivalente da versão com banco.

#### [2026-06-23] - Fixação do Header no topo (Sticky Header)
*   [MODIFY] [Header.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/components/Header.vue): Adicionado `sticky top-0 z-50` na tag `<header>` para que a barra de navegação continue fixa no topo da tela durante a rolagem de página.
*   [MODIFY] `trimly-versao-banco/frontend/src/components/Header.vue`: Aplicado o mesmo comportamento de cabeçalho fixo na versão de banco de dados.

#### [2026-06-23] - Limpeza de variáveis inativas nos Dashboards
*   [MODIFY] [BarbeariaDetalhes.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/BarbeariaDetalhes.vue) (e a respectiva versão com banco): Removida a variável de estado `horarios` e sua respectiva atribuição redundante no `onMounted`, visto que a verificação de slots de disponibilidade foi abstraída para o método `bookingService.getSlotsDisponiveis()`.
*   [MODIFY] [AdminDashboard.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/AdminDashboard.vue) (e a respectiva versão com banco): Removida a variável `listagemHorariosFixos` e sua respectiva carga no `onMounted`, que se tornou inútil no componente após a refatoração do fluxo de reagendamentos para a camada de serviços.

#### [2026-06-23] - Cadastro de Serviços e Preços por Barbearia
Implementação do requisito para permitir que administradores de barbearias cadastrem serviços personalizados e definam seus preços específicos para cada estabelecimento.
*   **Repositórios & Interfaces (`src/repositories/`)**:
    *   [MODIFY] [BaseRepository.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/repositories/BaseRepository.js): Definido os métodos `getCortes(barbeariaId)` e `createCorte(corte)` na classe base `ICorteRepository`.
    *   [MODIFY] [LocalStorageRepositories.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/repositories/LocalStorageRepositories.js): Implementação para armazenar e filtrar cortes em local storage, diferenciando os padrões dos específicos de barbearias.
    *   [MODIFY] [ApiRepositories.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/repositories/ApiRepositories.js): Implementação para realizar chamadas REST de listagem filtrada e criação de cortes no banco.
*   **Serviços de Negócio (`src/services/`)**:
    *   [MODIFY] [BookingService.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/services/BookingService.js): Implementação da lógica `cadastrarCorte({ descCorte, valor, barbeariaId })` com validação de preenchimento e valores maiores que zero.
*   **Views do Frontend**:
    *   [MODIFY] [BarbeariaDetalhes.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/BarbeariaDetalhes.vue): Ajuste na busca inicial para carregar apenas os cortes válidos para a barbearia visualizada.
    *   [MODIFY] [AdminDashboard.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/AdminDashboard.vue): Criação do template e script da aba "Serviços e Preços" para administradores de barbearia visualizarem a listagem de cortes e criarem novos serviços customizados.
*   **Banco de Dados MySQL (`trimly-versao-banco/backend/`)**:
    *   [MODIFY] [TrimlyBD_Atualizado.sql](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/trimly-versao-banco/backend/TrimlyBD_Atualizado.sql): Adicionado as colunas de chave estrangeira compostas `Barbearia_id_Barbearia` e `Barbearia_endereco_id_endereco` (admitindo nulos para serviços globais padrão) na tabela `Cortes`.
    *   [MODIFY] [server.js](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/trimly-versao-banco/backend/server.js): Ajustado a rota `GET /api/cortes` para filtrar opcionalmente por `barbeariaId` (retornando serviços padrão + personalizados do local). Criado a rota `POST /api/cortes` para persistência dos dados de novos serviços.
*   **Sincronização**:
    *   Sincronizado todas as modificações do frontend da versão local storage com a subpasta `trimly-versao-banco/frontend/` mantendo as chamadas de API ativas.

#### [2026-06-23] - Correção de Scroll e UX na Troca de Telas (Single Page Application)
Correção do comportamento de rolagem durante a navegação entre telas reativas, garantindo que o usuário seja levado ao topo ao acessar uma nova tela ou ao clicar na opção Home.
*   **Views do Frontend**:
    *   [MODIFY] [home.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/home.vue):
        *   Adicionado um observador (`watch`) na variável `telaAtual`. Ao trocar de tela, a página rola automaticamente para o topo (instantaneamente para novas telas, e de forma suave ao voltar para a `home`).
        *   Ajustado a função `navegarPara('home')`. Caso o usuário já esteja na tela inicial e clique em "Home" no header/aside, a página rola suavemente (smooth) até o topo.
*   **Sincronização**:
    *   Sincronizado o arquivo `home.vue` atualizado com a pasta `trimly-versao-banco/frontend/src/views/home.vue`.

#### [2026-06-23] - Correção do Fluxo de Retorno de Detalhes da Barbearia
Ajuste da navegação de volta da visualização de detalhes de uma barbearia para retornar corretamente à tela de origem (Home ou listagem de Barbearias) sem causar páginas vazias.
*   **Views do Frontend**:
    *   [MODIFY] [BarbeariaDetalhes.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/BarbeariaDetalhes.vue):
        *   Adicionado a propriedade `origem` como prop reativa.
        *   Ajustado o texto do botão de voltar para exibir dinamicamente "Voltar para o Início" ou "Voltar para Barbearias" dependendo da origem.
    *   [MODIFY] [home.vue](file:///c:/Users/henri/Desktop/Ike/Trimly_Agendamento-de-Barbearia/src/views/home.vue):
        *   Adicionado a referência `origemDetalhes` para monitorar de qual tela o usuário partiu para os detalhes.
        *   Passado a prop `:origem` para o componente `<BarbeariaDetalhes>` e configurado `@voltar="telaAtual = origemDetalhes"`.
*   **Sincronização**:
    *   Replicado as modificações no frontend da versão MySQL.

