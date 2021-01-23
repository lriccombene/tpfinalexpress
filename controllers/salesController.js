const salesModel = require('../models/salesModels')

module.exports={
    getAll:async (req, res, next)=> {
        try{
            const sales = await  salesModel.find({}).populate('users')
            res.status(200).json(sales);
        }catch (e){
            next(e);
        }

    },
    getById:async (req,res,next) =>{
        try{
            console.log(req.params.id);
            const sale = await salesModel.findById(req.params.id);
            res.status(200).json(sale);
        }catch (e){
            next(e);
        }
    },
    create:function (req,res,next){
        console.log(req.body);
        try{
            a=1;
        }catch (e){
            next(e)
        }
        res.status(201).json(req.body);

    },
    update:async (req, res, next) =>{
        try{
            console.log(req.params.id, req.body);
            const sale = await salesModel.update({_id:req.params.id},req.body,{multi:false});
            res.json(sale);
        }catch (e){
            next(e);
        }
    },
    delete:async (req, res, next)=> {
        try{
            console.log(req.params.id);
            const sale = await salesModel.deleteOne({_id:req.params.id});
            res.json({});
        }catch (e){
            next(e);
        }
    }

}
