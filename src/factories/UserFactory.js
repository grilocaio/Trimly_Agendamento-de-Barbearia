// ============================================================================
// DESIGN PATTERN: FACTORY METHOD (FÁBRICA)
// ============================================================================
// Este arquivo implementa o padrão de projeto Factory. A classe UserFactory 
// centraliza e padroniza a fabricação de objetos do tipo "Usuário" no sistema.
//
// Benefício principal: Garante que todos os usuários criados (sejam Clientes,
// Barbeiros ou Administradores) possuam a mesma estrutura de dados mínima
// obrigatória e passem pelas mesmas validações básicas, evitando a duplicação
// de código de inicialização e facilitando futuras alterações de propriedades.
// ============================================================================

export class UserFactory {
    /**
     * Instancia um novo objeto de usuário com estrutura consistente.
     * @param {Object} dados - Nome, e-mail, senha, telefone, cargo e barbeariaId associado.
     * @returns {Object} O objeto literal do usuário pronto para persistência.
     */
    static createUser({ nome, email, senha, telefone, cargo, barbeariaId = null }) {
        // Validação preventiva: impede a criação de objetos corrompidos ou incompletos
        if (!nome || !email || !senha || !cargo) {
            throw new Error("Dados obrigatórios ausentes para criação de usuário.");
        }

        // Estrutura padrão e comum a todos os usuários do sistema
        const baseUser = {
            id: Date.now(), // Para LocalStorage. O banco de dados MySQL usará AUTO_INCREMENT
            nome,
            email,
            senha,
            telefone: telefone || '',
            cargo
        };

        // Regra de negócio estrutural: Apenas administradores e barbeiros possuem vínculo com barbearias
        if (cargo === 'Administrador' || cargo === 'Barbeiro') {
            baseUser.barbeariaId = barbeariaId ? Number(barbeariaId) : null;
        } else {
            baseUser.barbeariaId = null;
        }

        return baseUser;
    }
}
