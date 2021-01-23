const productsModel = require("../models/productsModels");
const categoriesModel = require("../models/categoriesModels");
module.exports = {
    getAll: async (req, res, next) => {
        try{
            console.log(req.query)
            const productos = await productsModel.find({}).populate("category").sort({name:1});
            res.status(200).json(productos);
        }catch (e){
            next(e);
        }
    },
    getById: async  (req, res, next) => {
        try {
            console.log(req.params.id);
            const producto = await productsModel.findById(req.params.id);
            res.status(200).json(producto);
        }catch (e){
            next(e);
        }
    },
    create: async  (req, res, next)=> {
        console.log(req.body);
        const category = await categoriesModel.findById(req.body.category)
        if(!category){
            res.json({error:true,message:'not exists category'})
        }
        try{
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
             const result = await product.save();
            res.status(201).json(result);
        }catch (e){
            next(e);
        }

    },
    update: async  (req, res, next) => {
     try{
        console.log(req.params.id, req.body);
        const producto = await productsModel.update({ _id: req.params.id }, req.body, { multi: false })
        res.json(producto);
    }catch (e){
        next(e);
    }
    },
    delete: async (req, res, next) => {
        try{
            console.log(req.params.id);

            const data = await productsModel.deleteOne({ _id: req.params.id });
            res.json(data);
        }catch (e){
            next(e);
        }
    }
}