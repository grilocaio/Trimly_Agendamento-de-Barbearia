// Estratégias de comportamentos e permissões baseadas em Cargos

export class ClientRoleStrategy {
    getDashboardView() {
        return 'home'; // Clientes ficam na home e agendam por lá
    }
    hasAccessToAdmin() {
        return false;
    }
    hasAccessToBarberSchedule() {
        return false;
    }
    canBook() {
        return true;
    }
}

export class BarberRoleStrategy {
    getDashboardView() {
        return 'barbeiro_dashboard';
    }
    hasAccessToAdmin() {
        return false;
    }
    hasAccessToBarberSchedule() {
        return true;
    }
    canBook() {
        return false;
    }
}

export class AdminRoleStrategy {
    getDashboardView() {
        return 'admin_dashboard';
    }
    hasAccessToAdmin() {
        return true;
    }
    hasAccessToBarberSchedule() {
        return false;
    }
    canBook() {
        return false;
    }
}

export class RoleStrategyContext {
    static getStrategy(cargo) {
        switch (cargo) {
            case 'Cliente':
                return new ClientRoleStrategy();
            case 'Barbeiro':
                return new BarberRoleStrategy();
            case 'Administrador':
                return new AdminRoleStrategy();
            default:
                // Estratégia padrão para deslogados/convidados
                return {
                    getDashboardView() { return 'home'; },
                    hasAccessToAdmin() { return false; },
                    hasAccessToBarberSchedule() { return false; },
                    canBook() { return false; }
                };
        }
    }
}
