var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/", function (req, res) {
    sensorController.testar(req, res);
});

router.get("/listar", function (req, res) {
    sensorController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    sensorController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    sensorController.entrar(req, res);
});

module.exports = router;