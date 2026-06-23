CREATE SCHEMA IF NOT EXISTS `mydb`; USE `mydb`;

DROP TRIGGER IF EXISTS `mydb`.`tg_garantir_cliente_agenda_proprio_id`;
DROP TRIGGER IF EXISTS `mydb`.`tg_garantir_admin_atribui_barbeiro`;
DROP TRIGGER IF EXISTS `mydb`.`tg_garantir_admin_cadastra_barbearia`;
DROP TRIGGER IF EXISTS `mydb`.`tg_validar_permissao_agendamento`;
DROP PROCEDURE IF EXISTS `mydb`.`sp_cadastrar_cliente`;
DROP VIEW IF EXISTS `mydb`.`vw_agenda_barbeiro`; DROP VIEW IF EXISTS `mydb`.`vw_agenda_publica`;
DROP TABLE IF EXISTS `mydb`.`Agenda`; DROP TABLE IF EXISTS `mydb`.`Cortes`; DROP TABLE IF EXISTS `mydb`.`Usuario`;
DROP TABLE IF EXISTS `mydb`.`Barbearia`; DROP TABLE IF EXISTS `mydb`.`endereco`;
DROP TABLE IF EXISTS `mydb`.`Horario_Funcionamento`; DROP TABLE IF EXISTS `mydb`.`Cargo`;

-- DDL
-- Modelagem: Cargo/Horario/endereco normalizados (1FN-3FN). Barbearia com PK composta (entidade+localização,
-- FK propagada para Agenda/Usuario — trade-off aceitável pela integridade referencial completa).
-- Usuario usa herança de tabela única (Barbeiro+Admin), adequado para domínio pequeno.

