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

    // Some test contacts
    const sampleContacts = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        favoriteColor: 'Blue',
        birthday: '1990-05-15'
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@email.com',
        favoriteColor: 'Red',
        birthday: '1985-08-22'
      },
      {
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob.johnson@email.com',
        favoriteColor: 'Green',
        birthday: '1992-12-10'
      },
      {
        firstName: 'Alice',
        lastName: 'Williams',
        email: 'alice.williams@email.com',
        favoriteColor: 'Purple',
        birthday: '1988-03-18'
      },
      {
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie.brown@email.com',
        favoriteColor: 'Orange',
        birthday: '1995-07-04'
      },
      {
        firstName: 'Diana',
        lastName: 'Davis',
        email: 'diana.davis@email.com',
        favoriteColor: 'Pink',
        birthday: '1991-11-30'
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
