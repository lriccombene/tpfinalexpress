var ventasModel = require("../models/ventasModel")
var productosModel = require("../models/productsModels")
var mp = require('../bin/mercadopago');
require('dotenv').config() //Incluir para el env

const getMerchantOrdenDebug = (ipnDocument) => {
    return {
      body: {
        external_reference: ipnDocument.externalId,
        total_amount: 1,
      },
    };
  };
const getPaymentMercadoPago = async (ipnDocument) => {
    console.log(process.env.MERCADOPAGO_ipnDebug);
    if (process.env.MERCADOPAGO_ipnDebug=="true") {
      const merchantOrder = getMerchantOrdenDebug(ipnDocument);
      return { merchantOrder, status: "approved", paidAmount: 1 };
    }
    let merchantOrder;
    switch (ipnDocument.topic) {
      case "payment": {
        const payment = await mercadopago.payment.get(ipnDocument.externalId);
        merchantOrder = await mercadopago.merchant_orders.get(parseInt(payment.body.order.id));
        break;
      }
      case "merchant_order": {
        merchantOrder = await mercadopago.merchant_orders.get(ipnDocument.externalId);
        break;
      }
    }
    const payments = merchantOrder.body.payments;
    let paidAmount = 0;
    let approved = false;
    let rejected = false;
    let cancelled = false;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payments.forEach((element) => {
      if (element["status"] == "approved") {
        approved = true;
        paidAmount += element["transaction_amount"];
      }
      if (element["status"] == "rejected") {
        rejected = true;
      }
      if (element["status"] == "cancelled") {
        cancelled = true;
      }
    });
    let status = "";
    if (approved) {
      status = "approved";
    } else if (rejected) {
      status = "rejected";
    } else {
      status = "cancelled";
    }
    return { merchantOrder, status, paidAmount };
  };
module.exports = {
    
    
    ipn: async function(req, res, next) {
        try{
            const document = {
                externalId: req.query.id,
                topic: req.query.topic,
              };
            const { merchantOrder, status, paidAmount } = await getPaymentMercadoPago(document);
            if (paidAmount >= merchantOrder.body.total_amount) {
                const venta = await ventasModel.findById(document.externalId)
                venta.payment.status=status
                await venta.save();
                res.status(200).send("OK")
            }
        }catch(e){
            console.log(e)
        }
        
    }
}