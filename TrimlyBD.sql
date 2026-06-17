CREATE SCHEMA IF NOT EXISTS `mydb`;
USE `mydb`;

DROP TRIGGER IF EXISTS `mydb`.`tg_garantir_cliente_agenda_proprio_id`;
DROP TRIGGER IF EXISTS `mydb`.`tg_garantir_admin_atribui_barbeiro`;
DROP TRIGGER IF EXISTS `mydb`.`tg_garantir_admin_cadastra_barbearia`;
DROP TRIGGER IF EXISTS `mydb`.`tg_validar_permissao_agendamento`;
DROP PROCEDURE IF EXISTS `mydb`.`sp_cadastrar_cliente`;
DROP VIEW IF EXISTS `mydb`.`vw_agenda_barbeiro`;
DROP TABLE IF EXISTS `mydb`.`Agenda`;
DROP TABLE IF EXISTS `mydb`.`Cortes`;
DROP TABLE IF EXISTS `mydb`.`Usuario`;
DROP TABLE IF EXISTS `mydb`.`Barbearia`;
DROP TABLE IF EXISTS `mydb`.`endereco`;
DROP TABLE IF EXISTS `mydb`.`Horario_Funcionamento`;
DROP TABLE IF EXISTS `mydb`.`Cargo`;

