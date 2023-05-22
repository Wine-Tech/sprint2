var database = require("../database/config")
// ESSE AQUI TÁ SENDO UTILIZADO PELA TABELA DA EMPRESA!!!!!!!!!!!!!!
function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM empresa;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarEmpresa() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarEmpresa(): ")
    var instrucao = `
        SELECT * FROM empresa ORDER BY id DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(empresa, cnpj, telefone, dominio, codigo, cep, rua, numRua, complemento, bairro, cidade, estado) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", empresa, cnpj, telefone, dominio, codigo, cep, rua, numRua, complemento, bairro, cidade, estado);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO empresa (razaoSocial, cnpj, telefone, dominio, cod_acesso, cep, rua, numero, complemento, bairro, cidade, uf) VALUES ('${empresa}', '${cnpj}', '${telefone}', '${dominio}', '${codigo}', '${cep}', '${rua}', '${numRua}', '${complemento}', '${bairro}', '${cidade}', '${estado}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarUsuario(nomeCompleto, email, senha, codAcesso) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeCompleto,email,senha, codAcesso);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO usuario (nomeCompleto, email, senha, fkEmpresa) VALUES ('${nomeCompleto}', '${email}', '${senha}', '${codAcesso}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function cadastrarLocal(nomeLocal, descricao, tamanho, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nomeLocal,descricao,tamanho,idEmpresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO localSensor (nome, descricao, tamanho, fkEmpresa) VALUES ('${nomeLocal}', '${descricao}', '${tamanho}','${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function validarEmpresa(codAcesso) {
    console.log("ACESSEI O VALIDAR EMPRESA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", codAcesso);
    
    var instrucao = `
        SELECT * FROM empresa WHERE cod_acesso = '${codAcesso}'
    `
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    validarEmpresa,
    buscarEmpresa,
    cadastrarLocal,
    cadastrarUsuario,
    entrar,
    cadastrar,
    listar,
};