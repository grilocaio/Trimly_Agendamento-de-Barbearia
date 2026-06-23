import { IUserRepository, IBookingRepository, IBarbeariaRepository, ICorteRepository, IHorarioRepository } from './BaseRepository';
import { 
    getUsuarios, 
    saveUsuarios, 
    getBarbearias, 
    getCortes, 
    getHorarios, 
    getAgendamentos, 
    saveAgendamentos 
} from '@/utils/storage';

export class LocalStorageUserRepository extends IUserRepository {
    async getUsuarios() {
        return getUsuarios();
    }
    
    async createUser(usuario) {
        const users = getUsuarios();
        users.push(usuario);
        saveUsuarios(users);
        return usuario;
    }

    async findByEmail(email) {
        const users = getUsuarios();
        return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
    }

    async updateUser(usuario) {
        const users = getUsuarios();
        const idx = users.findIndex(u => Number(u.id) === Number(usuario.id));
        if (idx !== -1) {
            users[idx] = usuario;
            saveUsuarios(users);
            return usuario;
        }
        throw new Error("Usuário não encontrado");
    }
}

export class LocalStorageBookingRepository extends IBookingRepository {
    async getAgendamentos() {
        return getAgendamentos();
    }
    
    async createAgendamento(agendamento) {
        const bookings = getAgendamentos();
        bookings.push(agendamento);
        saveAgendamentos(bookings);
        return agendamento;
    }

    async updateStatus(id, status) {
        const bookings = getAgendamentos();
        const idx = bookings.findIndex(a => Number(a.id) === Number(id));
        if (idx !== -1) {
            bookings[idx].status = status;
            saveAgendamentos(bookings);
            return bookings[idx];
        }
        throw new Error("Agendamento não encontrado");
    }

    async reschedule(id, data, horario) {
        const bookings = getAgendamentos();
        const idx = bookings.findIndex(a => Number(a.id) === Number(id));
        if (idx !== -1) {
            bookings[idx].data = data;
            bookings[idx].horario = horario;
            bookings[idx].status = 'Agendado';
            saveAgendamentos(bookings);
            return bookings[idx];
        }
        throw new Error("Agendamento não encontrado");
    }
}

export class LocalStorageBarbeariaRepository extends IBarbeariaRepository {
    async getBarbearias() {
        return getBarbearias();
    }
}

export class LocalStorageCorteRepository extends ICorteRepository {
    async getCortes(barbeariaId = null) {
        const cuts = getCortes();
        if (barbeariaId === null) {
            return cuts;
        }
        return cuts.filter(c => c.barbeariaId === null || c.barbeariaId === undefined || Number(c.barbeariaId) === Number(barbeariaId));
    }

    async createCorte(corte) {
        const cuts = getCortes();
        cuts.push(corte);
        localStorage.setItem('trimly_cortes', JSON.stringify(cuts));
        return corte;
    }
}

export class LocalStorageHorarioRepository extends IHorarioRepository {
    async getHorarios() {
        return getHorarios();
    }
}
