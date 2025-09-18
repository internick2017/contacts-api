const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/contacts', require('./routes/contacts'));

// Main route
app.get('/', (req, res) => {
  res.json({ message: 'CSE 341 Contacts API', version: '1.0.0' });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Centralized error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Validation failed', details });
  }
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({ message: 'Invalid id format' });
  }
  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
});

async function start() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Exiting.');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { dbName: process.env.DB_NAME || undefined });
    console.log('Connected to MongoDB (mongoose)');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

start();

module.exports = app;
