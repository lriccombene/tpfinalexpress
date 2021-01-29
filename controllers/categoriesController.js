const categoriesModel = require("../models/categoriesModel");
module.exports = {
    getAll: async (req, res, next) => {
        console.log(req.query)
        const categories = await categoriesModel.find({});
        res.json(categories);
    },

    getById:async (req,res,next) =>{
        try {console.log(req.params.id)
            const category = await  categoriesModel.findById(req.params.id)
            res.status(200).json(category)
        }catch (e){
            next(e);
        }
    },
    create: function (req, res, next) {
        console.log(req.body);
        const category = new categoriesModel({
            name: req.body.name
        })
        category.save();
        res.json(category);
    },
    update:async (req, res, next) =>{
        try{console.log(req.params.id, req.body);
            const category = await categoriesModel.update({_id:req.params.id},req.body,{multi:false});

            res.json(category);
        }catch (e){
            next(e);
        }
    },
    delete:async(req, res, next) => {
        try{console.log(req.params.id);
            const category = await categoriesModel.deleteOne({_id:req.params.id})
            res.json({});
        }catch (e){
            next(e);
        }
    }
}