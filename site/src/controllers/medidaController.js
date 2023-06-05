var medidaModel = require("../models/medidaModel");

function buscarUltimasMedidas(req, res) {

    const limite_linhas = 7;

    var idLocal = req.params.idLocal;

    console.log(`Recuperando as ultimas ${limite_linhas} medidas`);

    medidaModel.buscarUltimasMedidas(idLocal, limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarMedidasEmTempoReal(req, res) {

    var idLocal = req.params.idLocal;

    console.log(`Recuperando medidas em tempo real`);

    medidaModel.buscarMedidasEmTempoReal(idLocal).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarKPI(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    }

    medidaModel.buscarKPI(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function recuperarLocaisSensores(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    }

    medidaModel.recuperarLocaisSensores(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function recuperarUltimosDias(req, res) {
    var fkEmpresa = req.body.fkEmpresaServer;
    var intervalo = req.body.intervaloServer;

    if (fkEmpresa == undefined) {
        res.status(400).send("fkEmpresa está undefined!");
    } else if (intervalo == undefined) {
        res.status(400).send("intervalo está undefined!");
    }

    medidaModel.recuperarUltimosDias(fkEmpresa, intervalo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

// function recuperarSensores(req, res) {
//     var fkLocalSensor = req.body.fkLocalSensorServer;

//     if (fkLocalSensor == undefined) {
//         res.status(400).send("fkLocalSensor está undefined!");
//     }

//     medidaModel.recuperarSensores(fkLocalSensor)
//         .then(
//             function (resultado) {
//                 res.json(resultado);
//             }
//         ).catch(
//             function (erro) {
//                 console.log(erro);
//                 console.log(
//                     "\nHouve um erro ao realizar o cadastro! Erro: ",
//                     erro.sqlMessage
//                 );
//                 res.status(500).json(erro.sqlMessage);
//             }
//         )
// }

module.exports = {
    // recuperarSensores,
    recuperarUltimosDias,
    recuperarLocaisSensores,
    buscarKPI,
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal

}