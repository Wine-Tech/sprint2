var express = require("express");
var router = express.Router();
// ESSE AQUI TÁ SENDO UTILIZADO PELA TABELA DA EMPRESA!!!!!!!!!!!!!!
var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/buscarEmpresa", function (req, res) {
    usuarioController.buscarEmpresa(req, res);
})

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/cadastrarUsuario", function (req, res) {
    usuarioController.cadastrarUsuario(req, res);
})

router.post("/cadastrarLocal", function (req, res) {
    usuarioController.cadastrarLocal(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.post("/validarEmpresa", function (req, res) {
    usuarioController.validarEmpresa(req, res);
});

module.exports = router;