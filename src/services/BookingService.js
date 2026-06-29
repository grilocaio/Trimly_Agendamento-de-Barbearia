
export class BookingService {
    constructor({ bookingRepository, barbeariaRepository, corteRepository, horarioRepository, userRepository }) {
        this.bookingRepository = bookingRepository;
        this.barbeariaRepository = barbeariaRepository;
        this.corteRepository = corteRepository;
        this.horarioRepository = horarioRepository;
        this.userRepository = userRepository;
    }

    /**
     * @returns {Promise<Array>}
     */
    async getBarbearias() {
        return this.barbeariaRepository.getBarbearias();
    }

    /**
     * @param {number|null} barbeariaId
     * @returns {Promise<Array>}
     */
    async getCortes(barbeariaId = null) {
        return this.corteRepository.getCortes(barbeariaId);
    }

    /**
     * @param {Object} dados
     * @returns {Promise<Object>}
     */
    async cadastrarCorte({ descCorte, valor, barbeariaId }) {
        if (!descCorte || !valor) {
            throw new Error("Descrição e valor do serviço são obrigatórios!");
        }
        if (Number(valor) <= 0) {
            throw new Error("O valor do serviço deve ser maior que zero!");
        }

        const novoCorte = {
            id: Date.now(),
            descCorte,
            valor: Number(valor),
            barbeariaId: barbeariaId ? Number(barbeariaId) : null
        };

        return await this.corteRepository.createCorte(novoCorte);
    }

    /**
     * @returns {Promise<Array>}
     */
    async getHorarios() {
        return this.horarioRepository.getHorarios();
    }

    /**
     * @returns {Promise<Array>}
     */
    async getAgendamentos() {
        return this.bookingRepository.getAgendamentos();
    }

    /**
     * @param {number} barbeiroId
     * @param {string} data - Data no formato YYYY-MM-DD.
     * @param {number|null} agendamentoIdIgnorar
     * @returns {Promise<Array>} Lista de slots com status de disponibilidade.
     */
    async getSlotsDisponiveis(barbeiroId, data, agendamentoIdIgnorar = null) {
        if (!barbeiroId || !data) return [];

        const todosHorarios = await this.horarioRepository.getHorarios();
        const todosAgendamentos = await this.bookingRepository.getAgendamentos();

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
     * @param {Object} dados
     * @returns {Promise<Object>}
     */
    async fazerAgendamento({ clienteId, clienteNome, barbeiroId, barbeiroNome, barbeariaId, barbeariaNome, corteId, corteNome, valor, data, horario, descricao }) {
        const slots = await this.getSlotsDisponiveis(barbeiroId, data);
        const slotDesejado = slots.find(s => s.hora === horario);

        if (!slotDesejado || !slotDesejado.disponivel) {
            throw new Error("Desculpe, esse horário acabou de ser reservado por outra pessoa. Selecione outro horário.");
        }

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
            status: 'Agendado',
            motivoCancelamento: ''
        };

        return await this.bookingRepository.createAgendamento(novoAgendamento);
    }

    /**
     * @param {number} id
     * @param {string} motivo
     * @returns {Promise<Object>}
     */
    async cancelarAgendamento(id, motivo = '') {
        return await this.bookingRepository.updateStatusComMotivo(id, 'Cancelado', motivo);
    }

    /**
     * @param {number} id
     * @returns {Promise<Object>}
     */
    async concluirAtendimento(id) {
        return await this.bookingRepository.updateStatus(id, 'Concluído');
    }

    /**
     * @param {number} id
     * @param {string} novaData
     * @param {string} novoHorario
     * @returns {Promise<Object>}
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
     * @param {number} corteId
     * @returns {Promise<Array>}
     */
    async verificarAgendamentosAtivos(corteId) {
        const agendamentos = await this.bookingRepository.getAgendamentos();
        return agendamentos.filter(a => Number(a.corteId) === Number(corteId) && a.status === 'Agendado');
    }

    /**
     * @param {number} corteId
     * @returns {Promise<void>}
     */
    async excluirCorte(corteId) {
        return await this.corteRepository.deleteCorte(corteId);
    }

    /**
     * @param {number} barbeiroId
     * @returns {Promise<void>}
     */
    async excluirBarbeiro(barbeiroId) {
        const motivo = "Barbeiro não mais afiliado com a barbearia";
        await this.bookingRepository.cancelarAgendamentosPorBarbeiro(barbeiroId, motivo);
        await this.userRepository.deleteUser(barbeiroId);
    }

    /**
     * @param {number} barbeiroId
     * @returns {Promise<Object>}
     */
    async desvincularBarbeiro(barbeiroId) {
        const motivo = "Barbeiro não mais afiliado com a barbearia";
        await this.bookingRepository.cancelarAgendamentosPorBarbeiro(barbeiroId, motivo);
        return await this.userRepository.desvincularBarbearia(barbeiroId);
    }

    /**
     * @param {number} barbeariaId
     * @param {number} adminId
     * @returns {Promise<void>}
     */
    async fecharBarbearia(barbeariaId, adminId) {
        const motivo = "Barbearia encerrada";

        await this.bookingRepository.cancelarAgendamentosPorBarbearia(barbeariaId, motivo);

        const usuarios = await this.userRepository.getUsuarios();
        for (const user of usuarios) {
            if (Number(user.barbeariaId) === Number(barbeariaId) && user.cargo === 'Barbeiro') {
                await this.userRepository.desvincularBarbearia(user.id);
            }
        }

        await this.barbeariaRepository.deleteBarbearia(barbeariaId);

        await this.userRepository.deleteUser(adminId);
    }

    /**
     * @param {Object} barbearia
     * @returns {Promise<Object>}
     */
    async editarBarbearia(barbearia) {
        if (!barbearia.nome || !barbearia.cidade || !barbearia.categoria) {
            throw new Error("Nome, cidade e categoria são obrigatórios!");
        }
        return await this.barbeariaRepository.updateBarbearia(barbearia);
    }
}
