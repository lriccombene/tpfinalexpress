var express = require('express');
var router = express.Router();

var salesController = require('../controllers/salesController')


/* GET users listing. */
router.get('/',salesController.getAll);
router.get('/',salesController.getById);

router.post('/', salesController.create);

//:id es el parametro
router.put('/:id', salesController.update);
router.delete('/:id', salesController.delete);


module.exports =router;