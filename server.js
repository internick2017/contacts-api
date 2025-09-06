const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect with native MongoDB driver and attach db to app.locals
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

    // Routes (mounted after db is available)
    app.use('/contacts', require('./routes/contacts'));

    // Root endpoint
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
