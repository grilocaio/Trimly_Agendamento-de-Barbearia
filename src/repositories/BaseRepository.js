// Interfaces/Classes Base Abstratas para os Repositórios do Trimly

export class IUserRepository {
    async getUsuarios() { throw new Error("Método não implementado"); }
    async createUser(usuario) { throw new Error("Método não implementado"); }
    async findByEmail(email) { throw new Error("Método não implementado"); }
    async updateUser(usuario) { throw new Error("Método não implementado"); }
    
    /**
     * Exclui um usuário pelo ID.
     * @param {number} id - ID do usuário.
     */
    async deleteUser(id) { throw new Error("Método não implementado"); }

    /**
     * Desvincula um usuário (geralmente barbeiro) de sua barbearia, definindo barbeariaId como null.
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
     * Atualiza o status de um agendamento registrando o motivo.
     * @param {number} id - ID do agendamento.
     * @param {string} status - Novo status (ex: 'Cancelado').
     * @param {string} motivo - Motivo da alteração.
     */
    async updateStatusComMotivo(id, status, motivo) { throw new Error("Método não implementado"); }

    /**
     * Cancela todos os agendamentos ativos de um barbeiro com um motivo específico.
     * @param {number} barbeiroId - ID do barbeiro.
     * @param {string} motivo - Motivo do cancelamento.
     */
    async cancelarAgendamentosPorBarbeiro(barbeiroId, motivo) { throw new Error("Método não implementado"); }

    /**
     * Cancela todos os agendamentos ativos de uma barbearia com um motivo específico.
     * @param {number} barbeariaId - ID da barbearia.
     * @param {string} motivo - Motivo do cancelamento.
     */
    async cancelarAgendamentosPorBarbearia(barbeariaId, motivo) { throw new Error("Método não implementado"); }
}

export class IBarbeariaRepository {
    async getBarbearias() { throw new Error("Método não implementado"); }
    
    /**
     * Exclui uma barbearia pelo ID.
     * @param {number} id - ID da barbearia.
     */
    async deleteBarbearia(id) { throw new Error("Método não implementado"); }

    /**
     * Atualiza os dados cadastrais de uma barbearia.
     * @param {Object} barbearia - Objeto da barbearia com dados atualizados.
     */
    async updateBarbearia(barbearia) { throw new Error("Método não implementado"); }
}

export class ICorteRepository {
    async getCortes(barbeariaId = null) { throw new Error("Método não implementado"); }
    async createCorte(corte) { throw new Error("Método não implementado"); }
    
    /**
     * Exclui um tipo de corte/serviço.
     * @param {number} id - ID do corte.
     */
    async deleteCorte(id) { throw new Error("Método não implementado"); }
}

export class IHorarioRepository {
    async getHorarios() { throw new Error("Método não implementado"); }
}
