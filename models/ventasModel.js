const mongoose = require('../bin/mongodb')
const Schema = mongoose.Schema;

var productSchema = new Schema({ 
    product_id: {type:Schema.ObjectId, ref:"products"},
    name:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type:Number,
        required: true
    }
 });

const paymentSchema = new mongoose.Schema({
    amount: {
      type: Number,
      required: [true, "Campo obligatorio"],
      trim: true,
    },
    method: {
      type: String,
      enum: ["mercadopago","efectivo"],
      required: [true, "Campo obligatorio"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["generate", "pending", "inProcess", "approved", "cancelled", "rejected"],
      required: [true, "Campo obligatorio"],
      trim: true,
    },
    preferenceId: {
      type: String,
    },
  });

const MainSchema = new Schema({
    products:[productSchema],
    payment:paymentSchema,
    date:{
        type:Date,
        required: true,
        default: Date.now 
    },
    total:{
        type:Number,
        required: true
    },
    user:{type:Schema.ObjectId,ref:"usuarios"}
})

module.exports = mongoose.model('ventas',MainSchema)



