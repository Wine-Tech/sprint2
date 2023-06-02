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
    valoresDht11Umidade,
    valoresDht11UmidadeIdeal,
    valoresDht11UmidadeIdeal1,
    valoresDht11UmidadeIdeal2,
    valoresDht11UmidadeIdeal3,
    valoresDht11UmidadeIdeal4,
    valoresDht11Temperatura,
    valoresDht11TemperaturaIdeal,
    valoresDht11TemperaturaIdeal1,
    valoresDht11TemperaturaIdeal2,
    valoresDht11TemperaturaIdeal3,
    valoresDht11TemperaturaIdeal4
) => {
    let poolBancoDados = ''

    if (AMBIENTE == 'desenvolvimento') {
        poolBancoDados = mysql.createPool(
            {
                // altere!
                // CREDENCIAIS DO BANCO LOCAL - MYSQL WORKBENCH
                host: 'localhost',
                user: 'root',
                password: '25169544b',
                database: 'vinho'
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
        const dht11UmidadeReal = parseFloat(valores[0]);
        const dht11TemperaturaReal = parseFloat(valores[1]);
        const dht11UmidadeIdeal = parseFloat(valores[2]);
        const dht11TemperaturaIdeal = parseFloat(valores[3]);
        const dht11UmidadeIdeal1 = parseInt(valores[4]);
        const dht11TemperaturaIdeal1 = parseInt(valores[5]);
        const dht11UmidadeIdeal2 = parseInt(valores[6]);
        const dht11TemperaturaIdeal2 = parseInt(valores[7]);
        const dht11UmidadeIdeal3 = parseInt(valores[8]);
        const dht11TemperaturaIdeal3 = parseInt(valores[9]);
        const dht11UmidadeIdeal4 = parseInt(valores[10]);
        const dht11TemperaturaIdeal4 = parseInt(valores[11]);
        
        valoresDht11Umidade.push(dht11UmidadeReal);
        valoresDht11Temperatura.push(dht11TemperaturaReal);
        valoresDht11UmidadeIdeal.push(dht11UmidadeIdeal);
        valoresDht11TemperaturaIdeal.push(dht11TemperaturaIdeal);
        valoresDht11UmidadeIdeal1.push(dht11UmidadeIdeal1);
        valoresDht11TemperaturaIdeal1.push(dht11TemperaturaIdeal1);
        valoresDht11UmidadeIdeal2.push(dht11UmidadeIdeal2);
        valoresDht11TemperaturaIdeal2.push(dht11TemperaturaIdeal2);
        valoresDht11UmidadeIdeal3.push(dht11UmidadeIdeal3);
        valoresDht11TemperaturaIdeal3.push(dht11TemperaturaIdeal3);
        valoresDht11UmidadeIdeal4.push(dht11UmidadeIdeal4);
        valoresDht11TemperaturaIdeal4.push(dht11TemperaturaIdeal4);
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
                    'INSERT INTO dadosensor (umidade, temperatura,dtRegistro, fkSensor) VALUES (?, ?, now(), 1)',
                    [dht11UmidadeReal, dht11TemperaturaReal]
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
    valoresDht11Umidade,
    valoresDht11UmidadeIdeal,
    valoresDht11UmidadeIdeal1,
    valoresDht11UmidadeIdeal2,
    valoresDht11UmidadeIdeal3,
    valoresDht11UmidadeIdeal4,
    valoresDht11Temperatura,
    valoresDht11TemperaturaIdeal,
    valoresDht11TemperaturaIdeal1,
    valoresDht11TemperaturaIdeal2,
    valoresDht11TemperaturaIdeal3,
    valoresDht11TemperaturaIdeal4,
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
    app.get('/sensores/dht11/umidade', (_, response) => {
        return response.json(valoresDht11Umidade);
    });
    app.get('/sensores/dht11/temperatura', (_, response) => {
        return response.json(valoresDht11Temperatura);
    });

    app.get('/sensores/dht11/umidadeIdeal', (_, response) => {
        return response.json(valoresDht11UmidadeIdeal);
    });

    app.get('/sensores/dht11/temperaturaIdeal', (_, response) => {
        return response.json(valoresDht11TemperaturaIdeal);
    });
    app.get('/sensores/dht11/umidadeIdeal1', (_, response) => {
        return response.json(valoresDht11UmidadeIdeal1);
    });
    app.get('/sensores/dht11/temperaturaIdeal1', (_, response) => {
        return response.json(valoresDht11TemperaturaIdeal1);
    });
    app.get('/sensores/dht11/umidadeIdeal2', (_, response) => {
        return response.json(valoresDht11UmidadeIdeal2);
    });
    app.get('/sensores/dht11/temperaturaIdeal2', (_, response) => {
        return response.json(valoresDht11TemperaturaIdeal2);
    });
    app.get('/sensores/dht11/umidadeIdeal3', (_, response) => {
        return response.json(valoresDht11UmidadeIdeal3);
    });
    app.get('/sensores/dht11/temperaturaIdeal3', (_, response) => {
        return response.json(valoresDht11TemperaturaIdeal3);
    });
    app.get('/sensores/dht11/umidadeIdeal4', (_, response) => {
        return response.json(valoresDht11UmidadeIdeal4);
    });
    app.get('/sensores/dht11/temperaturaIdeal4', (_, response) => {
        return response.json(valoresDht11TemperaturaIdeal4);
    });
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
    const valoresDht11Umidade = [];
    const valoresDht11Temperatura = [];
    const valoresDht11UmidadeIdeal = [];
    const valoresDht11TemperaturaIdeal = [];
    const valoresDht11UmidadeIdeal1 = [];
    const valoresDht11TemperaturaIdeal1 = [];
    const valoresDht11UmidadeIdeal2 = [];
    const valoresDht11TemperaturaIdeal2 = [];
    const valoresDht11UmidadeIdeal3 = [];
    const valoresDht11TemperaturaIdeal3 = [];
    const valoresDht11UmidadeIdeal4 = [];
    const valoresDht11TemperaturaIdeal4 = [];
    // const valoresLuminosidade = [];
    // const valoresLm35Temperatura = [];
    // const valoresChave = [];
    await serial(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresDht11UmidadeIdeal,
        valoresDht11TemperaturaIdeal,
        valoresDht11UmidadeIdeal1,
        valoresDht11TemperaturaIdeal1,
        valoresDht11UmidadeIdeal2,
        valoresDht11TemperaturaIdeal2,
        valoresDht11UmidadeIdeal3,
        valoresDht11TemperaturaIdeal3,
        valoresDht11UmidadeIdeal4,
        valoresDht11TemperaturaIdeal4,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    );
    servidor(
        valoresDht11Umidade,
        valoresDht11Temperatura,
        valoresDht11UmidadeIdeal,
        valoresDht11TemperaturaIdeal,
        valoresDht11UmidadeIdeal1,
        valoresDht11TemperaturaIdeal1,
        valoresDht11UmidadeIdeal2,
        valoresDht11TemperaturaIdeal2,
        valoresDht11UmidadeIdeal3,
        valoresDht11TemperaturaIdeal3,
        valoresDht11UmidadeIdeal4,
        valoresDht11TemperaturaIdeal4,
        // valoresLuminosidade,
        // valoresLm35Temperatura,
        // valoresChave
    );
})();
