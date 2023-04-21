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
	idEndereco int,
    cep char(8),
    rua varchar(45),
    numero varchar(15),
    bairro varchar(45),
    cidade varchar(45),
    complemento varchar(45),
    estado varchar(45),
    uf char(2),
    fkCadastroEmpresa int,
    constraint fkEmpresaEndereco foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastroEmpresa),
    constraint primary key(idEndereco, fkCadastroEmpresa)
    );
insert into endereco values
	(1,'01234578','Rua dos santos','25','Patriarca','São Paulo','Ao lado da estação do metro','São Paulo', 'SP', 1),
	(1,'09543587','Rua dos metalurgicos','50','São miguel','São Paulo','De Frente ao hospital municipal São miguel','São Paulo', 'SP', 2),
	(1,'17945615','R. Borges de Figueiredo','3003','mooca','São Paulo','Proximo a estação de trem mooca','São Paulo', 'SP', 3),
	(1,'01237896','Avenida Sapopemba ','41','Sapopemba','São Paulo','Ao lado da estação Sapopemba','São Paulo', 'SP', 4);
    select * from endereco;

create table loginUsuario(
	idLogin int,
    emailUsuario varchar(100),
    senhaUsuario varchar(45),
    nomeUsuario varchar(45),
    fkCadastroEmpresa int,
    constraint fkCadastroEmpresa foreign key (fkCadastroEmpresa) references cadastroEmpresa (idCadastroEmpresa),
    constraint primary key (idLogin, fkCadastroEmpresa)
    );
insert into loginUsuario values 
	(1,'joaosouza@vinicuirmaoslaltda.com.br', 'jo@oSouza2023','João Souza Algusto',1),
	(1,'vitoriathiago@auroravinicula.com.br', 'vitori@Thiago2023','Vitoria Thiago Santos',2),
	(1,'arthursantos@viniculamooca.com.br', '@rthurSantos2023','Arthur Santos Souza',3),
	(1,'vitoriathiago@auroravinicula.com.br', 'vitori@Thiago2023','Kamila Araujo Silveira',4);
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
    );
insert into localSensor values
    (1,1,1, 'Galpão','Setor A','80m²'),
    (2,1,1,	'Galpão','Setor B','60m²'),
    (1,2,1, 'Armazém ','Armazenamento Vinicula 1','55m²'),
    (2,2,1, 'Armazém','Armazenamento Vinicula 2','67m²'),
    (1,3,1, 'Estoque','Estoque 1','59m²'),
    (2,3,1, 'Estoque','Estoque 2','66m²'),
    (1,4,1, 'Container','Container A','150m²'),
    (2,4,1, 'container ','Container B','120m²');
    select * from localSensor;
create table cadastroSensor(
	idSensor int primary key auto_increment,
    tipoSensor varchar(45),
    statusSensor varchar(45),
    fkLocalSensor int,
    fkCadastroEmpresa int,
    fkEndereco int,
    constraint fkLocalSensor foreign key(fkLocalSensor,fkEndereco, fkCadastroEmpresa) references localSensor(idLocalSensor,fkEndereco, fkCadastroEmpresa),
    constraint chkStatusSensor check (statusSensor in ('ativo','inativo','Manutenção'))
    );
insert into cadastroSensor values
	(null, 'DHT11','Ativo',1,1,1),
    (null, 'DHT11','Ativo',1,2,1),
    (null, 'DHT11','Ativo',1,3,1),
    (null, 'DHT11','Ativo',1,4,1),
    (null, 'DHT11','Ativo',2,1,1),
    (null, 'DHT11','Ativo',2,2,1),
    (null, 'DHT11','Ativo',2,3,1),
    (null, 'DHT11','Ativo',2,4,1),
    (null, 'DHT11','Ativo',1,1,1),
    (null, 'DHT11','Ativo',1,2,1),
    (null, 'DHT11','Ativo',1,3,1),
    (null, 'DHT11','Ativo',1,4,1),
    (null, 'DHT11','Ativo',2,1,1),
    (null, 'DHT11','Ativo',2,2,1),
    (null, 'DHT11','Ativo',2,3,1),
    (null, 'DHT11','Ativo',2,4,1);

select cadastroSensor.idSensor,cadastroSensor.fkCadastroEmpresa from cadastroSensor
	order by idSensor;
create table dadoSensor(
	idDadoSensor int,
    temperatura varchar(45),
    umidadeSensor varchar(45),
    dataHoraSensor datetime,
    fkCadastroSensor int,
    constraint fkCadastroSensor foreign key (fkCadastroSensor) references cadastroSensor(idSensor),
    constraint primary key (idDadoSensor, fkCadastroSensor)
    );
    
insert into dadoSensor values
	(1,'15', '54', '2023-04-18 00:00:00', 1),
    (2,'15', '55', '2023-04-18 01:00:00',1),
    (3,'15', '56', '2023-04-18 02:00:00',1),
    (4,'15', '56', '2023-04-18 03:00:00',1),
    (5,'16', '57', '2023-04-18 04:00:00',1),
    (6,'17', '55', '2023-04-18 05:00:00',1),
    (7,'18', '56', '2023-04-18 06:00:00',1),
    (8,'17', '55', '2023-04-18 07:00:00',1),
    (9,'19', '54', '2023-04-18 08:00:00',1),
    (10,'20', '53', '2023-04-18 09:00:00',1),
    (11,'21', '55', '2023-04-18 10:00:00',1),
    (12,'21', '56', '2023-04-18 11:00:00',1),
    (13,'22', '55', '2023-04-18 12:00:00',1),
    (14,'23', '54', '2023-04-18 13:00:00',1),
    (15,'20', '57', '2023-04-18 14:00:00',1),
    (16,'20', '56', '2023-04-18 15:00:00',1),
    (17,'20', '56', '2023-04-18 16:00:00',1),
    (18,'19', '57', '2023-04-18 17:00:00',1),
    (19,'19', '57', '2023-04-18 18:00:00',1),
    (20,'18', '58', '2023-04-18 19:00:00',1),
    (21,'18', '58', '2023-04-18 20:00:00',1),
    (22,'15', '58', '2023-04-18 21:00:00',1),
    (23,'16', '58', '2023-04-18 22:00:00',1),
    (24,'15', '58', '2023-04-18 23:00:00',1);
select * from dadoSensor;
select 
cadastroEmpresa.empresa, 
cadastroEmpresa.cnpj, 
cadastroEmpresa.telefone,
endereco.rua,
endereco.bairro,
endereco.cidade,
loginUsuario.nomeUsuario,
loginUsuario.emailUsuario from cadastroEmpresa
	join endereco
		on endereco.fkCadastroEmpresa = idCadastroEmpresa
			join loginUsuario
				on loginUsuario.fkCadastroEmpresa = idCadastroEmpresa;
                
select 
cadastroEmpresa.empresa,
localSensor.nomeLocal,
localSensor.tamanhoLocal,
cadastroSensor.tipoSensor,
cadastroSensor.statusSensor
	from cadastroEmpresa
		join localSensor
			on localSensor.fkCadastroEmpresa = cadastroEmpresa.idCadastroEmpresa
				join cadastroSensor
					on cadastroSensor.fkLocalSensor = localSensor.idLocalSensor
						where idCadastroEmpresa = 1 and idLocalSensor = 1;
				
				
                
                
                
-- não mexer nos comentarios abaixo
-- dadoSensor.temperatura,
-- dadoSensor.umidadeSensor              
                
					-- 	join dadoSensor
						-- 	on dadoSensor.fkCadastroSensor = cadastroSensor.idSensor
							-- 	where idCadastroEmpresa = 1;
								


    