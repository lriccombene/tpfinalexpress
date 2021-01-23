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
    create: function (req, res, next) {
        console.log(req.body);
        const userAdmin = new userAdminModel({
            name: req.body.name,
            user: req.body.user,
            password: req.body.password,
        })
        //console.log(req.body.tags)
        userAdmin.save();
        res.json(userAdmin);
    },
    getById: async function (req, res, next) {
        console.log(req.params.id);
        const userAdmin = await userAdminModel.findById(req.params.id);
        res.json(userAdmin);
    },
    update: async function (req, res, next) {
        console.log(req.params.id, req.body);
        const userAdmin = await userAdminModel.update({ _id: req.params.id }, req.body, { multi: false })
        res.json(userAdmin);
    },
    delete: async function (req, res, next) {
        console.log(req.params.id);
        const data = await userAdminModel.deleteOne({ _id: req.params.id });
        res.json(data);
    }
}
