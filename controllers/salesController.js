const salesModel = require('../models/salesModels')

module.exports={
    getAll:async (req, res, next)=> {

        const sales = await  salesModel.find({}).populate('users')
        res.json(sales);

    },
    getById:async (req,res,next) =>{
        console.log(req.params.id);
        const sale = await salesModel.findById(req.params.id);
        res.json(sale);
    },
    create:function (req,res,next){
        console.log(req.body);
        res.json(req.body);

    },
    update:function (req, res, next){
        console.log(req.params.id, req.body);
        const sale =  salesModel.update({_id:req.params.id},req.body,{multi:false});

        res.json(sale);
    },
    delete:async (req, res, next)=> {
        console.log(req.params.id);
        const sale = await salesModel.deleteOne({_id:req.params.id});
        res.json({});
    }

}
