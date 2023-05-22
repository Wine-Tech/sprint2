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
        instrucaoSql = `select 
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

function buscarTempMax() {
    console.log("ACESSEI O MEDIDA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarTempMax(): ")
    var instrucao = `
        SELECT max(temperatura) from dadoSensor where current_date() where ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    buscarTempMax,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
