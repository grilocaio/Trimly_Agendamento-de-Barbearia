import { IUserRepository, IBookingRepository, IBarbeariaRepository, ICorteRepository, IHorarioRepository } from './BaseRepository';

const API_BASE_URL = 'http://localhost:3000/api';

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
    }
    return response.json();
}

export class ApiUserRepository extends IUserRepository {
    async getUsuarios() {
        const res = await fetch(`${API_BASE_URL}/usuarios`);
        return handleResponse(res);
    }
    
    async createUser(usuario) {
        const res = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        return handleResponse(res);
    }

    async findByEmail(email) {
        const res = await fetch(`${API_BASE_URL}/usuarios?email=${encodeURIComponent(email)}`);
        const users = await handleResponse(res);
        return users.length > 0 ? users[0] : null;
    }

    async updateUser(usuario) {
        const res = await fetch(`${API_BASE_URL}/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(usuario)
        });
        return handleResponse(res);
    }
}

export class ApiBookingRepository extends IBookingRepository {
    async getAgendamentos() {
        const res = await fetch(`${API_BASE_URL}/agendamentos`);
        return handleResponse(res);
    }
    
    async createAgendamento(agendamento) {
        const res = await fetch(`${API_BASE_URL}/agendamentos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(agendamento)
        });
        return handleResponse(res);
    }

    async updateStatus(id, status) {
        const res = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        return handleResponse(res);
    }

    async reschedule(id, data, horario) {
        const res = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data, horario })
        });
        return handleResponse(res);
    }
}

export class ApiBarbeariaRepository extends IBarbeariaRepository {
    async getBarbearias() {
        const res = await fetch(`${API_BASE_URL}/barbearias`);
        return handleResponse(res);
    }
}

export class ApiCorteRepository extends ICorteRepository {
    async getCortes(barbeariaId = null) {
        const url = barbeariaId ? `${API_BASE_URL}/cortes?barbeariaId=${barbeariaId}` : `${API_BASE_URL}/cortes`;
        const res = await fetch(url);
        return handleResponse(res);
    }

    async createCorte(corte) {
        const res = await fetch(`${API_BASE_URL}/cortes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(corte)
        });
        return handleResponse(res);
    }
}

export class ApiHorarioRepository extends IHorarioRepository {
    async getHorarios() {
        const res = await fetch(`${API_BASE_URL}/horarios`);
        return handleResponse(res);
    }
}
