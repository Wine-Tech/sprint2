var express = require("express");
var router = express.Router();

var localSensorController = require("../controllers/localSensorController");

router.get("/", function (req, res) {
    localSensorController.testar(req, res);
});

router.get("/listar", function (req, res) {
    localSensorController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    localSensorController.cadastrar(req, res);
})

// router.post("/autenticar", function (req, res) {
//     usuarioController.entrar(req, res);
// });

module.exports = router;