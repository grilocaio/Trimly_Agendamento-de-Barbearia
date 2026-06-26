// Utilitário para gerenciamento do "Banco de Dados" em localStorage

const DEFAULTS = {
    barbearias: [
        { id: 1, nome: 'Mr Cutts', cidade: 'jacarei', categoria: 'Clássico', imagem: '/barbearias/jacarei/mrcutts.jpeg' },
        { id: 2, nome: 'MW Barber Studio', cidade: 'jacarei', categoria: 'Moderno', imagem: '/barbearias/jacarei/mw barber studio.jpeg' },
        { id: 3, nome: 'Visão Barbearia', cidade: 'jacarei', categoria: 'Visagismo', imagem: '/barbearias/jacarei/visão barbearia.jpeg' },
        { id: 4, nome: 'Ocimar Hair Barbearia', cidade: 'sjc', categoria: 'Clássico', imagem: '/barbearias/sjc/ocimar hair.jpeg' },
        { id: 5, nome: 'Kleber Rosa Barbearia', cidade: 'sjc', categoria: 'Moderno', imagem: '/barbearias/sjc/Kleber Rosa.jpeg' },
        { id: 6, nome: 'Santta Madre Barbearia', cidade: 'sjc', categoria: 'Moderno', imagem: '/barbearias/sjc/santta madre.jpeg' }
    ],
    cortes: [
        { id: 1, descCorte: 'Corte de Cabelo Degradê', valor: 45.00 },
        { id: 2, descCorte: 'Barba Completa com Toalha Quente', valor: 35.00 },
        { id: 3, descCorte: 'Combo: Cabelo e Barba', valor: 70.00 }
    ],
    horarios: [
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
        '17:00', '17:30'
    ],
    usuarios: [
        { id: 1, nome: 'Caio Admin', email: 'admin1@trimly.com', senha: '123', telefone: '123456789', cargo: 'Administrador', barbeariaId: 1 },
        { id: 2, nome: 'Henrique Barbeiro', email: 'henrique@trimly.com', senha: '123', telefone: '11999999999', cargo: 'Barbeiro', barbeariaId: 1 },
        { id: 3, nome: 'Thales Barbeiro', email: 'thales@trimly.com', senha: '123', telefone: '11888888888', cargo: 'Barbeiro', barbeariaId: 1 },
        { id: 4, nome: 'Kawan Cliente', email: 'kawan@trimly.com', senha: '123', telefone: '11777777777', cargo: 'Cliente', barbeariaId: null },
        { id: 5, nome: 'Jean Cliente', email: 'jean@trimly.com', senha: '123', telefone: '11666666666', cargo: 'Cliente', barbeariaId: null },
        { id: 6, nome: 'Admin MW', email: 'admin2@trimly.com', senha: '123', telefone: '11555555555', cargo: 'Administrador', barbeariaId: 2 },
        { id: 7, nome: 'Admin Visão', email: 'admin3@trimly.com', senha: '123', telefone: '11444444444', cargo: 'Administrador', barbeariaId: 3 },
        { id: 8, nome: 'Admin Ocimar', email: 'admin4@trimly.com', senha: '123', telefone: '11333333333', cargo: 'Administrador', barbeariaId: 4 },
        { id: 9, nome: 'Admin Kleber', email: 'admin5@trimly.com', senha: '123', telefone: '11222222222', cargo: 'Administrador', barbeariaId: 5 },
        { id: 10, nome: 'Admin Santta', email: 'admin6@trimly.com', senha: '123', telefone: '11111111111', cargo: 'Administrador', barbeariaId: 6 }
    ],
    agendamentos: [
        {
            id: 101,
            clienteNome: 'Kawan Cliente',
            clienteId: 4,
            barbeiroId: 2,
            barbeiroNome: 'Henrique Barbeiro',
            barbeariaId: 1,
            corteId: 1,
            corteNome: 'Corte de Cabelo Degradê',
            valor: 45.00,
            data: '2026-06-15',
            horario: '09:00',
            status: 'Agendado',
            descricao: 'Degradê disfarçado nas laterais',
            motivoCancelamento: ''
        },
        {
            id: 102,
            clienteNome: 'Jean Cliente',
            clienteId: 5,
            barbeiroId: 2,
            barbeiroNome: 'Henrique Barbeiro',
            barbeariaId: 1,
            corteId: 2,
            corteNome: 'Barba Completa com Toalha Quente',
            valor: 35.00,
            data: '2026-06-15',
            horario: '09:30',
            status: 'Agendado',
            descricao: 'Fazer barba desenhada',
            motivoCancelamento: ''
        },
        {
            id: 103,
            clienteNome: 'Kawan Cliente',
            clienteId: 4,
            barbeiroId: 3,
            barbeiroNome: 'Thales Barbeiro',
            barbeariaId: 1,
            corteId: 3,
            corteNome: 'Combo: Cabelo e Barba',
            valor: 70.00,
            data: '2026-06-15',
            horario: '09:00',
            status: 'Concluído',
            descricao: 'Acerto de cabelo e barba',
            motivoCancelamento: ''
        }
    ]
};

