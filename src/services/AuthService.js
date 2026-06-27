import { UserFactory } from '../factories/UserFactory';

/**
 * Serviço responsável por autenticação, registro, gerenciamento de perfil e sessão de usuários.
 */
export class AuthService {
    constructor(userRepository, bookingRepository = null) {
        this.userRepository = userRepository;
        this.bookingRepository = bookingRepository;
    }

    /**
     * Realiza o login de um usuário, validando credenciais e persistindo a sessão.
     * @param {string} email - E-mail do usuário.
     * @param {string} password - Senha do usuário.
     * @returns {Promise<Object>} Dados do usuário logado.
     */
    async login(email, password) {
        if (!email || !password) {
            throw new Error("E-mail e senha são obrigatórios!");
        }

        const user = await this.userRepository.findByEmail(email);
        if (!user || user.senha !== password) {
            throw new Error("E-mail ou senha incorretos!");
        }

        // Persiste a sessão localmente
        localStorage.setItem('trimly_logado_user', JSON.stringify(user));
        localStorage.setItem('trimly_logado', user.nome); // Legado para compatibilidade

        return user;
    }

    /**
     * Encerra a sessão ativa do usuário limpando o LocalStorage.
     * @returns {Promise<void>}
     */
    async logout() {
        localStorage.removeItem('trimly_logado_user');
        localStorage.removeItem('trimly_logado');
    }

    /**
     * Obtém os dados do usuário atualmente logado.
     * @returns {Object|null} Usuário logado ou null se não houver sessão ativa.
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
     * Registra um novo usuário no sistema.
     * @param {Object} dados - Contém nome, email, senha, telefone, cargo e barbeariaId.
     * @returns {Promise<Object>} Usuário recém-criado.
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
     * Atualiza os dados cadastrais e de senha do perfil do usuário ativo.
     * @param {number} userId - ID do usuário.
     * @param {Object} dados - Contém telefone, senhaAtual e novaSenha.
     * @returns {Promise<Object>} Usuário atualizado.
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

        // Atualiza a sessão ativa
        localStorage.setItem('trimly_logado_user', JSON.stringify(updatedUser));
        localStorage.setItem('trimly_logado', updatedUser.nome);

        return updatedUser;
    }

    /**
     * Exclui permanentemente a conta de um usuário.
     * Se o usuário excluído for o que está logado atualmente, encerra a sessão ativa.
     * @param {number} userId - ID do usuário a ser excluído.
     * @returns {Promise<void>}
     */
    async deleteAccount(userId) {
        const currentUser = this.getCurrentUser();
        
        // Se a conta a ser excluída for de um cliente, cancelamos preventivamente todos os seus agendamentos ativos
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
