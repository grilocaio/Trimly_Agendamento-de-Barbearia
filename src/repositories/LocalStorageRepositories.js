import { IUserRepository, IBookingRepository, IBarbeariaRepository, ICorteRepository, IHorarioRepository } from './BaseRepository';
import { 
    getUsuarios, 
    saveUsuarios, 
    getBarbearias, 
    saveBarbearias,
    getCortes, 
    saveCortes,
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

    async deleteUser(id) {
        const users = getUsuarios();
        const filtered = users.filter(u => Number(u.id) !== Number(id));
        saveUsuarios(filtered);
    }

    async desvincularBarbearia(userId) {
        const users = getUsuarios();
        const idx = users.findIndex(u => Number(u.id) === Number(userId));
        if (idx !== -1) {
            users[idx].barbeariaId = null;
            saveUsuarios(users);
            return users[idx];
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

    async updateStatusComMotivo(id, status, motivo) {
        const bookings = getAgendamentos();
        const idx = bookings.findIndex(a => Number(a.id) === Number(id));
        if (idx !== -1) {
            bookings[idx].status = status;
            bookings[idx].motivoCancelamento = motivo;
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

    async cancelarAgendamentosPorBarbeiro(barbeiroId, motivo) {
        const bookings = getAgendamentos();
        let alterado = false;
        bookings.forEach(a => {
            if (Number(a.barbeiroId) === Number(barbeiroId) && a.status === 'Agendado') {
                a.status = 'Cancelado';
                a.motivoCancelamento = motivo;
                alterado = true;
            }
        });
        if (alterado) {
            saveAgendamentos(bookings);
        }
    }

    async cancelarAgendamentosPorBarbearia(barbeariaId, motivo) {
        const bookings = getAgendamentos();
        let alterado = false;
        bookings.forEach(a => {
            if (Number(a.barbeariaId) === Number(barbeariaId) && a.status === 'Agendado') {
                a.status = 'Cancelado';
                a.motivoCancelamento = motivo;
                alterado = true;
            }
        });
        if (alterado) {
            saveAgendamentos(bookings);
        }
    }

    async cancelarAgendamentosPorCliente(clienteId, motivo) {
        const bookings = getAgendamentos();
        let alterado = false;
        bookings.forEach(a => {
            if (Number(a.clienteId) === Number(clienteId) && a.status === 'Agendado') {
                a.status = 'Cancelado';
                a.motivoCancelamento = motivo;
                alterado = true;
            }
        });
        if (alterado) {
            saveAgendamentos(bookings);
        }
    }
}

export class LocalStorageBarbeariaRepository extends IBarbeariaRepository {
    async getBarbearias() {
        return getBarbearias();
    }

    async deleteBarbearia(id) {
        const barbearias = getBarbearias();
        const filtered = barbearias.filter(b => Number(b.id) !== Number(id));
        saveBarbearias(filtered);
    }

    async updateBarbearia(barbearia) {
        const barbearias = getBarbearias();
        const idx = barbearias.findIndex(b => Number(b.id) === Number(barbearia.id));
        if (idx !== -1) {
            barbearias[idx] = { ...barbearias[idx], ...barbearia };
            saveBarbearias(barbearias);
            return barbearias[idx];
        }
        throw new Error("Barbearia não encontrada");
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
        saveCortes(cuts);
        return corte;
    }

    async deleteCorte(id) {
        const cuts = getCortes();
        const filtered = cuts.filter(c => Number(c.id) !== Number(id));
        saveCortes(filtered);
    }
}

export class LocalStorageHorarioRepository extends IHorarioRepository {
    async getHorarios() {
        return getHorarios();
    }
}
