const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB and start server
async function start() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set. Exiting.');
    process.exit(1);
  }

  try {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const dbName = (new URL(uri.replace('mongodb+srv://', 'http://'))).pathname.replace('/', '') || 'contacts';
    const db = client.db(dbName || 'contacts');
    app.locals.db = db;
    console.log('Connected to MongoDB (native driver)');

    // Swagger docs
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // My routes
    app.use('/contacts', require('./routes/contacts'));

    // Main route
    app.get('/', (req, res) => {
      res.json({
        message: 'CSE 341 Contacts API',
        version: '1.0.0'
      });
    });

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

start();

module.exports = app;
