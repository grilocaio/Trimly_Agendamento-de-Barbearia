import { UserFactory } from '../factories/UserFactory';

export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

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

    async logout() {
        localStorage.removeItem('trimly_logado_user');
        localStorage.removeItem('trimly_logado');
    }

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
}
