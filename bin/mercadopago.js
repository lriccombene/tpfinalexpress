const mp = require('mercadopago');

mp.configure({
    sandbox : 'true', 
    access_token : ''
})

async function comprar(preference) {
    try {
        return await mp.preferences.create(preference);
    } catch(error) {
        throw error;
    }
}

module.exports = {comprar}