
export class IUserRepository {
    async getUsuarios() { throw new Error("Método não implementado"); }
    async createUser(usuario) { throw new Error("Método não implementado"); }
    async findByEmail(email) { throw new Error("Método não implementado"); }
    async updateUser(usuario) { throw new Error("Método não implementado"); }
    
    /**
     * @param {number} id - ID do usuário.
     */
    async deleteUser(id) { throw new Error("Método não implementado"); }

    /**
     * @param {number} userId - ID do usuário.
     */
    async desvincularBarbearia(userId) { throw new Error("Método não implementado"); }
}

export class IBookingRepository {
    async getAgendamentos() { throw new Error("Método não implementado"); }
    async createAgendamento(agendamento) { throw new Error("Método não implementado"); }
    async updateStatus(id, status) { throw new Error("Método não implementado"); }
    async reschedule(id, data, horario) { throw new Error("Método não implementado"); }
    
    /**
     * @param {number} id
     * @param {string} status
     * @param {string} motivo
     */
    async updateStatusComMotivo(id, status, motivo) { throw new Error("Método não implementado"); }

    /**
     * @param {number} barbeiroId
     * @param {string} motivo
     */
    async cancelarAgendamentosPorBarbeiro(barbeiroId, motivo) { throw new Error("Método não implementado"); }

    /**
     * @param {number} barbeariaId
     * @param {string} motivo
     */
    async cancelarAgendamentosPorBarbearia(barbeariaId, motivo) { throw new Error("Método não implementado"); }

    /**
     * @param {number} clienteId
     * @param {string} motivo
     */
    async cancelarAgendamentosPorCliente(clienteId, motivo) { throw new Error("Método não implementado"); }
}

export class IBarbeariaRepository {
    async getBarbearias() { throw new Error("Método não implementado"); }

    /**
     * @param {Object} barbearia
     */
    async createBarbearia(barbearia) { throw new Error("Método não implementado"); }
    
    /**
     * @param {number} id
     */
    async deleteBarbearia(id) { throw new Error("Método não implementado"); }

    /**
     * @param {Object} barbearia
     */
    async updateBarbearia(barbearia) { throw new Error("Método não implementado"); }
}

export class ICorteRepository {
    async getCortes(barbeariaId = null) { throw new Error("Método não implementado"); }
    async createCorte(corte) { throw new Error("Método não implementado"); }
    
    /**
     * @param {number}
     */
    async deleteCorte(id) { throw new Error("Método não implementado"); }
}

export class IHorarioRepository {
    async getHorarios() { throw new Error("Método não implementado"); }
}
