require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const orderRoutes = require('./routes/orderRoutes');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));