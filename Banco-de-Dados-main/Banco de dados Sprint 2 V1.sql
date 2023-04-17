create database wineTech;
use wineTech;
drop database winetech;
create table cadastroEmpresa(
	idCadastroEmpresa int primary key auto_increment,
    empresa varchar(60),
    cnpj varchar(45),
    telefone varchar(45),
    dominio varchar(45)
    );
insert into cadastroEmpresa values
	(null, 'Renata e Débora vinícola ME', '44337495000114', '(19)2836-8001', '@renataedeboragraficame.com.br'),
    (null, 'Danilo e Calebe Comercio de Bebidas Ltda', '82423723000168', '(12)2515-4499', '@comerciovinicola.com.br'),
    (null, 'Vera e Henrique Vinícula Ltda','82423723000168', '(12)2515-4499','@comerciodebebidasltda.com.br'),
    (null,	''
create table endereco(
	idEndereco int primary key auto_increment,
    rua varchar(45),
    bairro varchar(45),
    cidade varchar(45),
    complemento varchar(45),
    estado varchar(45),
    uf char(2),
    fkCadastroEmpresa int,
    constraint fkEmpresaEndereco foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastroEmpresa)
    );

create table loginUsuario(
	idLogin int primary key auto_increment,
    emailUsuario varchar(100),
    senhaUsuario varchar(45),
    nomeUsuario varchar(45),
    fkCadastroEmpresa int,
    constraint fkCadastroEmpresa foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastroEmpresa)
    );


create table localSensor(
	idLocalSensor int primary key auto_increment,
    nomeLocal varchar(45),
    descricao varchar(45),
    tamanhoLocal varchar(45),
    fkEndereco int,
    fkCadastroEmpresa int,
    constraint fkEndereco foreign key (fkEndereco) references endereco(idEndereco),
    constraint fkCadastroEmpresaSensor foreign key (fkCadastroEmpresa) references cadastroEmpresa(idCadastroEmpresa)
    );

	
create table cadastroSensor(
	idSensor int primary key auto_increment,
    tipoSensor varchar(45),
    statusSensor varchar(45),
    fkLocalSensor int,
    fkEndereco int,
    fkCadastroEmpresa int,
    constraint fkLocalSensor foreign key(fkLocalSensor) references localSensor(idLocalSensor),
    constraint fkEnderecoCadastroSensor foreign key (fkEndereco) references localSensor(fkEndereco),
    constraint fkCadastroempresaCadastroSensor foreign key (fkCadastroEmpresa) references localSensor(fkCadastroEmpresa),
    constraint chkStatusSensor check (statusSensor in ('ativo','inativo','Manutenção'))
    );
    desc cadastroSensor;
create table dadoSensor(
	idDadoSensor int primary key auto_increment,
    temperatura varchar(45),
    umidadeSensor varchar(45),
    dataHoraSensor datetime,
    fkCadastroSensor int,
    constraint fkCadastroSensor foreign key (fkCadastroSensor) references cadastroSensor(idSensor)
    );