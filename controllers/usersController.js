const usersModel = require("../models/usersModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports = {

    delete:async (req, res, next)=> {
        try {
            console.log(req.params.id);
            const sale = await usersModel.deleteOne({_id: req.params.id});
            res.json({});
        }catch(e){
            next(e);
        }
    },
    getAll:async (req, res, next)=> {
        try {
            const sales = await usersModel.find({}).populate('users')
            res.json(sales);
        }catch(e){
            next(e);
        }
    },
    getById:async (req,res,next) =>{
        try {console.log(req.params.id);
            const sale = await usersModel.findById(req.params.id);
            res.json(sale);
        }catch(e){
            next(e);
        }
    },
    update: async (req, res, next) =>{
        try {console.log(req.params.id, req.body);
            const sale = await usersModel.update({_id:req.params.id},req.body,{multi:false});
             res.json(sale);
        }catch(e){
            next(e);
        }
    },
    create: async  (req, res, next) => {
        console.log(req.body);
        try {
            const user = new usersModel({
                name: req.body.name,
                email:req.body.email,
                password:req.body.password
            })
            const usr = await user.save();
            res.json(usr)
        } catch (e) {
            next(e)
        }
    },
    login: async  (req, res, next) =>{
        try {
            const user = await usersModel.findOne({email:req.body.email})
            if(user){
                if(bcrypt.compareSync(req.body.password,user.password)){
                    const token = jwt.sign({userId:user._id},req.app.get("secretKey"));
                    res.json({token:token})
                }else{
                    res.json({error:"El password es incorrecto"})
                }
            }else{
                res.json({error:"el email no esta registrador"})
            }
        } catch (e) {
            next(e)
        }
    }
}