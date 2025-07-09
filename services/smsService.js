const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE_SMS } = process.env;

const client = twilio(TWILIO_SID, TWILIO_AUTH);

if (!TWILIO_SID || !TWILIO_AUTH) {
  throw new Error('Twilio credentials are missing from .env');
}

const formatOrderDetails = (order) => {
    const {
        _id,
        quantity,
        product,
        customization,
        contact
    } = order;

    return `
Order Confirmed ✅ - #${_id}
Product: ${product.name}
Qty: ${quantity}
Name: ${customization?.nameOnShirt || 'N/A'}
Number: ${customization?.number || 'N/A'}
Color: ${customization?.colorChoice || 'N/A'}
Contact: ${contact.phone}
Status: ${order.status}
– Jersey Shop
`;
};

const sendSMS = async (order) => {
    const message = formatOrderDetails(order);
    await client.messages.create({
        body: message,
        from: TWILIO_PHONE_SMS,
        to: order.contact.phone
    });
};

module.exports = { sendSMS };