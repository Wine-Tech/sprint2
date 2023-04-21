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
	(null,'vinicula 3 irmãos','11012345678901','(11)96544-4447','@vinicuirmaoslaltda.com.br'),
    (null,'Aurora Viniculas','45698753215988', '(11)98665-7789','@auroravinicula.com.br'),
    (null,'Vinícula Mooca','47780175648942', '(11)98662-4579','@viniculamooca.com.br'),
    (null,'Sapopemba Vinicula ltda','48975315976547', '(11)95547-5468','@sapopembavinicula.com.br');
    
    select * from cadastroEmpresa;
create table endereco(
	idEndereco int primary key auto_increment,
    cep char(8),
    rua varchar(45),
    numero varchar(15),
    bairro varchar(45),
    cidade varchar(45),
    complemento varchar(45),
    estado varchar(45),
    uf char(2),
    fkCadastroEmpresa int,
    constraint fkEmpresaEndereco foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastroEmpresa)
    );
insert into endereco values
	(null,'01234578','Rua dos santos','25','Patriarca','São Paulo','Ao lado da estação do metro','São Paulo', 'SP', 1),
	(null,'09543587','Rua dos metalurgicos','50','São miguel','São Paulo','De Frente ao hospital municipal São miguel','São Paulo', 'SP', 2),
	(null,'17945615','R. Borges de Figueiredo','3003','mooca','São Paulo','Proximo a estação de trem mooca','São Paulo', 'SP', 3),
	(null,'01237896','Avenida Sapopemba ','41','Sapopemba','São Paulo','Ao lado da estação Sapopemba','São Paulo', 'SP', 4);
    select * from endereco;

create table loginUsuario(
	idLogin int primary key auto_increment,
    emailUsuario varchar(100),
    senhaUsuario varchar(45),
    nomeUsuario varchar(45),
    fkCadastroEmpresa int,
    constraint fkCadastroEmpresa foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastroEmpresa)
    );
insert into loginUsuario values 
	(null,'joaosouza@vinicuirmaoslaltda.com.br', 'jo@oSouza2023','João Souza Algusto',1),
	(null,'vitoriathiago@auroravinicula.com.br', 'vitori@Thiago2023','Vitoria Thiago Santos',2),
	(null,'arthursantos@viniculamooca.com.br', '@rthurSantos2023','Arthur Santos Souza',3),
	(null,'vitoriathiago@auroravinicula.com.br', 'vitori@Thiago2023','Kamila Araujo Silveira',4);
    select * from loginusuario;
create table localSensor(
	idLocalSensor int,
    fkCadastroEmpresa int,
    fkEndereco int,
    nomeLocal varchar(45),
    descricao varchar(45),
    tamanhoLocal varchar(45),
    constraint fkCadastroEmpresaLocalSensor foreign key(fkCadastroEmpresa) references endereco(fkCadastroEmpresa),
    constraint fkEnderecoLocalSensor foreign key (fkEndereco) references endereco(idEndereco),
    constraint primary key (idLocalSensor, fkEndereco, fkCadastroEmpresa)
    );desc localSensor;
insert into localSensor values
    (1,1,1, 'Galpão','Setor A','80m²'),
    (2,1,1,	'Galpão','Setor B','60m²'),
    (1,2,2, 'Armazém','Armazenamento Vinicula 1','55m²'),
    (2,2,2, 'Armazém','Armazenamento Vinicula 2','67m²'),
    (3,3,3, 'Armazém','Armazenamento Vinicula 2','67m²'),
    (2,2,1, 'Armazém','Armazenamento Vinicula 2','67m²');
    select * from localSensor;
create table cadastroSensor(
	idSensor int primary key auto_increment,
    tipoSensor varchar(45),
    statusSensor varchar(45),
    fkLocalSensor int,
    fkEndereco int,
    fkCadastroEmpresa int,
    constraint fkLocalSensor foreign key(fkLocalSensor, fkEndereco, fkCadastroEmpresa) references localSensor(idLocalSensor, fkEndereco, fkCadastroEmpresa),
    constraint chkStatusSensor check (statusSensor in ('ativo','inativo','Manutenção'))
    );desc cadastroSensor;
    
insert into cadastroSensor values
	(null, 'DHT11','Ativo',1,1,1),
    (null, 'DHT11','Ativo',1,2,2),
    (null, 'DHT11','Ativo',2,1,1),
    (null, 'DHT11','Ativo',2,2,2);
    select * from cadastroSensor;
create table dadoSensor(
	idDadoSensor int primary key auto_increment,
    temperatura varchar(45),
    umidadeSensor varchar(45),
    dataHoraSensor datetime,
    fkCadastroSensor int,
    constraint fkCadastroSensor foreign key (fkCadastroSensor) references cadastroSensor(idSensor)
    ); desc dadoSensor;
    
insert into dadoSensor values
	(null,'19', '54%', '2023-04-18 11:52:30', 1),
    (null,'15', '57%', '2023-04-18 12:45:25',2),
    (null,'18', '56%', '2023-04-18 13:54:25',3),
    (null,'21', '58%', '2023-04-18 14:55:25',4);
select * from dadoSensor;


select cadastroEmpresa.empresa, 
cadastroEmpresa.cnpj, 
cadastroEmpresa.telefone, 
endereco.rua, 
endereco.bairro,
endereco.cidade,
loginUsuario.emailUsuario,
loginUsuario.nomeUsuario from cadastroEmpresa
    join endereco
		on fkCadastroEmpresa = idCadastroEmpresa  
			join loginUsuario
				on fkCadastroEmpresa = idCadastroEmpresa;