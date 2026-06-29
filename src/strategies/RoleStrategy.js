
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

export class RoleStrategyContext {
    /**
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
                return {
                    getDashboardView() { return 'home'; },
                    hasAccessToAdmin() { return false; },
                    hasAccessToBarberSchedule() { return false; },
                    canBook() { return false; }
                };
        }
    }
}
