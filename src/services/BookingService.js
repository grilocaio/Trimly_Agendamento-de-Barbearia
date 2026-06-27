/**
 * Serviço responsável pelas regras de negócio ligadas a agendamentos, serviços/cortes e barbearias.
 */
export class BookingService {
    constructor({ bookingRepository, barbeariaRepository, corteRepository, horarioRepository, userRepository }) {
        this.bookingRepository = bookingRepository;
        this.barbeariaRepository = barbeariaRepository;
        this.corteRepository = corteRepository;
        this.horarioRepository = horarioRepository;
        this.userRepository = userRepository;
    }

    /**
     * Obtém todas as barbearias.
     * @returns {Promise<Array>} Lista de barbearias.
     */
    async getBarbearias() {
        return this.barbeariaRepository.getBarbearias();
    }

    /**
     * Obtém os serviços/cortes, opcionalmente filtrados por barbearia.
     * @param {number|null} barbeariaId - ID da barbearia.
     * @returns {Promise<Array>} Lista de cortes.
     */
    async getCortes(barbeariaId = null) {
        return this.corteRepository.getCortes(barbeariaId);
    }

    /**
     * Cadastra um novo corte/serviço associado a uma barbearia.
     * @param {Object} dados - Contém descCorte, valor e barbeariaId.
     * @returns {Promise<Object>} Corte cadastrado.
     */
    async cadastrarCorte({ descCorte, valor, barbeariaId }) {
        if (!descCorte || !valor) {
            throw new Error("Descrição e valor do serviço são obrigatórios!");
        }
        if (Number(valor) <= 0) {
            throw new Error("O valor do serviço deve ser maior que zero!");
        }

        const novoCorte = {
            id: Date.now(), // LocalStorage. No banco de dados MySQL usará AUTO_INCREMENT
            descCorte,
            valor: Number(valor),
            barbeariaId: barbeariaId ? Number(barbeariaId) : null
        };

        return await this.corteRepository.createCorte(novoCorte);
    }

    /**
     * Obtém os horários padrões de atendimento do sistema.
     * @returns {Promise<Array>} Lista de strings de horários.
     */
    async getHorarios() {
        return this.horarioRepository.getHorarios();
    }

    /**
     * Obtém todos os agendamentos cadastrados.
     * @returns {Promise<Array>} Lista de agendamentos.
     */
    async getAgendamentos() {
        return this.bookingRepository.getAgendamentos();
    }

    /**
     * Regra de Negócio: Carrega os horários fixos e mapeia quais estão ocupados ou livres para um barbeiro em determinada data.
     * @param {number} barbeiroId - ID do barbeiro.
     * @param {string} data - Data no formato YYYY-MM-DD.
     * @param {number|null} agendamentoIdIgnorar - ID do agendamento para ignorar (caso de reagendamento).
     * @returns {Promise<Array>} Lista de slots com status de disponibilidade.
     */
    async getSlotsDisponiveis(barbeiroId, data, agendamentoIdIgnorar = null) {
        if (!barbeiroId || !data) return [];

        const todosHorarios = await this.horarioRepository.getHorarios();
        const todosAgendamentos = await this.bookingRepository.getAgendamentos();

        // Filtra os agendamentos já marcados para o barbeiro na data selecionada
        const agendamentosOcupados = todosAgendamentos.filter(a => 
            Number(a.barbeiroId) === Number(barbeiroId) &&
            a.data === data &&
            a.status === 'Agendado' &&
            Number(a.id) !== Number(agendamentoIdIgnorar)
        );

        const horasOcupadas = agendamentosOcupados.map(a => a.horario);

        return todosHorarios.map(hora => ({
            hora,
            disponivel: !horasOcupadas.includes(hora)
        }));
    }

    /**
     * Regra de Negócio: Validar e efetivar um novo agendamento.
     * @param {Object} dados - Todos os dados necessários para o agendamento.
     * @returns {Promise<Object>} Agendamento cadastrado.
     */
    async fazerAgendamento({ clienteId, clienteNome, barbeiroId, barbeiroNome, barbeariaId, barbeariaNome, corteId, corteNome, valor, data, horario, descricao }) {
        // [CHEQUE DE CONCORRÊNCIA]
        // Chamamos a checagem de horários disponíveis imediatamente antes de realizar a gravação física.
        // Isso evita que dois usuários com a mesma tela aberta consigam reservar o mesmo slot ao mesmo tempo.
        const slots = await this.getSlotsDisponiveis(barbeiroId, data);
        const slotDesejado = slots.find(s => s.hora === horario);
        
        // Se o slot não existir na grade ou já estiver marcado como ocupado, lançamos uma exceção
        // impedindo a gravação do registro duplicado.
        if (!slotDesejado || !slotDesejado.disponivel) {
            throw new Error("Desculpe, esse horário acabou de ser reservado por outra pessoa. Selecione outro horário.");
        }

        // Caso o horário esteja livre, montamos a estrutura do registro.
        // O ID é gerado temporariamente via timestamp Unix no LocalStorage, mas em uma API real
        // com MySQL/Postgres isso é gerenciado por uma coluna do tipo AUTO_INCREMENT ou UUID.
        const novoAgendamento = {
            id: Date.now(), 
            clienteId: Number(clienteId),
            clienteNome,
            barbeiroId: Number(barbeiroId),
            barbeiroNome,
            barbeariaId: Number(barbeariaId),
            barbeariaNome,
            corteId: Number(corteId),
            corteNome,
            valor: Number(valor),
            data,
            horario,
            descricao: descricao || '',
            status: 'Agendado', // Todo agendamento nasce com status pendente 'Agendado'
            motivoCancelamento: ''
        };

        return await this.bookingRepository.createAgendamento(novoAgendamento);
    }

