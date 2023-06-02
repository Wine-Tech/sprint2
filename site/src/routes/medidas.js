var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/ultimas/:idLocal", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/tempo-real/:idLocal", function (req, res) {
    medidaController.buscarMedidasEmTempoReal(req, res);
})

router.post("/buscarKPI", function (req, res) {
    medidaController.buscarKPI(req, res);
})

router.post("/recuperarLocaisSensores", function (req, res) {
    medidaController.recuperarLocaisSensores(req, res);
})

// router.post("/recuperarSensores", function (req, res) {
//     medidaController.recuperarSensores(req, res);
// })

module.exports = router;