var usuarioModel = require("../models/usuarioModel");
// ESSE AQUI TÁ SENDO UTILIZADO PELA TABELA DA EMPRESA!!!!!!!!!!!!!!
var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    usuarioModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function buscarEmpresa(req, res) {
    usuarioModel.buscarEmpresa()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        
        usuarioModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var empresa = req.body.empresaServer;
    var cnpj = req.body.cnpjServer;
    var telefone = req.body.telefoneServer;
    var dominio = req.body.dominioServer;
    var codigo = req.body.codigoServer;
    var cep = req.body.cepServer
    var rua = req.body.ruaServer;
    var numRua = req.body.numRuaServer;
    var complemento = req.body.complementoServer;
    var bairro = req.body.bairroServer;
    var cidade = req.body.cidadeServer;
    var estado = req.body.estadoServer;

    // Faça as validações dos valores
    if (empresa == undefined) {
        res.status(400).send("empresa está undefined!");
    } else if (cnpj == undefined) {
        res.status(400).send("cnpj está undefined!");
    } else if (telefone == undefined) {
        res.status(400).send("telefone está undefined!");
    } else if (dominio == undefined) {
        res.status(400).send("dominio está undefined!");
    }else if (codigo == undefined) {
        res.status(400).send("codigo está undefined!");
    }else if (cep == undefined) {
        res.status(400).send("cep está undefined!");
    }else if (rua == undefined) {
        res.status(400).send("rua está undefined!");
    }else if (numRua == undefined) {
        res.status(400).send("numRua está undefined!");
    }else if (complemento == undefined) {
        res.status(400).send("complemento está undefined!");
    }else if (bairro == undefined) {
        res.status(400).send("bairro está undefined!");
    }else if (cidade == undefined) {
        res.status(400).send("cidade está undefined!");
    }else if (estado == undefined) {
        res.status(400).send("estado está undefined!");
    }
        
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(empresa, cnpj, telefone, dominio, codigo, cep, rua, numRua, complemento, bairro, cidade, estado)
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
            );
    }

    function cadastrarUsuario(req, res) {
        // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    
        var nomeCompleto = req.body.nomeCompletoServer;
        var email = req.body.emailServer;
        var senha = req.body.senhaServer;
        var codAcesso = req.body.codAcessoServer;
    
        // Faça as validações dos valores
        if (nomeCompleto == undefined) {
            res.status(400).send("nomeCompleto está undefined!");
        } else if (email == undefined) {
            res.status(400).send("email está undefined!");
        } else if (senha == undefined) {
            res.status(400).send("senha está undefined!");
        } else if (codAcesso == undefined) {
            res.status(400).send("codAcesso está undefined!");
        }
            
            // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
            usuarioModel.cadastrarUsuario(nomeCompleto, email, senha, codAcesso)
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
                );
        }
    
        function cadastrarLocal(req, res) {
            // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
        
            var nomeLocal = req.body.nomeLocalServer;
            var descricao = req.body.descricaoServer;
            var tamanho = req.body.tamanhoServer;
            var idEmpresa = req.body.idEmpresaServer;
        
            // Faça as validações dos valores
            if (nomeLocal == undefined) {
                res.status(400).send("nomeLocal está undefined!");
            } else if (descricao == undefined) {
                res.status(400).send("descricao está undefined!");
            } else if (tamanho == undefined) {
                res.status(400).send("tamanho está undefined!");
            } else if (idEmpresa == undefined) {
                res.status(400).send("idempresa está undefined!")
            }
                
                // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
                usuarioModel.cadastrarLocal(nomeLocal, descricao, tamanho, idEmpresa)
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
                    );
            }
        
        function validarEmpresa(req, res) {
            var codAcesso = req.body.codAcessoServer;

            if (codAcesso == undefined) {
                res.status(400).send("codAcesso está undefined!");
            }

            usuarioModel.validarEmpresa(codAcesso)
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


module.exports = {
    validarEmpresa,
    buscarEmpresa,
    cadastrarLocal,
    cadastrarUsuario,
    entrar,
    cadastrar,
    listar,
    testar
}