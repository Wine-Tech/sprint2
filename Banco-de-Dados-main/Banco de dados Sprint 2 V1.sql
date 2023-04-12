create database wineTech;
use wineTech;

create table cadastroEmpresa(
	idCadastro int primary key auto_increment,
    empresa varchar(60),
    cnpj varchar(45),
    telefone varchar(45),
    dominio varchar(45)
    );

create table endereco(
	idEndereco int primary key auto_increment,
    rua varchar(45),
    bairro varchar(45),
    cidade varchar(45),
    complemento varchar(45),
    estado varchar(45),
    uf char(2),
    fkCadastroEmpresa int,
    constraint fkEmpresaEndereco foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastro)
    );

create table loginUsuario(
	idLogin int primary key auto_increment,
    emailUsuario varchar(100),
    senhaUsuario varchar(45),
    nomeUsuario varchar(45),
    fkCadastroEmpresa int,
    constraint fkCadastroEmpresa foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastro)
    );


create table cadastroSensor(
	idSensor int primary key auto_increment,
    tipoSensor varchar(45),
    statusSensor varchar(45),
    fkCadastroEmpresa int,
	constraint fkEmpresa foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastro)
    );
desc cadastroSensor;

create table dadoSensor(
	idDadoSensor int primary key auto_increment,
    temperaturaSensor varchar(45),
    umidadeSensor varchar(45),
    fkSensor int,
    constraint fkDadoSensor foreign key (fkSensor) references cadastroSensor (idSensor)
    );

create table localSensor(
	idLocalSensor int primary key auto_increment,
    nomeLocal varchar(45),
    descricao varchar(45),
    tamanhoLocal varchar(45),
    fkSensor int,
    constraint fkLocalSensor foreign key (fkSensor) references cadastroSensor (idSensor)
    );

    
    