CREATE TABLE `mydb`.`Cargo` (`ID_Cargo` INT NOT NULL AUTO_INCREMENT, `Cargos` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID_Cargo`), UNIQUE INDEX `Cargos_UNIQUE` (`Cargos` ASC)) ENGINE = InnoDB;

CREATE TABLE `mydb`.`Horario_Funcionamento` (`idHorario` INT NOT NULL AUTO_INCREMENT, `Horario` TIME NOT NULL,
  PRIMARY KEY (`idHorario`), UNIQUE INDEX `Horario_UNIQUE` (`Horario` ASC)) ENGINE = InnoDB;

CREATE TABLE `mydb`.`endereco` (`id_endereco` INT NOT NULL AUTO_INCREMENT, `CEP` VARCHAR(11) NOT NULL,
  `num` INT NOT NULL, `rua` VARCHAR(45) NOT NULL, `bairro` VARCHAR(45) NOT NULL,
  `cidade` VARCHAR(45) NOT NULL, `estado` VARCHAR(45) NOT NULL, PRIMARY KEY (`id_endereco`)) ENGINE = InnoDB;

CREATE TABLE `mydb`.`Barbearia` (`id_Barbearia` INT NOT NULL AUTO_INCREMENT, `nome` VARCHAR(100) NOT NULL,
  `endereco_id_endereco` INT NOT NULL, PRIMARY KEY (`id_Barbearia`, `endereco_id_endereco`),
  INDEX `fk_Barbearia_endereco1_idx` (`endereco_id_endereco` ASC),
  CONSTRAINT `fk_Barbearia_endereco1` FOREIGN KEY (`endereco_id_endereco`)
    REFERENCES `mydb`.`endereco` (`id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE = InnoDB;

CREATE TABLE `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT, `Nome_Usuario` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,  -- NOTA DIDÁTICA: texto plano. Produção: usar bcrypt/SHA2 via aplicação.
  `telefone` VARCHAR(20) NULL, `ID_Cargo` INT NOT NULL,
  `Barbearia_id_Barbearia` INT NULL, `Barbearia_endereco_id_endereco` INT NULL, -- vínculo profissional
  `id_barbearia_admin` INT NULL, `id_endereco_barbearia_admin` INT NULL,        -- vínculo administrativo
  PRIMARY KEY (`idUsuario`), UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `ID_Cargo` FOREIGN KEY (`ID_Cargo`) REFERENCES `mydb`.`Cargo` (`ID_Cargo`)
    ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuario_Barbearia1`
    FOREIGN KEY (`Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`)
    REFERENCES `mydb`.`Barbearia` (`id_Barbearia`, `endereco_id_endereco`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_Usuario_Barbearia_Admin`
    FOREIGN KEY (`id_barbearia_admin`, `id_endereco_barbearia_admin`)
    REFERENCES `mydb`.`Barbearia` (`id_Barbearia`, `endereco_id_endereco`) ON DELETE SET NULL ON UPDATE CASCADE)
ENGINE = InnoDB;

CREATE TABLE `mydb`.`Cortes` (`idCortes` INT NOT NULL AUTO_INCREMENT, `descCorte` VARCHAR(100) NOT NULL,
  `valor` DOUBLE NOT NULL, PRIMARY KEY (`idCortes`)) ENGINE = InnoDB;

CREATE TABLE `mydb`.`Agenda` (
  `idAgenda` INT NOT NULL AUTO_INCREMENT, `idUsuario_Cliente` INT NOT NULL,
  `idUsuario_Barbeiro` INT NOT NULL, `idCortes` INT NOT NULL,
  `Barbearia_id_Barbearia` INT NOT NULL, `Barbearia_endereco_id_endereco` INT NOT NULL,
  `Data_Corte` DATE NOT NULL, `idHorario` INT NOT NULL,
  `Status` VARCHAR(45) NOT NULL DEFAULT 'Agendado',
  PRIMARY KEY (`idAgenda`),
  UNIQUE KEY `uq_agenda_barbeiro_horario` (`idUsuario_Barbeiro`, `Data_Corte`, `idHorario`), -- previne double booking
  INDEX `idx_agenda_status` (`Status` ASC),    -- otimiza filtros por status
  INDEX `idx_agenda_data`   (`Data_Corte` ASC), -- otimiza filtros por data
  CONSTRAINT `fk_Agenda_Usuario_Cliente`  FOREIGN KEY (`idUsuario_Cliente`)  REFERENCES `mydb`.`Usuario` (`idUsuario`) ON DELETE CASCADE   ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Usuario_Barbeiro` FOREIGN KEY (`idUsuario_Barbeiro`) REFERENCES `mydb`.`Usuario` (`idUsuario`) ON DELETE RESTRICT  ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Cortes`   FOREIGN KEY (`idCortes`)  REFERENCES `mydb`.`Cortes` (`idCortes`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Barbearia` FOREIGN KEY (`Barbearia_id_Barbearia`, `Barbearia_endereco_id_endereco`)
    REFERENCES `mydb`.`Barbearia` (`id_Barbearia`, `endereco_id_endereco`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_Agenda_Horario` FOREIGN KEY (`idHorario`)
    REFERENCES `mydb`.`Horario_Funcionamento` (`idHorario`) ON DELETE RESTRICT ON UPDATE CASCADE) ENGINE = InnoDB;

-- VIEWS
-- Gerencial: dados completos de agendamento para uso interno
CREATE VIEW `mydb`.`vw_agenda_barbeiro` AS
SELECT a.`idAgenda`, b.`Nome_Usuario` AS `Barbeiro`, cl.`Nome_Usuario` AS `Cliente`,
    c.`descCorte` AS `Servico`, a.`Data_Corte` AS `Data_Atendimento`,
    h.`Horario` AS `Horario_Fixo`, a.`Status`
FROM `mydb`.`Agenda` a
INNER JOIN `mydb`.`Usuario` b  ON a.`idUsuario_Barbeiro` = b.`idUsuario`
INNER JOIN `mydb`.`Usuario` cl ON a.`idUsuario_Cliente`  = cl.`idUsuario`
INNER JOIN `mydb`.`Cortes` c   ON a.`idCortes`           = c.`idCortes`
INNER JOIN `mydb`.`Horario_Funcionamento` h ON a.`idHorario` = h.`idHorario`;

-- Pública: omite idUsuario_Cliente para proteger identidade dos clientes
CREATE VIEW `mydb`.`vw_agenda_publica` AS
SELECT b.`Nome_Usuario` AS `Barbeiro`, barb.`nome` AS `Barbearia`,
    a.`Data_Corte`, h.`Horario` AS `Horario_Ocupado`, a.`Status`
FROM `mydb`.`Agenda` a
INNER JOIN `mydb`.`Usuario` b    ON a.`idUsuario_Barbeiro`      = b.`idUsuario`
INNER JOIN `mydb`.`Barbearia` barb ON a.`Barbearia_id_Barbearia` = barb.`id_Barbearia`
INNER JOIN `mydb`.`Horario_Funcionamento` h ON a.`idHorario`    = h.`idHorario`
WHERE a.`Status` = 'Agendado';

-- STORED PROCEDURE + TRIGGERS
DELIMITER $$

CREATE PROCEDURE `mydb`.`sp_cadastrar_cliente`(
    IN p_nome VARCHAR(100), IN p_telefone VARCHAR(20), OUT p_novo_id INT, OUT p_mensagem VARCHAR(255))
BEGIN
    DECLARE v_email  VARCHAR(100); DECLARE v_existe INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SET p_novo_id = NULL;
        SET p_mensagem = 'Erro interno. Verifique os dados e tente novamente.'; ROLLBACK; END;
    SET v_email = CONCAT(LOWER(REPLACE(p_nome, ' ', '')), '@trimly.com');
    SELECT COUNT(*) INTO v_existe FROM `mydb`.`Usuario` WHERE `email` = v_email;
    IF v_existe > 0 THEN
        SET p_novo_id = NULL;
        SET p_mensagem = CONCAT('Erro: e-mail gerado (', v_email, ') já cadastrado. Use outro nome.');
    ELSE
        START TRANSACTION;
            -- NOTA DIDÁTICA: senha em texto plano. Produção: hash bcrypt/SHA2 via aplicação.
            INSERT INTO `mydb`.`Usuario` (`Nome_Usuario`, `email`, `senha`, `telefone`, `ID_Cargo`)
            VALUES (p_nome, v_email, 'mudar@123', p_telefone, 1);
            SET p_novo_id = LAST_INSERT_ID();
            SET p_mensagem = CONCAT('Cliente cadastrado com sucesso. ID: ', p_novo_id);
        COMMIT;
    END IF;
END $$

CREATE TRIGGER `mydb`.`tg_validar_permissao_agendamento`
BEFORE INSERT ON `mydb`.`Agenda` FOR EACH ROW
BEGIN
    DECLARE v INT;
    SELECT `ID_Cargo` INTO v FROM `mydb`.`Usuario` WHERE `idUsuario` = NEW.`idUsuario_Barbeiro`;
    IF v <> 2 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Consistência: O usuário selecionado como prestador do serviço deve possuir o cargo de Barbeiro.'; END IF;
END $$

CREATE TRIGGER `mydb`.`tg_garantir_admin_cadastra_barbearia`
BEFORE INSERT ON `mydb`.`Barbearia` FOR EACH ROW
BEGIN
    DECLARE v INT;
    IF @usuario_logado_id IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Segurança: Nenhum usuário autenticado na sessão do banco.'; END IF;
    SELECT `ID_Cargo` INTO v FROM `mydb`.`Usuario` WHERE `idUsuario` = @usuario_logado_id;
    IF v <> 3 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Permissão: Apenas Administradores podem cadastrar novas barbearias.'; END IF;
END $$

CREATE TRIGGER `mydb`.`tg_garantir_admin_atribui_barbeiro`
BEFORE UPDATE ON `mydb`.`Usuario` FOR EACH ROW
BEGIN
    DECLARE v_cargo INT; DECLARE v_admin_barb INT;
    IF @usuario_logado_id IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Segurança: Sessão de usuário não identificada.'; END IF;
    SELECT `ID_Cargo`, `id_barbearia_admin` INTO v_cargo, v_admin_barb FROM `mydb`.`Usuario` WHERE `idUsuario` = @usuario_logado_id;
    IF v_cargo <> 3 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Permissão: Apenas Administradores podem alterar permissões ou transferir funcionários.'; END IF;
    IF (OLD.`Barbearia_id_Barbearia` IS NULL     AND NEW.`Barbearia_id_Barbearia` IS NOT NULL) OR
       (OLD.`Barbearia_id_Barbearia` IS NOT NULL AND NEW.`Barbearia_id_Barbearia` IS NULL) OR
       (OLD.`Barbearia_id_Barbearia` <> NEW.`Barbearia_id_Barbearia`) THEN
        IF NEW.`ID_Cargo` = 1 THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Consistência: Não é permitido atribuir uma barbearia a usuários com o cargo de Cliente.'; END IF;
        IF v_admin_barb IS NOT NULL AND NEW.`Barbearia_id_Barbearia` <> v_admin_barb THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Permissão Regional: Você só pode criar ou atribuir barbeiros à barbearia sob sua administração.'; END IF;
    END IF;
END $$

CREATE TRIGGER `mydb`.`tg_garantir_cliente_agenda_proprio_id`
BEFORE INSERT ON `mydb`.`Agenda` FOR EACH ROW
BEGIN
    DECLARE v INT;
    IF @usuario_logado_id IS NULL THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Segurança: Sessão de usuário não identificada.'; END IF;
    SELECT `ID_Cargo` INTO v FROM `mydb`.`Usuario` WHERE `idUsuario` = @usuario_logado_id;
    IF v <> 3 AND NEW.`idUsuario_Cliente` <> @usuario_logado_id THEN SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Erro de Permissão: Um cliente não pode criar agendamentos para o perfil de outra pessoa.'; END IF;
END $$

DELIMITER ;

-- DML
INSERT INTO `mydb`.`Cargo` (`Cargos`) VALUES ('Cliente'), ('Barbeiro'), ('Administrador');

INSERT INTO `mydb`.`Horario_Funcionamento` (`Horario`) VALUES
('08:00:00'),('08:30:00'),('09:00:00'),('09:30:00'),('10:00:00'),('10:30:00'),('11:00:00'),('11:30:00'),
('13:00:00'),('13:30:00'),('14:00:00'),('14:30:00'),('15:00:00'),('15:30:00'),('16:00:00'),('16:30:00'),
('17:00:00'),('17:30:00');

INSERT INTO `mydb`.`endereco` (`id_endereco`,`CEP`,`num`,`rua`,`bairro`,`cidade`,`estado`) VALUES
(1,'12345-678',150,'Av. Central','Centro','São José dos Campos','SP'),
(2,'98765-432',84,'Rua das Barbearias','Vila Nova','Jacareí','SP');

SET @usuario_logado_id = 1;
INSERT INTO `mydb`.`Barbearia` (`id_Barbearia`,`nome`,`endereco_id_endereco`) VALUES
(1,'Trimly Premium - Centro',1),(2,'Trimly Express - Vila Nova',2);

INSERT INTO `mydb`.`Usuario` (`idUsuario`,`Nome_Usuario`,`email`,`senha`,`telefone`,`ID_Cargo`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`id_barbearia_admin`,`id_endereco_barbearia_admin`) VALUES
(1, 'Carlos Admin Geral',    'admin.geral@trimly.com',     'admin123',   '12999999991',3,NULL,NULL,NULL,NULL),
(9, 'Marcos Admin Regional', 'marcos.regional@trimly.com', 'marcos123',  '12999999999',3,NULL,NULL,2,2),
(2, 'Henrique Barbeiro',     'henrique@trimly.com',        'barbeiro123','12999999992',2,1,1,NULL,NULL),
(3, 'Thales Barbeiro',       'thales@trimly.com',          'barbeiro456','12999999993',2,1,1,NULL,NULL),
(10,'Fábio Barbeiro Novaes', 'fabio@trimly.com',           'barbeiro789','12988888881',2,2,2,NULL,NULL),
(11,'Gabriel Barbeiro Lima', 'gabriel@trimly.com',         'barbeiro012','12988888882',2,2,2,NULL,NULL),
(4, 'Kawan Cliente',         'kawan@email.com',            'cliente123', '12999999994',1,NULL,NULL,NULL,NULL),
(5, 'Jean Cliente',          'jean@email.com',             'cliente456', '12999999995',1,NULL,NULL,NULL,NULL),
(6, 'Lucas Oliveira',        'lucas@email.com',            'cliente789', '12999999996',1,NULL,NULL,NULL,NULL),
(7, 'Bruno Costa',           'bruno@email.com',            'clienteabc', '12999999997',1,NULL,NULL,NULL,NULL),
(8, 'Felipe Almeida',        'felipe@email.com',           'clientexyz', '12999999998',1,NULL,NULL,NULL,NULL);

INSERT INTO `mydb`.`Cortes` (`idCortes`,`descCorte`,`valor`) VALUES
(1,'Corte de Cabelo Degradê',45.00),(2,'Barba Completa com Toalha Quente',35.00),(3,'Combo: Cabelo e Barba',70.00);

-- Agendamentos (SET @usuario_logado_id simula autenticação por sessão)
SET @usuario_logado_id=4; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(4,2,1,1,1,'2026-06-15',3,'Agendado');
SET @usuario_logado_id=5; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(5,2,2,1,1,'2026-06-15',4,'Agendado');
SET @usuario_logado_id=4; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(4,3,3,1,1,'2026-06-15',3,'Concluído');
SET @usuario_logado_id=4; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(4,2,1,1,1,'2026-06-16',5,'Concluído');
SET @usuario_logado_id=6; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(6,2,2,1,1,'2026-06-16',6,'Concluído');
SET @usuario_logado_id=7; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(7,2,3,1,1,'2026-06-16',7,'Concluído');
SET @usuario_logado_id=5; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(5,3,1,1,1,'2026-06-16',3,'Concluído');
SET @usuario_logado_id=8; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(8,3,3,1,1,'2026-06-16',4,'Concluído');
SET @usuario_logado_id=4; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(4,3,2,1,1,'2026-06-16',11,'Agendado');
SET @usuario_logado_id=7; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(7,3,1,1,1,'2026-06-17',3,'Cancelado');
SET @usuario_logado_id=4; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(4,10,1,2,2,'2026-06-16',3,'Concluído');
SET @usuario_logado_id=5; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(5,10,1,2,2,'2026-06-16',4,'Concluído');
SET @usuario_logado_id=6; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(6,11,3,2,2,'2026-06-16',5,'Concluído');
SET @usuario_logado_id=7; INSERT INTO `mydb`.`Agenda`(`idUsuario_Cliente`,`idUsuario_Barbeiro`,`idCortes`,`Barbearia_id_Barbearia`,`Barbearia_endereco_id_endereco`,`Data_Corte`,`idHorario`,`Status`) VALUES(7,11,2,2,2,'2026-06-16',6,'Agendado');

-- DQL — RELATÓRIOS GERENCIAIS

-- R1: Produtividade por barbeiro (INNER JOIN + agregação + HAVING)
SELECT b.`Nome_Usuario` AS `Barbeiro`, COUNT(a.`idAgenda`) AS `Total_Atendimentos`,
    SUM(c.`valor`) AS `Faturamento_Total`, ROUND(AVG(c.`valor`),2) AS `Ticket_Medio`
FROM `mydb`.`Agenda` a
INNER JOIN `mydb`.`Usuario` b ON a.`idUsuario_Barbeiro` = b.`idUsuario`
INNER JOIN `mydb`.`Cortes` c  ON a.`idCortes`           = c.`idCortes`
WHERE a.`Status` = 'Concluído' GROUP BY b.`idUsuario`, b.`Nome_Usuario`
HAVING `Total_Atendimentos` >= 2 ORDER BY `Faturamento_Total` DESC;

-- R2: Desempenho financeiro por unidade (INNER JOIN + agregação)
SELECT barb.`nome` AS `Barbearia`, COUNT(a.`idAgenda`) AS `Total_Servicos`,
    SUM(c.`valor`) AS `Faturamento_Acumulado`, ROUND(AVG(c.`valor`),2) AS `Ticket_Medio`
FROM `mydb`.`Agenda` a
INNER JOIN `mydb`.`Barbearia` barb ON a.`Barbearia_id_Barbearia` = barb.`id_Barbearia`
                                  AND a.`Barbearia_endereco_id_endereco` = barb.`endereco_id_endereco`
INNER JOIN `mydb`.`Cortes` c ON a.`idCortes` = c.`idCortes`
WHERE a.`Status` = 'Concluído' GROUP BY barb.`id_Barbearia`, barb.`nome` ORDER BY `Faturamento_Acumulado` DESC;

-- R3: Barbeiros ociosos — inclui quem não tem agendamentos (LEFT JOIN)
SELECT u.`Nome_Usuario` AS `Barbeiro`, barb.`nome` AS `Barbearia_Vinculada`, COUNT(a.`idAgenda`) AS `Total_Agendamentos`
FROM `mydb`.`Usuario` u
LEFT JOIN `mydb`.`Agenda`    a    ON u.`idUsuario`              = a.`idUsuario_Barbeiro`
LEFT JOIN `mydb`.`Barbearia` barb ON u.`Barbearia_id_Barbearia` = barb.`id_Barbearia`
WHERE u.`ID_Cargo` = 2 GROUP BY u.`idUsuario`, u.`Nome_Usuario`, barb.`nome` ORDER BY `Total_Agendamentos` ASC;

-- R4: Serviço mais popular por barbearia (subconsulta + RANK() OVER)
SELECT barb.`nome` AS `Barbearia`, c.`descCorte` AS `Servico_Mais_Solicitado`,
    sub.`total` AS `Qtd_Realizacoes`, c.`valor` AS `Valor_Unitario`
FROM (
    SELECT `Barbearia_id_Barbearia`, `idCortes`, COUNT(*) AS `total`,
        RANK() OVER (PARTITION BY `Barbearia_id_Barbearia` ORDER BY COUNT(*) DESC) AS `ranking`
    FROM `mydb`.`Agenda` WHERE `Status` = 'Concluído' GROUP BY `Barbearia_id_Barbearia`, `idCortes`
) sub
INNER JOIN `mydb`.`Barbearia` barb ON sub.`Barbearia_id_Barbearia` = barb.`id_Barbearia`
INNER JOIN `mydb`.`Cortes` c        ON sub.`idCortes`               = c.`idCortes`
WHERE sub.`ranking` = 1 ORDER BY barb.`nome`;

-- R5: Clientes recorrentes — programa de fidelidade (subconsultas correlacionadas)
SELECT u.`Nome_Usuario` AS `Cliente`, u.`telefone`,
    (SELECT COUNT(*) FROM `mydb`.`Agenda` a
     WHERE a.`idUsuario_Cliente` = u.`idUsuario` AND a.`Status` = 'Concluído') AS `Servicos_Concluidos`,
    (SELECT SUM(c2.`valor`) FROM `mydb`.`Agenda` a2
     INNER JOIN `mydb`.`Cortes` c2 ON a2.`idCortes` = c2.`idCortes`
     WHERE a2.`idUsuario_Cliente` = u.`idUsuario` AND a2.`Status` = 'Concluído') AS `Total_Gasto`
FROM `mydb`.`Usuario` u
WHERE u.`ID_Cargo` = 1
  AND (SELECT COUNT(*) FROM `mydb`.`Agenda` a
       WHERE a.`idUsuario_Cliente` = u.`idUsuario` AND a.`Status` = 'Concluído') >= 2
ORDER BY `Total_Gasto` DESC;

-- R6: Consulta sobre a view com CASE WHEN (aplicação prática da view)
SELECT `Barbeiro`, `Cliente`, `Servico`, `Data_Atendimento`, `Horario_Fixo`,
    CASE `Status`
        WHEN 'Concluído' THEN 'Atendimento realizado'
        WHEN 'Agendado'  THEN 'Aguardando atendimento'
        WHEN 'Cancelado' THEN 'Cancelado pelo cliente'
        ELSE `Status`
    END AS `Situacao_Descritiva`
FROM `mydb`.`vw_agenda_barbeiro` ORDER BY `Data_Atendimento`, `Horario_Fixo`;