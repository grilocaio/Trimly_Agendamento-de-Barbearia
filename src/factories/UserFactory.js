export class UserFactory {
    /**
     * @param {Object} dados
     * @returns {Object}
     */
    static createUser({ nome, email, senha, telefone, cargo, barbeariaId = null }) {
        if (!nome || !email || !senha || !cargo) {
            throw new Error("Dados obrigatórios ausentes para criação de usuário.");
        }

        const baseUser = {
            id: Date.now(),
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
