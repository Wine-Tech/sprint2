var database = require("../database/config");

function buscarUltimasMedidas(idLocal, limite_linhas) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top ${limite_linhas}
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        momento,
                        FORMAT(momento, 'HH:mm:ss') as momento_grafico
                    from medida
                    where fk_aquario = ${idLocal}
                    order by id desc`;
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select id, fkSensor,
        temperatura as temperatura, 
        umidade as umidade,
                        dtRegistro,
                        DATE_FORMAT(dtRegistro,'%H:%i:%s') as momento_grafico
                    from dadosensor
                    where fkSensor = ${idLocal}
                    order by id desc limit ${limite_linhas}`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(idLocal) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select top 1
        dht11_temperatura as temperatura, 
        dht11_umidade as umidade,  
                        CONVERT(varchar, momento, 108) as momento_grafico, 
                        fk_aquario 
                        from medida where fk_aquario = ${idLocal} 
                    order by id desc`;

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select 
        temperatura as temperatura, 
        umidade as umidade,
                        DATE_FORMAT(dtRegistro,'%H:%i:%s') as momento_grafico, 
                        fkSensor
                        from dadoSensor where fkSensor = ${idLocal} 
                    order by id desc limit 1`;
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarKPI(fkSensor) {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarKPI(): ")
    var instrucaoSql = `
    select max(temperatura) as tempMax, min(temperatura) as tempMin, max(umidade) as umidMax, min(umidade) as umidMin
	from dadosensor
		where date(dtRegistro) = date(now()) and fkSensor = ${fkSensor}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperarLocaisSensores(fkEmpresa) {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarLocais(): ")
    var instrucaoSql = `
    select sensor.id idSensor, localSensor.nome, localSensor.id idLocalSensor from sensor
	join localSensor on fkLocalSensor = localSensor.id
		where fkEmpresa = ${fkEmpresa};
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperarSensores(fkLocalSensor) {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function recuperarSensores(): ")
    var instrucaoSql = `
    select * from sensor where fkLocalSensor = ${fkLocalSensor}
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    // recuperarSensores,
    recuperarLocaisSensores,
    buscarKPI,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
