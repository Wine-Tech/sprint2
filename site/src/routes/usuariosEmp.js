var express = require("express");
var router = express.Router();

var usuarioEmpController = require("../controllers/usuarioEmpController");

router.get("/", function (req, res) {
    usuarioEmpController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioEmpController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioEmpController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioEmpController.entrar(req, res);
});

module.exports = router;