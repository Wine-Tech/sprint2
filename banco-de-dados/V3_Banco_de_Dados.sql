CREATE DATABASE winetech;

USE winetech;


CREATE TABLE cadastro(
	idCadastro int primary key,
    empresaCliente varchar (60) not null,
	cepCliente char (9) not null,
    emailCliente varchar(100) not null,
    senhaCliente varchar(30) not null,
    cnpj char(14) not null
);

INSERT INTO cadastro VALUES
	(1, 'Jolimont', '02258120', 'jolimont_empresa@gmail.com', 'exemplosenha1', '12345678000121'),
    (2, 'Terranova', '05695687', 'terranova_empresa@gmail.com', 'exemplosenha2', '12345678000235'),
    (3, 'Andradas', '04598320', 'andradas_empresa@gmail.com', 'exemplosenha3', '12345678000189'),
    (4, 'Chandon', '05398452', 'chandon_empresa@gmail.com', 'exemplosenha4', '12345678000278');
    
SELECT * FROM cadastro;

-- Adicionando o campo de endereço da empresa
ALTER TABLE cadastro ADD COLUMN endereçoEmpresa varchar(80) not null;
DESC cadastro;

-- Inserindo itens no campo de endereço através do update
UPDATE cadastro SET endereçoEmpresa = 'Gramado, RS' 
	WHERE idCadastro = 1;
UPDATE cadastro SET endereçoEmpresa = 'Vale do São Francisco, BA' 
	WHERE idCadastro = 2;
UPDATE cadastro SET endereçoEmpresa = 'MG'
	WHERE idCadastro = 3;
UPDATE cadastro SET endereçoEmpresa = 'Garibaldi, RS'
	WHERE idCadastro = 4;
    
SELECT * FROM cadastro;

-- Deletando uma tupla da tabela
DELETE FROM cadastro WHERE idCadastro = 1;

-- Diferentes tipos de select
SELECT * FROM cadastro WHERE nomeCliente LIKE '%s';
SELECT * FROM cadastro WHERE emailCliente LIKE '%a@%';
SELECT * FROM cadastro WHERE senhaCliente LIKE '%r_';
SELECT * FROM cadastro WHERE nomeCliente LIKE '_r%';
SELECT * FROM cadastro ORDER BY endereçoEmpresa;
SELECT * FROM cadastro ORDER BY cnpj DESC;

-- Limpar tabela cadastro
TRUNCATE cadastro;
SELECT * FROM cadastro;

-- Excluir tabela cadastro
DROP TABLE cadastro;




-- Tabela sensores

CREATE TABLE sensores(
	idSensor int primary key,
    tipoSensor varchar(30),
    localDoSensor varchar(50)
);

INSERT INTO sensores VALUE
	(1, 'BFT0001M', "Armazenamento 1"),
	(2, 'BFT0006', "Armazenamento 1"),
    (3, 'BFT0007', "Armazenamento 2"),
    (4, 'BFT00J8', "Armazenamento 2"),
    (5, 'BFT0009', "Subsolo"),
    (6, 'BFT00D1', "Subsolo");
    

-- Tabela dados dos sensores
CREATE TABLE dadosSensores(
	idDados int primary key auto_increment,
    fkSensor int not null, -- fk
    -- foreign key (fkSensor) references sensores(idSensor), 
    dadoTemperatura double not null,
    dadoUmidade double not null,
    dtHoraVerificado datetime not null
);

INSERT INTO dadosSensores VALUES
	(null, 1, 26.5, 40, '2023-03-10 10:00:00'),
	(null, 1, 26.4, 39.6, '2023-03-10 11:00:00'),
    (null, 1, 26.5, 39, '2023-03-10 12:00:00'),
    (null, 1, 26.6, 39.5, '2023-03-10 13:00:00'),
    (null, 2, 25.3, 42.4, '2023-03-10 10:00:00'),
    (null, 2, 25.5, 42, '2023-03-10 11:00:00'),
    (null, 2, 27.8, 48, '2023-03-10 10:00:00'),
    (null, 3, 27.9, 48.2, '2023-03-10 11:00:00'),
    (null, 4, 24.3, 36.1, '2023-03-10 10:00:00'),
    (null, 4, 24.2, 37, '2023-03-10 11:00:00');
    
select * from sensores join dadosSensores
	on idSensor = fkSensor;
    
    


show tables

    
    