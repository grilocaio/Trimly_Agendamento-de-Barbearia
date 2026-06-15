CREATE TABLE IF NOT EXISTS `mydb`.`Cargo` (
  `ID_Cargo` INT NOT NULL AUTO_INCREMENT,
  `Cargos` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`ID_Cargo`))
ENGINE = InnoDB
CREATE TABLE IF NOT EXISTS `mydb`.`Cortes` (
  `idCortes` INT NOT NULL,
  `descCorte` VARCHAR(100) NULL,
  `valor` DOUBLE NULL,
  `Agenda_idAgenda` INT NOT NULL,
  PRIMARY KEY (`idCortes`),
  INDEX `fk_Cortes_Agenda1_idx` (`Agenda_idAgenda` ASC) VISIBLE,
  CONSTRAINT `fk_Cortes_Agenda1`
    FOREIGN KEY (`Agenda_idAgenda`)
    REFERENCES `mydb`.`Agenda` (`idAgenda`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
CREATE TABLE IF NOT EXISTS `mydb`.`Agenda` (
  `idAgenda` INT NOT NULL,
  `idUsuario` INT NULL,
  `idCortes` INT NULL,
  `id_Barbearia` INT NULL,
  `Data_Corte` VARCHAR(45) NULL,
  `Status` VARCHAR(45) NULL,
  PRIMARY KEY (`idAgenda`))
ENGINE = InnoDB
CREATE TABLE IF NOT EXISTS `mydb`.`Usuario` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `Nome_Usuario` VARCHAR(100) NOT NULL,
  `ID_Cargo` INT NOT NULL,
  `ID_Barbearia` INT NOT NULL,
  `Barbearia_id_Barbearia` INT NOT NULL,
  `Barbearia_endereco_id_endereco` INT NOT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `ID_Cargo_idx` (`ID_Cargo` ASC) VISIBLE,
  INDEX `fk_Usuario_Barbearia1_idx` (`Barbearia_id_Barbearia` ASC, `Barbearia_endereco_id_endereco` ASC) VISIBLE,
  CONSTRAINT `ID_Cargo`
    FOREIGN KEY (`ID_Cargo`)
    REFERENCES `mydb`.`Cargo` (`ID_Cargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuario_Barbearia1`
    FOREIGN KEY (`Barbearia_id_Barbearia` , `Barbearia_endereco_id_endereco`)
    REFERENCES `mydb`.`Barbearia` (`id_Barbearia` , `endereco_id_endereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
CREATE TABLE IF NOT EXISTS `mydb`.`endereco` (
  `id_endereco` INT NOT NULL,
  `CEP` VARCHAR(11) NOT NULL,
  `num` INT NOT NULL,
  `rua` VARCHAR(45) NULL,
  `bairro` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `estado` VARCHAR(45) NULL,
  PRIMARY KEY (`id_endereco`))
ENGINE = InnoDB
CREATE TABLE IF NOT EXISTS `mydb`.`Barbearia` (
  `id_Barbearia` INT NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `Id_endereco` INT NOT NULL,
  `endereco_id_endereco` INT NOT NULL,
  `Agenda_idAgenda` INT NOT NULL,
  PRIMARY KEY (`id_Barbearia`, `endereco_id_endereco`),
  INDEX `fk_Barbearia_endereco1_idx` (`endereco_id_endereco` ASC) VISIBLE,
  INDEX `fk_Barbearia_Agenda1_idx` (`Agenda_idAgenda` ASC) VISIBLE,
  CONSTRAINT `fk_Barbearia_endereco1`
    FOREIGN KEY (`endereco_id_endereco`)
    REFERENCES `mydb`.`endereco` (`id_endereco`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Barbearia_Agenda1`
    FOREIGN KEY (`Agenda_idAgenda`)
    REFERENCES `mydb`.`Agenda` (`idAgenda`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
INSERT INTO Cargo (Cargos)
VALUES
('Barbeiro'),
('Gerente'),
('Cliente');

INSERT INTO endereco
(id_endereco, CEP, num, rua, bairro, cidade, estado)
VALUES
(1, '12280-000', 100, 'Rua Central', 'Centro', 'Caçapava', 'SP'),
(2, '12280-100', 250, 'Rua das Flores', 'Vila Nova', 'Caçapava', 'SP');

INSERT INTO Agenda
(idAgenda, idUsuario, idCortes, id_Barbearia, Data_Corte, Status)
VALUES
(1, NULL, NULL, NULL, '2026-06-01 10:00', 'Agendado'),
(2, NULL, NULL, NULL, '2026-06-01 14:00', 'Agendado');

INSERT INTO Barbearia
(id_Barbearia, nome, Id_endereco, endereco_id_endereco, Agenda_idAgenda)
VALUES
(1, 'Barbearia Imperial', 1, 1, 1);

INSERT INTO Usuario
(
Nome_Usuario,
ID_Cargo,
ID_Barbearia,
Barbearia_id_Barbearia,
Barbearia_endereco_id_endereco
)
VALUES
('João Silva', 1, 1, 1, 1),
('Carlos Souza', 2, 1, 1, 1),
('Pedro Santos', 3, 1, 1, 1);

INSERT INTO Cortes
(idCortes, descCorte, valor, Agenda_idAgenda)
VALUES
(1, 'Degradê', 35.00, 1),
(2, 'Social', 25.00, 2);

UPDATE Agenda
SET
idUsuario = 3,
idCortes = 1,
id_Barbearia = 1
WHERE idAgenda = 1;

UPDATE Agenda
SET
idUsuario = 3,
idCortes = 2,
id_Barbearia = 1
WHERE idAgenda = 2;