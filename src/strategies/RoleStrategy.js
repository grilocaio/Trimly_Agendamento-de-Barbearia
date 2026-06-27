// ============================================================================
// DESIGN PATTERN: STRATEGY (ESTRATÉGIA)
// ============================================================================
// Este arquivo implementa o padrão de projeto Strategy. Ele permite encapsular
// algoritmos e comportamentos específicos de cada nível de acesso (cargo) em 
// classes isoladas e intercambiáveis.
//
// Benefício principal: Evita o acúmulo de estruturas condicionais complexas 
// (ex: múltiplos "if (cargo === 'Administrador')") espalhadas pelas views, 
// facilitando a manutenção e a extensão do sistema para novos cargos no futuro.
// ============================================================================

// Estratégia específica para usuários do tipo 'Cliente'
export class ClientRoleStrategy {
    getDashboardView() {
        return 'home'; // Clientes ficam na home e agendam por lá
    }
    hasAccessToAdmin() {
        return false; // Clientes não acessam o dashboard administrativo
    }
    hasAccessToBarberSchedule() {
        return false; // Clientes não gerenciam agendas de barbeiros
    }
    canBook() {
        return true; // Clientes possuem permissão para marcar horários
    }
}

// Estratégia específica para usuários do tipo 'Barbeiro'
export class BarberRoleStrategy {
    getDashboardView() {
        return 'barbeiro_dashboard'; // Barbeiros são direcionados ao seu painel de agenda
    }
    hasAccessToAdmin() {
        return false;
    }
    hasAccessToBarberSchedule() {
        return true; // Barbeiros gerenciam seus próprios horários e status
    }
    canBook() {
        return false; // Barbeiros não marcam horários para si mesmos no fluxo da barbearia
    }
}

// Estratégia específica para usuários do tipo 'Administrador'
export class AdminRoleStrategy {
    getDashboardView() {
        return 'admin_dashboard'; // Administradores são direcionados ao controle de equipe/serviços
    }
    hasAccessToAdmin() {
        return true; // Administradores possuem acesso total a configurações e relatórios
    }
    hasAccessToBarberSchedule() {
        return false;
    }
    canBook() {
        return false;
    }
}

// Contexto que resolve a estratégia adequada baseado no cargo do usuário logado
export class RoleStrategyContext {
    /**
     * Retorna a instância da estratégia correspondente ao cargo do usuário.
     * @param {string} cargo - O cargo do usuário logado ('Cliente', 'Barbeiro', 'Administrador').
     * @returns {Object} A classe correspondente que implementa as permissões.
     */
    static getStrategy(cargo) {
        switch (cargo) {
            case 'Cliente':
                return new ClientRoleStrategy();
            case 'Barbeiro':
                return new BarberRoleStrategy();
            case 'Administrador':
                return new AdminRoleStrategy();
            default:
                // Estratégia nula/padrão para usuários deslogados ou visitantes anônimos
                return {
                    getDashboardView() { return 'home'; },
                    hasAccessToAdmin() { return false; },
                    hasAccessToBarberSchedule() { return false; },
                    canBook() { return false; }
                };
        }
    }
}
