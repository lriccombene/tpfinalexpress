var express = require('express');
var router = express.Router();

var categoriesController = require("../controllers/categoriesController")

/* GET users listing. */
router.get('/', categoriesController.getAll);
router.get('/', categoriesController.getById);
router.post('/', categoriesController.create);

//:id es el parametro
router.put('/:id', categoriesController.update);
router.delete('/:id',categoriesController.delete);
module.exports = router;
