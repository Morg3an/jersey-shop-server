const client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_AUTH);

const sendWhatsAppMessage = async (order) => {
    return client.messages.create({
        body: `Thanks ${order.name}, your order for a ${order.product.type} has been received!`,
        from: 'whatsapp:' + process.env.TWILIO_PHONE,
        to: 'whatsapp:' + order.contact.whatsapp
    });
};

module.exports = { sendWhatsAppMessage };