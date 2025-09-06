const { MongoClient } = require('mongodb');
require('dotenv').config();

async function addSampleData() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI not set in environment.');
    process.exit(1);
  }

  const client = new MongoClient(uri, { useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const dbName = (new URL(uri.replace('mongodb+srv://', 'http://'))).pathname.replace('/', '') || 'contacts';
    const db = client.db(dbName || 'contacts');

    const sampleContacts = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        favoriteColor: 'Blue',
        birthday: new Date('1990-05-15')
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        favoriteColor: 'Red',
        birthday: new Date('1985-08-22')
      },
      {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@email.com',
        favoriteColor: 'Green',
        birthday: new Date('1992-12-10')
      }
    ];

    await db.collection('contacts').insertMany(sampleContacts);
    console.log('Sample data inserted successfully');

    const count = await db.collection('contacts').countDocuments();
    console.log(`Total contacts in database: ${count}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

addSampleData();
