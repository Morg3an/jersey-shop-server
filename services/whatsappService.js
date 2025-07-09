const twilio = require('twilio');
const { TWILIO_SID, TWILIO_AUTH, TWILIO_PHONE_WHATSAPP } = process.env;

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
🟢 Hello Customer! Your order has been received.

🛍️ Product: ${product.name}
🔢 Qty: ${quantity}
✏️ Name: ${customization?.nameOnShirt || 'N/A'}
🏷️ Number: ${customization?.number || 'N/A'}
🎨 Color: ${customization?.colorChoice || 'N/A'}

📞 Phone: ${contact.whatsapp}
📦 Status: ${order.status}

🙏 Thank you for shopping with Jersey Shop!
`;
};

const sendWhatsAppMessage = async (order) => {
    const message = formatOrderDetails(order);
    await client.messages.create({
        body: message,
        from: `whatsapp:${TWILIO_PHONE_WHATSAPP}`,
        to: `whatsapp:${order.contact.whatsapp}`
    });
};

module.exports = { sendWhatsAppMessage };