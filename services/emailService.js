const axios = require('axios');
const { RESEND_API_KEY, RESEND_FROM_EMAIL } = process.env;

const formatOrderDetails = (order) => {
    const {
        _id,
        quantity,
        product,
        customization,
        contact,
        status,
    } = order;

    return `
🛒 Order #${_id}
Product: ${product?.name || 'Unknown'}
Qty: ${quantity}
Name on Shirt: ${customization?.nameOnShirt || 'N/A'}
Number: ${customization?.number || 'N/A'}
Color: ${customization?.colorChoice || 'N/A'}

Contact:
- Email: ${contact?.email}
- Phone: ${contact?.phone}
- WhatsApp: ${contact?.whatsapp}

Status: ${status}
`;
};

const sendEmail = async (order) => {
    try {
        await axios.post(
            'https://api.resend.com/emails',
            {
                from: RESEND_FROM_EMAIL,
                to: order.contact.email,
                subject: '✅ Order Confirmation – Jersey Shop',
                text: formatOrderDetails(order),
            },
            {
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('❌ Failed to send customer email:', error.response?.data || error.message);
    }
};

/* const sendEmailToShop = async (order) => {
    try {
        await axios.post(
            'https://api.resend.com/emails',
            {
                from: RESEND_FROM_EMAIL,
                to: SHOP_EMAIL,
                subject: '🛍️ New Order Received – Jersey Shop',
                text: formatOrderDetails(order),
            },
            {
                headers: {
                    Authorization: `Bearer ${RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
    } catch (error) {
        console.error('❌ Failed to send shop email:', error.response?.data || error.message);
    }
};
*/

module.exports = {
    sendEmail
};

