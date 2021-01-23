const mongoose = require("../bin/mongodb");
const productsaleSchema= new mongoose.Schema({
    name:{
        type:String,
        required: [true,'El campo name es obligatorio']
    },
    amount: {
        type:Number,
        min:1,
        required:[true,'El campo amount es obligatorio']
    },
})


const salesSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'users',
        required:[true,'El campo user es obligatorio']

    },
    amount: {
        type:Number,
        min:1,
        required:[true,'El campo amount es obligatorio']
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