// Interfaces/Classes Base Abstratas para os Repositórios do Trimly

export class IUserRepository {
    async getUsuarios() { throw new Error("Método não implementado"); }
    async createUser(usuario) { throw new Error("Método não implementado"); }
    async findByEmail(email) { throw new Error("Método não implementado"); }
    async updateUser(usuario) { throw new Error("Método não implementado"); }
}

export class IBookingRepository {
    async getAgendamentos() { throw new Error("Método não implementado"); }
    async createAgendamento(agendamento) { throw new Error("Método não implementado"); }
    async updateStatus(id, status) { throw new Error("Método não implementado"); }
    async reschedule(id, data, horario) { throw new Error("Método não implementado"); }
}

export class IBarbeariaRepository {
    async getBarbearias() { throw new Error("Método não implementado"); }
}

export class ICorteRepository {
    async getCortes(barbeariaId = null) { throw new Error("Método não implementado"); }
    async createCorte(corte) { throw new Error("Método não implementado"); }
}

export class IHorarioRepository {
    async getHorarios() { throw new Error("Método não implementado"); }
}
