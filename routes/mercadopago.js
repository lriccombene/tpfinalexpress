var express = require('express');
var router = express.Router();

var mercadoPagoController = require("../controllers/mercadoPagoController")

/* GET home page. */
router.post('/ipn', mercadoPagoController.ipn);

module.exports = router;
