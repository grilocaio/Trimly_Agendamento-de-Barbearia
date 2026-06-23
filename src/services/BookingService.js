export class BookingService {
    constructor({ bookingRepository, barbeariaRepository, corteRepository, horarioRepository, userRepository }) {
        this.bookingRepository = bookingRepository;
        this.barbeariaRepository = barbeariaRepository;
        this.corteRepository = corteRepository;
        this.horarioRepository = horarioRepository;
        this.userRepository = userRepository;
    }

    async getBarbearias() {
        return this.barbeariaRepository.getBarbearias();
    }

    async getCortes(barbeariaId = null) {
        return this.corteRepository.getCortes(barbeariaId);
    }

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

    async getHorarios() {
        return this.horarioRepository.getHorarios();
    }

    async getAgendamentos() {
        return this.bookingRepository.getAgendamentos();
    }

    // Regra de Negócio: Carrega os horários fixos e mapeia quais estão ocupados ou livres
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

    // Regra de Negócio: Validar e efetivar um agendamento
    async fazerAgendamento({ clienteId, clienteNome, barbeiroId, barbeiroNome, barbeariaId, barbeariaNome, corteId, corteNome, valor, data, horario, descricao }) {
        // Validação anti-conflito preventiva
        const slots = await this.getSlotsDisponiveis(barbeiroId, data);
        const slotDesejado = slots.find(s => s.hora === horario);
        
        if (!slotDesejado || !slotDesejado.disponivel) {
            throw new Error("Desculpe, esse horário acabou de ser reservado por outra pessoa. Selecione outro horário.");
        }

        const novoAgendamento = {
            id: Date.now(), // Para LocalStorage. O MySQL tratará via AUTO_INCREMENT
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
            status: 'Agendado'
        };

        return await this.bookingRepository.createAgendamento(novoAgendamento);
    }

    // Regra de Negócio: Cancelar agendamento
    async cancelarAgendamento(id) {
        return await this.bookingRepository.updateStatus(id, 'Cancelado');
    }

    // Regra de Negócio: Concluir agendamento
    async concluirAtendimento(id) {
        return await this.bookingRepository.updateStatus(id, 'Concluído');
    }

    // Regra de Negócio: Reagendar um compromisso validando disponibilidade
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
}
