// não altere!
const serialport = require('serialport');
const express = require('express');
const mysql = require('mysql2');
const sql = require('mssql');

// não altere!
const SERIAL_BAUD_RATE = 9600;
const SERVIDOR_PORTA = 3300;

// configure a linha abaixo caso queira que os dados capturados sejam inseridos no banco de dados.
// false -> nao insere
// true -> insere
const HABILITAR_OPERACAO_INSERIR = true;

// altere o valor da variável AMBIENTE para o valor desejado:
// API conectada ao banco de dados remoto, SQL Server -> 'producao'
// API conectada ao banco de dados local, MySQL Workbench - 'desenvolvimento'
const AMBIENTE = 'desenvolvimento';

const serial = async (
    valoresDht11UmidadeArm1S3,
    valoresDht11UmidadeArm1S4,
    valoresDht11UmidadeArm2S5,
    valoresDht11UmidadeArm2S6,
    // valoresDht11UmidadeIdeal3,
    // valoresDht11UmidadeIdeal4,
    valoresDht11TemperaturaArm1S3,
    valoresDht11TemperaturaArm1S4,
    valoresDht11TemperaturaArm2S5,
    valoresDht11TemperaturaArm2S6,
    // valoresDht11TemperaturaIdeal3,
    // valoresDht11TemperaturaIdeal4
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'admin',
                password: 'admin',
                database: 'winetech_b'
            }
        ).promise();
    } else if (AMBIENTE == 'producao') {
        console.log('Projeto rodando inserindo dados em nuvem. Configure as credenciais abaixo.');
    } else {
        throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
    }


    const portas = await serialport.SerialPort.list();
    const portaArduino = portas.find((porta) => porta.vendorId == 2341 && porta.productId == 43);
    if (!portaArduino) {
        throw new Error('O arduino não foi encontrado em nenhuma porta serial');
    }
    const arduino = new serialport.SerialPort(
        {
            path: portaArduino.path,
            baudRate: SERIAL_BAUD_RATE
        }
    );
    arduino.on('open', () => {
        console.log(`A leitura do arduino foi iniciada na porta ${portaArduino.path} utilizando Baud Rate de ${SERIAL_BAUD_RATE}`);
    });
    arduino.pipe(new serialport.ReadlineParser({ delimiter: '\r\n' })).on('data', async (data) => {
        //console.log(data);
        const valores = data.split(';');
        const dht11UmidadeArm1S3 = parseFloat(valores[0]);
        const dht11TemperaturaArm1S3 = parseFloat(valores[1]);
        const dht11UmidadeArm1S4 = parseFloat(valores[2]);
        const dht11TemperaturaArm1S4 = parseFloat(valores[3]);
        const dht11UmidadeArm2S5 = parseInt(valores[4]);
        const dht11TemperaturaArm2S5 = parseInt(valores[5]);
        const dht11UmidadeArm2S6 = parseInt(valores[6]);
        const dht11TemperaturaArm2S6 = parseInt(valores[7]);
        // const dht11UmidadeIdeal3 = parseInt(valores[8]);
        // const dht11TemperaturaIdeal3 = parseInt(valores[9]);
        // const dht11UmidadeIdeal4 = parseInt(valores[10]);
        // const dht11TemperaturaIdeal4 = parseInt(valores[11]);
        
        valoresDht11UmidadeArm1S3.push(dht11UmidadeArm1S3);
        valoresDht11TemperaturaArm1S3.push(dht11TemperaturaArm1S3);
        valoresDht11UmidadeArm1S4.push(dht11UmidadeArm1S4);
        valoresDht11TemperaturaArm1S4.push(dht11TemperaturaArm1S4);
        valoresDht11UmidadeArm2S5.push(dht11UmidadeArm2S5);
        valoresDht11TemperaturaArm2S5.push(dht11TemperaturaArm2S5);
        valoresDht11UmidadeArm2S6.push(dht11UmidadeArm2S6);
        valoresDht11TemperaturaArm2S6.push(dht11TemperaturaArm2S6);
        // valoresDht11UmidadeIdeal3.push(dht11UmidadeIdeal3);
        // valoresDht11TemperaturaIdeal3.push(dht11TemperaturaIdeal3);
        // valoresDht11UmidadeIdeal4.push(dht11UmidadeIdeal4);
        // valoresDht11TemperaturaIdeal4.push(dht11TemperaturaIdeal4);
        // valoresLuminosidade.push(luminosidade);
        // valoresLm35Temperatura.push(lm35Temperatura);
        // valoresChave.push(chave);

        if (HABILITAR_OPERACAO_INSERIR) {
            if (AMBIENTE == 'producao') {
                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> Importante! você deve ter o aquario de id 1 cadastrado.
                sqlquery = `INSERT INTO medida (dht11_umidade, dht11_temperatura, luminosidade, lm35_temperatura, chave, momento, fk_aquario) VALUES (${dht11Umidade}, ${dht11Temperatura}, ${luminosidade}, ${lm35Temperatura}, ${chave}, CURRENT_TIMESTAMP, 1)`;

                // CREDENCIAIS DO BANCO REMOTO - SQL SERVER
                // Importante! você deve ter criado o usuário abaixo com os comandos presentes no arquivo
                // "script-criacao-usuario-sqlserver.sql", presente neste diretório.
                const connStr = "Server=servidor-acquatec.database.windows.net;Database=bd-acquatec;User Id=usuarioParaAPIArduino_datawriter;Password=#Gf_senhaParaAPI;";
                // falta alterar as variaveis da inserção do banco de dados
                function inserirComando(conn, sqlquery) {
                    conn.query(sqlquery);
                    console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)
                }

                sql.connect(connStr)
                    .then(conn => inserirComando(conn, sqlquery))
                    .catch(err => console.log("erro! " + err));

            } else if (AMBIENTE == 'desenvolvimento') {

                // altere!
                // Este insert irá inserir os dados na tabela "medida"
                // -> altere nome da tabela e colunas se necessário
                // Este insert irá inserir dados de fk_aquario id=1 (fixo no comando do insert abaixo)
                // >> você deve ter o aquario de id 1 cadastrado.
                // altere aqui tambem
                await poolBancoDados.execute(
                    'INSERT INTO dadosensor (umidade, temperatura, dtRegistro, fkSensor) VALUES (?, ?, now(), 3)',
                    [dht11UmidadeArm1S3, dht11TemperaturaArm1S3]
                );

                await poolBancoDados.execute(
                    'INSERT INTO dadosensor (umidade, temperatura, dtRegistro, fkSensor) VALUES (?, ?, now(), 4)',
                    [dht11UmidadeArm1S4, dht11TemperaturaArm1S4]
                );

                await poolBancoDados.execute(
                    'INSERT INTO dadosensor (umidade, temperatura, dtRegistro, fkSensor) VALUES (?, ?, now(), 5)',
                    [dht11UmidadeArm2S5, dht11TemperaturaArm2S5]
                );

                await poolBancoDados.execute(
                    'INSERT INTO dadosensor (umidade, temperatura, dtRegistro, fkSensor) VALUES (?, ?, now(), 6)',
                    [dht11UmidadeArm2S6, dht11TemperaturaArm2S6]
                );
                // console.log("valores inseridos no banco: ", dht11Umidade + ", " + dht11Temperatura + ", " + luminosidade + ", " + lm35Temperatura + ", " + chave)

            } else {
                throw new Error('Ambiente não configurado. Verifique o arquivo "main.js" e tente novamente.');
            }
        }
    });
    arduino.on('error', (mensagem) => {
        console.error(`Erro no arduino (Mensagem: ${mensagem}`)
    });
}


