// Fábrica para criação consistente de objetos de Usuário

export class UserFactory {
    static createUser({ nome, email, senha, telefone, cargo, barbeariaId = null }) {
        if (!nome || !email || !senha || !cargo) {
            throw new Error("Dados obrigatórios ausentes para criação de usuário.");
        }

        const baseUser = {
            id: Date.now(), // Para LocalStorage. O banco de dados MySQL usará AUTO_INCREMENT
            nome,
            email,
            senha,
            telefone: telefone || '',
            cargo
        };

        if (cargo === 'Administrador' || cargo === 'Barbeiro') {
            baseUser.barbeariaId = barbeariaId ? Number(barbeariaId) : null;
        } else {
            baseUser.barbeariaId = null;
        }

        return baseUser;
    }
}
