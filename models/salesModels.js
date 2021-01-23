const mongoose = require("../bin/mongodb");
const productsaleSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    amount: {
        type:Number,
        min:1,
        required:true
    },
})


const salesSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'users',
        required:true,
        type:String
    },
    amount: {
        type:Number,
        min:1,
        required:true
    },
    paymentstatus: {
        type: String,
        enum: ["pendiente de pago", "pago"]
    },
    productsale: productsaleSchema,
    date:Date,
    createdAt:Date,
    updateAt: Date
});
module.exports = mongoose.model("sales", salesSchema)