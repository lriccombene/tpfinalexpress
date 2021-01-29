var ventasModel = require("../models/ventasModel")
var productosModel = require("../models/productsModels")
var mp = require('../bin/mercadopago');
module.exports = {
    getAll: async function(req, res, next) {
        let productos = await productosModel.find({})
        await categoriesModel.populate(productos,{path:'category'})
        console.log(productos)
        res.status(200).json(productos)
      },
    
    create: async function(req, res, next) {
        try{
            console.log(req.body.tokenData)
            let productos = await productosModel.find({})
            .select(['_id','name','price'])
            .where('_id').in(req.body.products)

            console.log(productos)

            let total=0;
            let records = productos.map(product=>{
                total+=product['price']
                return({
                    product_id:product["_id"],
                    name:product['name'],
                    price:product['price'],
                    price:product['price']
                })
            })

            console.log("records",records)

            let ventas = new ventasModel({
                user:req.body.tokenData.userId,
                total: total,
                products:records,
                payment: {
                    amount: total,
                    method: "mercadopago",
                    status: "generate"
                }
            })
            let data = await ventas.save();
            console.log("data",data)
            let preference = {
                items : [
                    {
                        id : data["_id"],
                        title : 'Compra Carrito',
                        quantity : 1,
                        currency_id : 'ARS',
                        unit_price : data["total"]
                    }
                ],
                external_reference:data._id.toString(),
                payer : {
                    email : 'leangilutn@gmail.com',
                    name:"Leandro"
                },
                notification_url : 'http://miurl.com/'
            }
            let mercadopagoResponse = await mp.comprar(preference);
            ventas.payment.status = "pending";
            ventas.payment.preferenceId = mercadopagoResponse.body.id;
            await ventas.save();
            res.status(201).json({"stauts":"ok","data":data,"mp":mercadopagoResponse,"init_point":mercadopagoResponse.mp.body.init_point})
        }catch(e){
            console.log(e)
        }
        
    }
}