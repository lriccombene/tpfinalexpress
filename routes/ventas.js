var express = require('express');
var router = express.Router();

var ventasController = require("../controllers/ventasController")

/* GET home page. */
router.get('/', ventasController.getAll);
router.post('/', ventasController.create);

module.exports = router;
