# Documentação do Sistema de Agendamento - Trimly

Esta documentação descreve as implementações de cadastro, login, agendamentos, dashboards, e arquitetura de código aplicadas ao projeto Trimly, em conformidade com as especificações do banco de dados (`TrimlyBD.sql`) e os requisitos de negócio e técnicos.

---

## 🏗️ Arquitetura do Sistema & Padrões SOLID

O Trimly foi refatorado seguindo uma arquitetura robusta dividida em camadas claras para garantir separação de preocupações, extensibilidade e fácil manutenção (desacoplando o frontend do tipo de banco de dados).

1. **Camada de Repositórios (Abstração & Persistência)**:
   - **`src/repositories/BaseRepository.js`**: Define interfaces abstratas (`IUserRepository`, `IBookingRepository`, `IBarbeariaRepository`, `ICorteRepository`, `IHorarioRepository`) com base no princípio de inversão de dependência.
   - **`src/repositories/LocalStorageRepositories.js`**: Implementa de forma concreta todos os métodos das interfaces acima gravando e lendo dados no LocalStorage do navegador.
   - **`src/utils/storage.js`**: Gerencia o LocalStorage de forma centralizada (seeds iniciais, salvamento de coleções).

2. **Camada de Serviços (Regras de Negócio)**:
   - **`src/services/BookingService.js`**: Centraliza as validações de agendamento (anti-conflitos), cancelamentos, desvinculação, edição de dados e controle de encerramento de filiais.
   - **`src/services/AuthService.js`**: Controla sessões de usuário, login, logout, alterações de perfil e exclusões de contas.

3. **Padrões de Projeto Aplicados**:
   - **Factory (Padrão de Criação)**: `src/factories/UserFactory.js` padroniza a criação de objetos de usuário (Cliente, Barbeiro, Administrador) com seus respectivos dados padrões.
   - **Strategy (Padrão Comportamental)**: `src/strategies/RoleStrategy.js` define dinamicamente comportamentos, permissões e redirecionamento de dashboards com base no cargo do usuário autenticado no sistema.

---

## 🚀 Funcionalidades da Fase 2 (Novas Regras de Negócio)

### 1. Exclusões com Integridade e Segurança
- **Excluir Barbeiro**: Um administrador pode excluir a conta de um barbeiro da equipe. O sistema cancela automaticamente todos os agendamentos ativos/futuros dele sob o motivo fixo *"Barbeiro não mais afiliado com a barbearia"* e remove seu cadastro do sistema.
- **Excluir Cortes/Serviços**: Permite excluir serviços da barbearia (incluindo os padrões). O sistema consulta o repositório e, caso o serviço possua agendamentos ativos marcados, exibe um alerta informando a quantidade e solicita dupla confirmação de segurança ao administrador antes de proceder.
- **Excluir Conta Própria**: Disponível para qualquer usuário na tela de perfil (`PerfilUsuario.vue`). Permite que o cliente, barbeiro ou administrador delete sua conta definitivamente mediante confirmação final. O sistema encerra a sessão ativa e o redireciona de imediato para a página inicial.
- **Encerrar Barbearia (Admin)**: Opção crítica na aba de configurações. Cancela todos os agendamentos ativos da filial com o motivo *"Barbearia encerrada"*, desvincula os barbeiros da equipe (limpando seu campo `barbeariaId`), deleta o registro da barbearia e a conta do próprio administrador no final, efetuando o logout automático.

### 2. Motivo de Cancelamento (`motivoCancelamento`)
- O campo `motivoCancelamento` foi adicionado à modelagem de agendamentos.
- Sempre que um agendamento é cancelado manualmente (seja pelo cliente, pelo administrador ou pelo barbeiro), o sistema exibe um `prompt()` obrigatório solicitando a razão.
- Nos cards de histórico de agendamentos (em todos os painéis), quando o agendamento possui o status "Cancelado", o motivo é renderizado em destaque em uma caixa de fundo vermelho para total clareza do usuário.

### 3. Vínculos de Barbeiros & Redirecionamentos
- **Desvincular-se da Barbearia**: Barbeiros podem, do seu próprio painel, clicar em "Sair da Barbearia". Seu status passa para desvinculado (`barbeariaId: null`). O sistema mantém seus agendamentos antigos válidos (ele ainda pode atendê-los) e exibe em seu painel a instrução: *"Você não é afiliado a nenhuma barbearia. Peça a um administrador para cadastrá-lo."*
- **Vincular Barbeiros**: Administradores possuem um dropdown na aba Equipe que exibe todos os barbeiros cadastrados no sistema que estão atualmente sem barbearia associada, permitindo vinculá-los com um clique (atualizando o `barbeariaId` deles).
- **Barbeiros que Agendam Cortes**: Foi adicionado o botão "Agendar Corte (Como Cliente)" no painel do barbeiro. Ele emite um evento que altera o estado da navegação no `home.vue` e direciona o barbeiro para o fluxo de escolha de barbearia, permitindo que ele agende serviços com outros barbeiros normalmente.