// não altere!
const servidor = (
    valoresDht11UmidadeArm1S3,
    valoresDht11UmidadeArm1S4,
    valoresDht11UmidadeArm2S5,
    valoresDht11UmidadeArm2S6,
    // valoresDht11UmidadeIdeal3,
    // valoresDht11UmidadeIdeal4,
    valoresDht11TemperaturaArm1S3,
    valoresDht11TemperaturaArm1S4,
    valoresDht11TemperaturaArm2S5,
    valoresDht11TemperaturaArm2S6,
    // valoresDht11TemperaturaIdeal3,
    // valoresDht11TemperaturaIdeal4,
    // valoresLuminosidade,
    // valoresLm35Temperatura,
    // valoresChave
) => {
    const app = express();
    app.use((request, response, next) => {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
        next();
    });
    app.listen(SERVIDOR_PORTA, () => {
        console.log(`API executada com sucesso na porta ${SERVIDOR_PORTA}`);
    });
    app.get('/sensores/dht11/umidadeArm1S3', (_, response) => {
        return response.json(valoresDht11UmidadeArm1S3);
    });
    app.get('/sensores/dht11/temperaturaArm1S3', (_, response) => {
        return response.json(valoresDht11TemperaturaArm1S3);
    });

    app.get('/sensores/dht11/umidadeArm1S4', (_, response) => {
        return response.json(valoresDht11UmidadeArm1S4);
    });

    app.get('/sensores/dht11/temperaturaArm1S4', (_, response) => {
        return response.json(valoresDht11TemperaturaArm1S4);
    });
    app.get('/sensores/dht11/umidadeArm2S5', (_, response) => {
        return response.json(valoresDht11UmidadeArm2S5);
    });
    app.get('/sensores/dht11/temperaturaArm2S5', (_, response) => {
        return response.json(valoresDht11TemperaturaArm2S5);
    });
    app.get('/sensores/dht11/umidadeArm2S6', (_, response) => {
        return response.json(valoresDht11UmidadeArm2S6);
    });
    app.get('/sensores/dht11/temperaturaArm2S6', (_, response) => {
        return response.json(valoresDht11TemperaturaArm2S6);
    });
    // app.get('/sensores/dht11/umidadeIdeal3', (_, response) => {
    //     return response.json(valoresDht11UmidadeIdeal3);
    // });
    // app.get('/sensores/dht11/temperaturaIdeal3', (_, response) => {
    //     return response.json(valoresDht11TemperaturaIdeal3);
    // });
    // app.get('/sensores/dht11/umidadeIdeal4', (_, response) => {
    //     return response.json(valoresDht11UmidadeIdeal4);
    // });
    // app.get('/sensores/dht11/temperaturaIdeal4', (_, response) => {
    //     return response.json(valoresDht11TemperaturaIdeal4);
    // });
    // app.get('/sensores/luminosidade', (_, response) => {
    //     return response.json(valoresLuminosidade);
    // });
    // app.get('/sensores/lm35/temperatura', (_, response) => {
    //     return response.json(valoresLm35Temperatura);
    // });
    // app.get('/sensores/chave', (_, response) => {
    //     return response.json(valoresChave);
    // });
}

