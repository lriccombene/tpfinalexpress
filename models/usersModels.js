const mongoose = require("../bin/mongodb");
const bcrypt = require("bcrypt")
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,"El campo name es obligatorio"],
        minlength:1,
        maxlength:100
    },
    email:{
        type:String,
        required:[true,"El campo name es obligatorio"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"El campo name es obligatorio"]
    }
})
userSchema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,10)
    next();
})
userSchema.path("email").validate(function(value){
    const emailValidate = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
    if (!emailValidate) return false;
},"El email ingresado no es valido")
userSchema.path("password").validate(function(value){
    const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/;
    return regex.test(value);
},"El password debe contener al menos 1 numero, 1 minuscula, 1 mayuscula y 6 caracteres")
module.exports = mongoose.model("usuarioswebs", userSchema)