CREATE TABLE IF NOT EXISTS `mydb`.`Cargo` (
  `ID_Cargo` INT NOT NULL AUTO_INCREMENT,
  `Cargos` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Cargo`),
  UNIQUE INDEX `Cargos_UNIQUE` (`Cargos` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`Horario_Funcionamento` (
  `idHorario` INT NOT NULL AUTO_INCREMENT,
  `Horario` TIME NOT NULL,
  PRIMARY KEY (`idHorario`),
  UNIQUE INDEX `Horario_UNIQUE` (`Horario` ASC) VISIBLE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`endereco` (
  `id_endereco` INT NOT NULL AUTO_INCREMENT,
  `CEP` VARCHAR(11) NOT NULL,
  `num` INT NOT NULL,
  `rua` VARCHAR(45) NOT NULL,
  `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_endereco`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`Barbearia` (
  `id_Barbearia` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `endereco_id_endereco` INT NOT NULL,
  PRIMARY KEY (`id_Barbearia`, `endereco_id_endereco`),
  INDEX `fk_Barbearia_endereco1_idx` (`endereco_id_endereco` ASC) VISIBLE,
  CONSTRAINT `fk_Barbearia_endereco1`
    FOREIGN KEY (`endereco_id_endereco`)
    REFERENCES `mydb`.`endereco` (`id_endereco`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome_Usuario` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `telefone` VARCHAR(20) NULL,
  `ID_Cargo` INT NOT NULL,
  `Barbearia_id_Barbearia` INT NULL,
  `Barbearia_endereco_id_endereco` INT NULL,
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `ID_Cargo_idx` (`ID_Cargo` ASC) VISIBLE,
  INDEX `fk_Usuario_Barbearia1_idx` (`Barbearia_id_Barbearia` ASC, `Barbearia_endereco_id_endereco` ASC) VISIBLE,
  CONSTRAINT `ID_Cargo`
    FOREIGN KEY (`ID_Cargo`)
    REFERENCES `mydb`.`Cargo` (`ID_Cargo`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuario_Barbearia1`
    FOREIGN KEY (`Barbearia_id_Barbearia` , `Barbearia_endereco_id_endereco`)
    REFERENCES `mydb`.`Barbearia` (`id_Barbearia` , `endereco_id_endereco`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`Cortes` (
  `idCortes` INT NOT NULL AUTO_INCREMENT,
  `descCorte` VARCHAR(100) NOT NULL,
  `valor` DOUBLE NOT NULL,
  PRIMARY KEY (`idCortes`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `mydb`.`Agenda` (
  `idAgenda` INT NOT NULL AUTO_INCREMENT,
  `idUsuario_Cliente` INT NOT NULL,
  `idUsuario_Barbeiro` INT NOT NULL,
  `idCortes` INT NOT NULL,
  `Barbearia_id_Barbearia` INT NOT NULL,
  `Barbearia_endereco_id_endereco` INT NOT NULL,
  `Data_Corte` DATE NOT NULL,
  `idHorario` INT NOT NULL,
  `Status` VARCHAR(45) NOT NULL DEFAULT 'Agendado',
  PRIMARY KEY (`idAgenda`),
  INDEX `fk_Agenda_Usuario_Cliente_idx` (`idUsuario_Cliente` ASC) VISIBLE,
  INDEX `fk_Agenda_Usuario_Barbeiro_idx` (`idUsuario_Barbeiro` ASC) VISIBLE,
  INDEX `fk_Agenda_Cortes_idx` (`idCortes` ASC) VISIBLE,
  INDEX `fk_Agenda_Barbearia_idx` (`Barbearia_id_Barbearia` ASC, `Barbearia_endereco_id_endereco` ASC) VISIBLE,
  INDEX `fk_Agenda_Horario_idx` (`idHorario` ASC) VISIBLE,
  CONSTRAINT `fk_Agenda_Usuario_Cliente`
    FOREIGN KEY (`idUsuario_Cliente`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Usuario_Barbeiro`
    FOREIGN KEY (`idUsuario_Barbeiro`)
    REFERENCES `mydb`.`Usuario` (`idUsuario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Cortes`
    FOREIGN KEY (`idCortes`)
    REFERENCES `mydb`.`Cortes` (`idCortes`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Barbearia`
    FOREIGN KEY (`Barbearia_id_Barbearia` , `Barbearia_endereco_id_endereco`)
    REFERENCES `mydb`.`Barbearia` (`id_Barbearia` , `endereco_id_endereco`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Horario`
    FOREIGN KEY (`idHorario`)
    REFERENCES `mydb`.`Horario_Funcionamento` (`idHorario`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `uq_agenda_barbeiro_horario` UNIQUE (`idUsuario_Barbeiro`, `Data_Corte`, `idHorario`))
ENGINE = InnoDB;

CREATE INDEX `idx_agenda_status` ON `mydb`.`Agenda` (`Status` ASC) VISIBLE;
CREATE INDEX `idx_agenda_data` ON `mydb`.`Agenda` (`Data_Corte` ASC) VISIBLE;

CREATE VIEW `mydb`.`vw_agenda_barbeiro` AS
SELECT 
    a.`idAgenda`,
    b.`Nome_Usuario` AS `Barbeiro`,
    cl.`Nome_Usuario` AS `Cliente`,
    c.`descCorte` AS `Servico`,
    a.`Data_Corte` AS `Data_Atendimento`,
    h.`Horario` AS `Horario_Fixo`,
    a.`Status`
FROM `mydb`.`Agenda` a
INNER JOIN `mydb`.`Usuario` b ON a.`idUsuario_Barbeiro` = b.`idUsuario`
INNER JOIN `mydb`.`Usuario` cl ON a.`idUsuario_Cliente` = cl.`idUsuario`
INNER JOIN `mydb`.`Cortes` c ON a.`idCortes` = c.`idCortes`
INNER JOIN `mydb`.`Horario_Funcionamento` h ON a.`idHorario` = h.`idHorario`;

DELIMITER $$

CREATE PROCEDURE `mydb`.`sp_cadastrar_cliente`(
    IN p_nome VARCHAR(100)
)
BEGIN
    INSERT INTO `mydb`.`Usuario` (`Nome_Usuario`, `ID_Cargo`, `Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`)
    VALUES (p_nome, 1, NULL, NULL);
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER `mydb`.`tg_validar_permissao_agendamento`
BEFORE INSERT ON `mydb`.`Agenda`
FOR EACH ROW
BEGIN
    DECLARE v_cargo_prestador INT;

    SELECT `ID_Cargo` INTO v_cargo_prestador
    FROM `mydb`.`Usuario`
    WHERE `idUsuario` = NEW.`idUsuario_Barbeiro`;

    IF v_cargo_prestador <> 2 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro de Consistência: O usuário selecionado como prestador do serviço deve possuir o cargo de Barbeiro.';
    END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER `mydb`.`tg_garantir_admin_cadastra_barbearia`
BEFORE INSERT ON `mydb`.`Barbearia`
FOR EACH ROW
BEGIN
    DECLARE v_cargo_usuario INT;

    IF @usuario_logado_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro de Segurança: Nenhum usuário autenticado na sessão do banco.';
    END IF;

    SELECT `ID_Cargo` INTO v_cargo_usuario
    FROM `mydb`.`Usuario`
    WHERE `idUsuario` = @usuario_logado_id;

    IF v_cargo_usuario <> 3 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro de Permissão: Apenas Administradores podem cadastrar novas barbearias.';
    END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER `mydb`.`tg_garantir_admin_atribui_barbeiro`
BEFORE UPDATE ON `mydb`.`Usuario`
FOR EACH ROW
BEGIN
    DECLARE v_cargo_operador INT;

    IF OLD.`Barbearia_id_Barbearia` IS DISTINCT FROM NEW.`Barbearia_id_Barbearia` THEN
        
        IF @usuario_logado_id IS NULL THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erro de Segurança: Sessão de usuário não identificada.';
        END IF;

        SELECT `ID_Cargo` INTO v_cargo_operador
        FROM `mydb`.`Usuario`
        WHERE `idUsuario` = @usuario_logado_id;

        IF v_cargo_operador <> 3 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erro de Permissão: Apenas Administradores podem atribuir ou transferir funcionários de barbearia.';
        END IF;

        IF NEW.`ID_Cargo` = 1 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Erro de Consistência: Não é permitido atribuir uma barbearia a usuários com o cargo de Cliente.';
        END IF;

    END IF;
END $$

DELIMITER ;

DELIMITER $$

CREATE TRIGGER `mydb`.`tg_garantir_cliente_agenda_proprio_id`
BEFORE INSERT ON `mydb`.`Agenda`
FOR EACH ROW
BEGIN
    DECLARE v_cargo_operador INT;

    IF @usuario_logado_id IS NULL THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro de Segurança: Sessão de usuário não identificada.';
    END IF;

    SELECT `ID_Cargo` INTO v_cargo_operador
    FROM `mydb`.`Usuario`
    WHERE `idUsuario` = @usuario_logado_id;

    IF v_cargo_operador <> 3 AND NEW.`idUsuario_Cliente` <> @usuario_logado_id THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Erro de Permissão: Um cliente não pode criar agendamentos para o perfil de outra pessoa.';
    END IF;
END $$

DELIMITER ;

INSERT INTO `mydb`.`Cargo` (`Cargos`) VALUES ('Cliente'), ('Barbeiro'), ('Administrador');

INSERT INTO `mydb`.`Horario_Funcionamento` (`Horario`) VALUES 
('08:00:00'), ('08:30:00'), ('09:00:00'), ('09:30:00'), 
('10:00:00'), ('10:30:00'), ('11:00:00'), ('11:30:00'),
('13:00:00'), ('13:30:00'), ('14:00:00'), ('14:30:00'),
('15:00:00'), ('15:30:00'), ('16:00:00'), ('16:30:00'),
('17:00:00'), ('17:30:00');

INSERT INTO `mydb`.`endereco` (`id_endereco`, `CEP`, `num`, `rua`, `bairro`, `cidade`, `estado`) VALUES
(1, '12345-678', 150, 'Av. Central', 'Centro', 'São José dos Campos', 'SP'),
(2, '98765-432', 84, 'Rua das Barbearias', 'Vila Nova', 'Jacareí', 'SP');

SET @usuario_logado_id = 1;

INSERT INTO `mydb`.`Barbearia` (`id_Barbearia`, `nome`, `endereco_id_endereco`) VALUES 
(1, 'Trimly Premium - Centro', 1),
(2, 'Trimly Express - Vila Nova', 2);

INSERT INTO `mydb`.`Usuario` (`idUsuario`, `Nome_Usuario`, `ID_Cargo`, `Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`) VALUES 
(1, 'Carlos Admin', 3, NULL, NULL),
(2, 'Henrique Barbeiro', 2, 1, 1),
(3, 'Thales Barbeiro', 2, 1, 1),
(4, 'Kawan Cliente', 1, NULL, NULL),
(5, 'Jean Cliente', 1, NULL, NULL);

INSERT INTO `mydb`.`Cortes` (`idCortes`, `descCorte`, `valor`) VALUES 
(1, 'Corte de Cabelo Degradê', 45.00),
(2, 'Barba Completa com Toalha Quente', 35.00),
(3, 'Combo: Cabelo e Barba', 70.00);

SET @usuario_logado_id = 4;
INSERT INTO `mydb`.`Agenda` (`idUsuario_Cliente`, `idUsuario_Barbeiro`, `idCortes`, `Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`, `Data_Corte`, `idHorario`, `Status`) VALUES
(4, 2, 1, 1, 1, '2026-06-15', 3, 'Agendado');

SET @usuario_logado_id = 5;
INSERT INTO `mydb`.`Agenda` (`idUsuario_Cliente`, `idUsuario_Barbeiro`, `idCortes`, `Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`, `Data_Corte`, `idHorario`, `Status`) VALUES
(5, 2, 2, 1, 1, '2026-06-15', 4, 'Agendado');

SET @usuario_logado_id = 4;
INSERT INTO `mydb`.`Agenda` (`idUsuario_Cliente`, `idUsuario_Barbeiro`, `idCortes`, `Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`, `Data_Corte`, `idHorario`, `Status`) VALUES
(4, 3, 3, 1, 1, '2026-06-15', 3, 'Concluído');