import { UserFactory } from '../factories/UserFactory';


export class AuthService {
    constructor(userRepository, bookingRepository = null) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    /**
     * @param {string} email
     * @param {string} password
     * @returns {Promise<Object>}
     */
    async login(email, password) {
        if (!email || !password) {
            throw new Error("E-mail e senha são obrigatórios!");
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user || user.senha !== password) {
            throw new Error("E-mail ou senha incorretos!");
        }

        localStorage.setItem('trimly_logado_user', JSON.stringify(user));
        localStorage.setItem('trimly_logado', user.nome);

        return user;
    }

    /**
     * @returns {Promise<void>}
     */
    async logout() {
        localStorage.removeItem('trimly_logado_user');
        localStorage.removeItem('trimly_logado');
    }

    /**
     * @returns {Object|null}
     */
    getCurrentUser() {
        const userJson = localStorage.getItem('trimly_logado_user');
        if (userJson) {
            try {
                return JSON.parse(userJson);
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    /**
     * @param {Object} dados
     * @returns {Promise<Object>}
     */
    async register({ nome, email, senha, telefone, cargo, barbeariaId }) {
        if (cargo === 'Administrador' && !barbeariaId) {
            throw new Error("Por favor, selecione a barbearia que você gerenciará.");
        }

        const emailExiste = await this.userRepository.findByEmail(email);
        if (emailExiste) {
            throw new Error("Este e-mail já está cadastrado!");
        }

        const novoUsuario = UserFactory.createUser({
            nome,
            email,
            senha,
            telefone,
            cargo,
            barbeariaId
        });

        return await this.userRepository.createUser(novoUsuario);
    }

    /**
     * @param {number} userId
     * @param {Object} dados
     * @returns {Promise<Object>}
     */
    async updateProfile(userId, { telefone, senhaAtual, novaSenha }) {
        const users = await this.userRepository.getUsuarios();
        const user = users.find(u => Number(u.id) === Number(userId));

        if (!user) {
            throw new Error("Usuário não encontrado.");
        }

        if (user.senha !== senhaAtual) {
            throw new Error("Erro: A senha atual digitada está incorreta.");
        }

        user.telefone = telefone;

        if (novaSenha) {
            if (novaSenha.length < 3) {
                throw new Error("Erro: A nova senha deve ter pelo menos 3 caracteres.");
            }
            user.senha = novaSenha;
        }

        const updatedUser = await this.userRepository.updateUser(user);

        localStorage.setItem('trimly_logado_user', JSON.stringify(updatedUser));
        localStorage.setItem('trimly_logado', updatedUser.nome);

        return updatedUser;
    }

    /**
     * @param {number} userId
     * @returns {Promise<void>}
     */
    async deleteAccount(userId) {
        const currentUser = this.getCurrentUser();
        const users = await this.userRepository.getUsuarios();
        const user = users.find(u => Number(u.id) === Number(userId));
        if (user && user.cargo === 'Cliente' && this.bookingRepository) {
            const motivo = "Cliente excluiu a própria conta";
            await this.bookingRepository.cancelarAgendamentosPorCliente(userId, motivo);
        }
        
        await this.userRepository.deleteUser(userId);
        
        if (currentUser && Number(currentUser.id) === Number(userId)) {
            await this.logout();
        }
    }
}
