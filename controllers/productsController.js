const productsModel = require("../models/productsModels");
module.exports = {
    getAll: async (req, res, next) => {
        console.log(req.query)
        const productos = await productsModel.find({}).populate("category");
        res.json(productos);
    },
    getById: async function (req, res, next) {
        console.log(req.params.id);
        const producto = await productsModel.findById(req.params.id);
        res.json(producto);
    },
    create: function (req, res, next) {
        console.log(req.body);
        const product = new productsModel({
            name: req.body.name,
            sku: req.body.sku,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            tags:req.body.tags,
           // created: req.body.tokenData
        })
        //console.log(req.body.tags)
        product.save();
        res.json(product);
    },
    update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        const producto = await productsModel.update({ _id: req.params.id }, req.body, { multi: false })
        res.json(producto);
    },
    delete: async function (req, res, next) {
        console.log(req.params.id);
        const data = await productsModel.deleteOne({ _id: req.params.id });
        res.json(data);
    }
}