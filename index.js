const express = require('express');
const app = express();
const productRoutes = require('./src/routes/product.route');
const authRoutes = require('./src/routes/auth.route');
const errorHandler = require('./src/middlewares/error.middleware');
const Product = require('./src/models/product.model');

require('dotenv').config();

app.use(express.json());

// Initialize database tables
(async () => {
  try {
    await Product.createTable();
    console.log('Database tables initialized');
  } catch (error) {
    console.error('Error initializing database tables:', error);
    process.exit(1);
  }
})();

// Routes
app.use('/api/products', productRoutes);
app.use('/api/register', authRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});