const categoriesModel = require('../models/categoriesModels')


module.exports={
    getAll:async (req, res, next) => {
        const categories = await categoriesModel.find({});
        res.json(categories);
    },
    getById:async (req,res,next) =>{
        console.log(req.params.id)
        const category = await  categoriesModel.findById(req.params.id)
        res.json(category)
    },
    create:function (req,res,next){
        console.log(req.body);
        const category = new categoriesModel({
            name:req.body.name,
        });
        category.save();

        res.json(category);

    },
    update:async (req, res, next) =>{
        console.log(req.params.id, req.body);
        const category = await categoriesModel.update({_id:req.params.id},req.body,{multi:false});

        res.json(category);
    },
    delete:async(req, res, next) => {
        console.log(req.params.id);
        const category = await categoriesModel.deleteOne({_id:req.params.id})
        res.json({});
    }

}
