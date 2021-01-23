const categoriesModel = require('../models/categoriesModels')


module.exports={
    getAll:async (req, res, next) => {
       try{ const categories = await categoriesModel.find({});
        res.status(200).json(categories);
       }catch (e){
           next(e);
       }
    },
    getById:async (req,res,next) =>{
        try {console.log(req.params.id)
        const category = await  categoriesModel.findById(req.params.id)
        res.status(200).json(category)
        }catch (e){
            next(e);
        }
    },
    create:async (req,res,next) =>{
        console.log(req.body);
        try{
            const category = new categoriesModel({
                name:req.body.name,
            });
            const result = await category.save();

            res.status(201).json(result);
        }catch (e){
            res.json({message: e.message})
        }
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