    /**
     * Regra de Negócio: Cancelar um agendamento registrando o motivo.
     * @param {number} id - ID do agendamento.
     * @param {string} motivo - Motivo da suspensão ou cancelamento.
     * @returns {Promise<Object>} Agendamento atualizado.
     */
    async cancelarAgendamento(id, motivo = '') {
        // O cancelamento é uma transição lógica de estado. Não excluímos o registro fisicamente
        // para mantermos o histórico de auditoria e podermos exibir ao usuário o porquê de ter sido desmarcado.
        return await this.bookingRepository.updateStatusComMotivo(id, 'Cancelado', motivo);
    }

    /**
     * Regra de Negócio: Concluir um agendamento de forma padrão.
     * @param {number} id - ID do agendamento.
     * @returns {Promise<Object>} Agendamento atualizado.
     */
    async concluirAtendimento(id) {
        return await this.bookingRepository.updateStatus(id, 'Concluído');
    }

    /**
     * Regra de Negócio: Reagendar um compromisso validando a nova disponibilidade.
     * @param {number} id - ID do agendamento.
     * @param {string} novaData - Nova data selecionada.
     * @param {string} novoHorario - Novo horário selecionado.
     * @returns {Promise<Object>} Agendamento atualizado.
     */
    async reagendar(id, novaData, novoHorario) {
        const todosAgendamentos = await this.bookingRepository.getAgendamentos();
        const agendamentoAtual = todosAgendamentos.find(a => Number(a.id) === Number(id));
        
        if (!agendamentoAtual) {
            throw new Error("Agendamento não encontrado.");
        }

        const slots = await this.getSlotsDisponiveis(agendamentoAtual.barbeiroId, novaData, id);
        const slotDesejado = slots.find(s => s.hora === novoHorario);

        if (!slotDesejado || !slotDesejado.disponivel) {
            throw new Error("Erro: O barbeiro já possui um compromisso neste novo horário. Escolha outro.");
        }

        return await this.bookingRepository.reschedule(id, novaData, novoHorario);
    }

    /**
     * Verifica se existem agendamentos ativos para um determinado tipo de corte.
     * @param {number} corteId - ID do corte.
     * @returns {Promise<Array>} Lista de agendamentos ativos (status 'Agendado').
     */
    async verificarAgendamentosAtivos(corteId) {
        const agendamentos = await this.bookingRepository.getAgendamentos();
        return agendamentos.filter(a => Number(a.corteId) === Number(corteId) && a.status === 'Agendado');
    }

    /**
     * Exclui permanentemente um tipo de corte/serviço.
     * @param {number} corteId - ID do corte.
     * @returns {Promise<void>}
     */
    async excluirCorte(corteId) {
        return await this.corteRepository.deleteCorte(corteId);
    }

    /**
     * Remove um barbeiro da barbearia (exclusão total de conta).
     * Cancela todos os agendamentos ativos dele com motivo fixo.
     * @param {number} barbeiroId - ID do barbeiro.
     * @returns {Promise<void>}
     */
    async excluirBarbeiro(barbeiroId) {
        const motivo = "Barbeiro não mais afiliado com a barbearia";
        await this.bookingRepository.cancelarAgendamentosPorBarbeiro(barbeiroId, motivo);
        await this.userRepository.deleteUser(barbeiroId);
    }

    /**
     * Desvincula um barbeiro de sua barbearia atual (barbeariaId passa a ser null).
     * Cancela todos os agendamentos ativos dele com motivo fixo.
     * @param {number} barbeiroId - ID do barbeiro.
     * @returns {Promise<Object>} Usuário barbeiro atualizado.
     */
    async desvincularBarbeiro(barbeiroId) {
        const motivo = "Barbeiro não mais afiliado com a barbearia";
        await this.bookingRepository.cancelarAgendamentosPorBarbeiro(barbeiroId, motivo);
        return await this.userRepository.desvincularBarbearia(barbeiroId);
    }

    /**
     * Encerra as atividades de uma barbearia.
     * - Cancela todos os agendamentos ativos da barbearia com o motivo "Barbearia encerrada".
     * - Desvincula todos os barbeiros afiliados a ela.
     * - Exclui a barbearia.
     * - Exclui a conta do administrador.
     * @param {number} barbeariaId - ID da barbearia.
     * @param {number} adminId - ID do administrador responsável.
     * @returns {Promise<void>}
     */
    async fecharBarbearia(barbeariaId, adminId) {
        const motivo = "Barbearia encerrada";
        
        // 1. Cancelar todos os agendamentos ativos da barbearia
        await this.bookingRepository.cancelarAgendamentosPorBarbearia(barbeariaId, motivo);
        
        // 2. Desvincular todos os barbeiros afiliados a esta barbearia
        const usuarios = await this.userRepository.getUsuarios();
        for (const user of usuarios) {
            if (Number(user.barbeariaId) === Number(barbeariaId) && user.cargo === 'Barbeiro') {
                await this.userRepository.desvincularBarbearia(user.id);
            }
        }
        
        // 3. Excluir a barbearia
        await this.barbeariaRepository.deleteBarbearia(barbeariaId);
        
        // 4. Excluir a conta do administrador
        await this.userRepository.deleteUser(adminId);
    }

    /**
     * Edita os dados cadastrais de uma barbearia (Rebranding).
     * @param {Object} barbearia - Dados atualizados da barbearia.
     * @returns {Promise<Object>} Barbearia atualizada.
     */
    async editarBarbearia(barbearia) {
        if (!barbearia.nome || !barbearia.cidade || !barbearia.categoria) {
            throw new Error("Nome, cidade e categoria são obrigatórios!");
        }
        return await this.barbeariaRepository.updateBarbearia(barbearia);
    }
}