(async () => {
    const valoresDht11UmidadeArm1S3 = [];
    const valoresDht11TemperaturaArm1S3 = [];
    const valoresDht11UmidadeArm1S4 = [];
    const valoresDht11TemperaturaArm1S4 = [];
    const valoresDht11UmidadeArm2S5 = [];
    const valoresDht11TemperaturaArm2S5 = [];
    const valoresDht11UmidadeArm2S6 = [];
    const valoresDht11TemperaturaArm2S6 = [];
    // const valoresDht11UmidadeIdeal3 = [];
    // const valoresDht11TemperaturaIdeal3 = [];
    // const valoresDht11UmidadeIdeal4 = [];
    // const valoresDht11TemperaturaIdeal4 = [];
    // const valoresLuminosidade = [];
    // const valoresLm35Temperatura = [];
    // const valoresChave = [];
    await serial(
        valoresDht11UmidadeArm1S3,
        valoresDht11TemperaturaArm1S3,
        valoresDht11UmidadeArm1S4,
        valoresDht11TemperaturaArm1S4,
        valoresDht11UmidadeArm2S5,
        valoresDht11TemperaturaArm2S5,
        valoresDht11UmidadeArm2S6,
        valoresDht11TemperaturaArm2S6,
        // valoresDht11UmidadeIdeal3,
        // valoresDht11TemperaturaIdeal3,
        // valoresDht11UmidadeIdeal4,
        // valoresDht11TemperaturaIdeal4,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    );
    servidor(
        valoresDht11UmidadeArm1S3,
        valoresDht11TemperaturaArm1S3,
        valoresDht11UmidadeArm1S4,
        valoresDht11TemperaturaArm1S4,
        valoresDht11UmidadeArm2S5,
        valoresDht11TemperaturaArm2S5,
        valoresDht11UmidadeArm2S6,
        valoresDht11TemperaturaArm2S6,
        // valoresDht11UmidadeIdeal3,
        // valoresDht11TemperaturaIdeal3,
        // valoresDht11UmidadeIdeal4,
        // valoresDht11TemperaturaIdeal4,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    );
})();