### 4. Rebranding & Ajustes no Cadastro
- **Editar Barbearia (Rebranding)**: O administrador pode, na aba "Configurações", editar informações cadastrais básicas da sua barbearia (Nome, Cidade, Categoria).
- **Cadastro Atualizado**: A opção de cadastro público como "Administrador" foi removida da tela de login por questões de segurança (agora é feita via suporte). Em seu lugar, foi incluída a opção "Barbeiro", que exige que ele selecione a barbearia inicial a qual deseja se afiliar no momento do registro.

### 5. Nova Tela de Parceria & Limpeza
- **"Junte-se a Nós" (`src/views/JuntoSeNos.vue`)**: Nova tela com design premium e contatos de suporte de placeholder para divulgar a plataforma a novos donos de estabelecimentos. É acessível clicando no rodapé do site.
- **Limpeza de Arquivos**: Os arquivos de componente inativos `src/views/AboutUs.vue` e `src/components/Breadcrumb.vue` foram removidos em definitivo do projeto.

---

## 💾 Estrutura do Banco no Local Storage

As tabelas originais do `TrimlyBD.sql` foram modeladas em JSON sob as seguintes chaves do Local Storage:

*   **`trimly_barbearias`**: Lista de barbearias ativas (id, nome, cidade, categoria, imagem).
*   **`trimly_cortes`**: Lista de serviços disponíveis (id, descCorte, valor, barbeariaId).
*   **`trimly_horarios`**: Lista de horários de funcionamento (de 08:00 a 17:30).
*   **`trimly_usuarios`**: Contas cadastradas. Possui `cargo` ('Cliente', 'Barbeiro', 'Administrador') e `barbeariaId` (para barbeiros e admins).
*   **`trimly_agendamentos`**: Histórico de marcações. Contém IDs e nomes dos envolvidos, data, hora, observações, preço, status ('Agendado', 'Concluído', 'Cancelado') e `motivoCancelamento` (string).

---

## 🔑 Credenciais Pré-Seadas para Teste Rápido

A senha padrão para todas as contas abaixo é `123`:

### 1. Administradores (Gerenciam sua respectiva barbearia)
- **Barbearia Mr Cutts**: `admin1@trimly.com`
- **Barbearia MW Barber Studio**: `admin2@trimly.com`
- **Barbearia Visão Barbearia**: `admin3@trimly.com`

### 2. Barbeiros (Visualizam agenda e marcam conclusões/desvínculos)
- **Henrique Barbeiro (Mr Cutts)**: `henrique@trimly.com`
- **Thales Barbeiro (Mr Cutts)**: `thales@trimly.com`

### 3. Clientes (Realizam agendamentos)
- **Kawan Cliente**: `kawan@trimly.com`
- **Jean Cliente**: `jean@trimly.com`

---

## 🛠️ Arquivos Modificados/Criados na Refatoração SOLID & Fase 2

- `src/repositories/BaseRepository.js` (Interfaces de dados)
- `src/repositories/LocalStorageRepositories.js` (Implementação das interfaces para LocalStorage)
- `src/services/BookingService.js` (Serviços e regras de negócio de agendamentos)
- `src/services/AuthService.js` (Serviços e regras de autenticação/perfil/contas)
- `src/factories/UserFactory.js` (Fábrica de usuários)
- `src/strategies/RoleStrategy.js` (Estratégia de controle de cargos)
- `src/utils/storage.js` (Banco de dados e seeds)
- `src/views/Login.vue` (Cadastro de cliente/barbeiro, login)
- `src/views/home.vue` (Roteador reativo principal)
- `src/views/AdminDashboard.vue` (Painel com exclusões, rebranding, vinculação e encerramento)
- `src/views/BarbeiroDashboard.vue` (Painel com agenda, agendamento como cliente e desvinculação)
- `src/views/ClienteAgendamentos.vue` (Exibição de motivos e cancelamentos do cliente)
- `src/views/PerfilUsuario.vue` (Editar perfil e exclusão de conta própria)
- `src/views/JuntoSeNos.vue` (Nova tela de parceria)
- `src/components/Footer.vue` (Atalho para a tela de parceria)
