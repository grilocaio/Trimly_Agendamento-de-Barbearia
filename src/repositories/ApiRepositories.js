import { IUserRepository, IBookingRepository, IBarbeariaRepository, ICorteRepository, IHorarioRepository } from './BaseRepository';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const TOKEN_KEY = 'trimly_token';

async function handleResponse(response) {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Erro HTTP: ${response.status}`);
    }
    return response.json();
}

function authHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    };
}

export class ApiUserRepository extends IUserRepository {
    async login(email, senha) {
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify({ email, senha })
        });
        const data = await handleResponse(res);
        localStorage.setItem(TOKEN_KEY, data.token);
        return data.user;
    }

    async logout() {
        try {
            await fetch(`${API_BASE_URL}/logout`, {
                method: 'POST',
                headers: authHeaders()
            });
        } finally {
            localStorage.removeItem(TOKEN_KEY);
        }
    }

    async getUsuarios() {
        const res = await fetch(`${API_BASE_URL}/usuarios`, { headers: authHeaders() });
        return handleResponse(res);
    }

    async createUser(usuario) {
        const res = await fetch(`${API_BASE_URL}/usuarios`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(usuario)
        });
        return handleResponse(res);
    }

    async findByEmail(email) {
        const res = await fetch(`${API_BASE_URL}/usuarios?email=${encodeURIComponent(email)}`, { headers: authHeaders() });
        const users = await handleResponse(res);
        return users.length > 0 ? users[0] : null;
    }

    async updateUser(usuario) {
        const res = await fetch(`${API_BASE_URL}/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(usuario)
        });
        return handleResponse(res);
    }
}

export class ApiBookingRepository extends IBookingRepository {
    async getAgendamentos() {
        const res = await fetch(`${API_BASE_URL}/agendamentos`, { headers: authHeaders() });
        return handleResponse(res);
    }

    async createAgendamento(agendamento) {
        const res = await fetch(`${API_BASE_URL}/agendamentos`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(agendamento)
        });
        return handleResponse(res);
    }

    async updateStatus(id, status) {
        const res = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({ status })
        });
        return handleResponse(res);
    }

    async reschedule(id, data, horario) {
        const res = await fetch(`${API_BASE_URL}/agendamentos/${id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify({ data, horario })
        });
        return handleResponse(res);
    }
}

export class ApiBarbeariaRepository extends IBarbeariaRepository {
    async getBarbearias() {
        const res = await fetch(`${API_BASE_URL}/barbearias`, { headers: authHeaders() });
        return handleResponse(res);
    }

    async createBarbearia(barbearia) {
        const res = await fetch(`${API_BASE_URL}/barbearias`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(barbearia)
        });
        return handleResponse(res);
    }

    async updateBarbearia(barbearia) {
        const res = await fetch(`${API_BASE_URL}/barbearias/${barbearia.id}`, {
            method: 'PUT',
            headers: authHeaders(),
            body: JSON.stringify(barbearia)
        });
        return handleResponse(res);
    }

    async deleteBarbearia(id) {
        const res = await fetch(`${API_BASE_URL}/barbearias/${id}`, {
            method: 'DELETE',
            headers: authHeaders()
        });
        return handleResponse(res);
    }
}

export class ApiCorteRepository extends ICorteRepository {
    async getCortes(barbeariaId = null) {
        const url = barbeariaId ? `${API_BASE_URL}/cortes?barbeariaId=${barbeariaId}` : `${API_BASE_URL}/cortes`;
        const res = await fetch(url, { headers: authHeaders() });
        return handleResponse(res);
    }

    async createCorte(corte) {
        const res = await fetch(`${API_BASE_URL}/cortes`, {
            method: 'POST',
            headers: authHeaders(),
            body: JSON.stringify(corte)
        });
        return handleResponse(res);
    }
}

export class ApiHorarioRepository extends IHorarioRepository {
    async getHorarios() {
        const res = await fetch(`${API_BASE_URL}/horarios`, { headers: authHeaders() });
        return handleResponse(res);
    }
}