export function seedDatabase() {
    const usuariosExistentes = localStorage.getItem('trimly_usuarios');
    let precisaSeedar = false;
    if (!usuariosExistentes) {
        precisaSeedar = true;
    } else {
        try {
            const parsed = JSON.parse(usuariosExistentes);
            if (parsed.length > 0 && !parsed.some(u => u.cargo)) {
                precisaSeedar = true;
            }
        } catch (e) {
            precisaSeedar = true;
        }
    }

    if (precisaSeedar) {
        localStorage.setItem('trimly_usuarios', JSON.stringify(DEFAULTS.usuarios));
    }

    if (!localStorage.getItem('trimly_barbearias')) {
        localStorage.setItem('trimly_barbearias', JSON.stringify(DEFAULTS.barbearias));
    }

    if (!localStorage.getItem('trimly_cortes')) {
        localStorage.setItem('trimly_cortes', JSON.stringify(DEFAULTS.cortes));
    }

    if (!localStorage.getItem('trimly_horarios')) {
        localStorage.setItem('trimly_horarios', JSON.stringify(DEFAULTS.horarios));
    }

    if (!localStorage.getItem('trimly_agendamentos')) {
        localStorage.setItem('trimly_agendamentos', JSON.stringify(DEFAULTS.agendamentos));
    }
}

export function getUsuarios() {
    return JSON.parse(localStorage.getItem('trimly_usuarios') || '[]');
}

export function saveUsuarios(usuarios) {
    localStorage.setItem('trimly_usuarios', JSON.stringify(usuarios));
}

export function getBarbearias() {
    return JSON.parse(localStorage.getItem('trimly_barbearias') || '[]');
}

/**
 * Salva a lista de barbearias no LocalStorage.
 * @param {Array} barbearias - Lista completa de barbearias.
 */
export function saveBarbearias(barbearias) {
    localStorage.setItem('trimly_barbearias', JSON.stringify(barbearias));
}

export function getCortes() {
    return JSON.parse(localStorage.getItem('trimly_cortes') || '[]');
}

/**
 * Salva a lista de cortes (serviços) no LocalStorage.
 * @param {Array} cortes - Lista completa de cortes.
 */
export function saveCortes(cortes) {
    localStorage.setItem('trimly_cortes', JSON.stringify(cortes));
}

export function getHorarios() {
    return JSON.parse(localStorage.getItem('trimly_horarios') || '[]');
}

export function getAgendamentos() {
    return JSON.parse(localStorage.getItem('trimly_agendamentos') || '[]');
}

export function saveAgendamentos(agendamentos) {
    localStorage.setItem('trimly_agendamentos', JSON.stringify(agendamentos));
}

export function isBarbeiroDisponivel(barbeiroId, data, horario, agendamentoIdIgnorar = null) {
    const agendamentos = getAgendamentos();
    return !agendamentos.some(a => 
        a.barbeiroId === Number(barbeiroId) && 
        a.data === data && 
        a.horario === horario && 
        a.status === 'Agendado' &&
        a.id !== agendamentoIdIgnorar
    );
}
