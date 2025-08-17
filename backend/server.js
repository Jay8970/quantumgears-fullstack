const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');  // <-- import path module

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // your frontend origin
  credentials: true,
}));

app.use(express.json());

// Serve static assets (images) from 'public/assets' folder
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// DB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(' MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Health check route
app.get('/', (req, res) => {
  res.send('QuantumGears Backend API is running');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/analytics', require('./routes/analytics'));


// Error Handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
