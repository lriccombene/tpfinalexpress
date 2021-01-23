const userAdminModel = require("../models/usersAdminModels");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
module.exports = {
    validate: async (req, res, next) => {
        console.log(req.query)
        const userAdmin = await userAdminModel.findOne({user:req.body.user});
        console.log(userAdmin)
        if(userAdmin){
            if(bcrypt.compareSync(req.body.password,userAdmin.password)){
               // console.log(req.app.get('secretkey'))
                const token = jsonwebtoken.sign({userId:userAdmin._id},req.app.get('secretkey'));

                res.json({message:'usuario okey', token:token});
            }else{
                res.json({message:'pass error'})
            }

        }else {
            res.json({message: 'no exite el usu'})

        }
        res.json(userAdmin);
    },
    create: async (req, res, next) => {
        console.log(req.body);
        try{
            const userAdmin = new userAdminModel({
                name: req.body.name,
                user: req.body.user,
                password: req.body.password,
            })
            //console.log(req.body.tags)
            const result = await userAdmin.save();
            res.status(201).json(result);
        }catch (e){
            next(e);
        }
    },
    getById: async  (req, res, next) => {
        try{
            console.log(req.params.id);
            const userAdmin = await userAdminModel.findById(req.params.id);
            res.status(200).json(userAdmin);
        }catch (e){
            next(e);
        }
    },
    update: async  (req, res, next) => {
     try{
             console.log(req.params.id, req.body);
            const userAdmin = await userAdminModel.update({ _id: req.params.id }, req.body, { multi: false })
            res.json(userAdmin);
        }catch (e){
            next(e);
        }
    },
    delete: async (req, res, next) => {
        try {
            console.log(req.params.id);

            const data = await userAdminModel.deleteOne({_id: req.params.id});
            res.json(data);
        }catch (e){
            next(e);
        }
    }
}
