const mongoose = require('mongoose');
require('dotenv').config();

const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  favoriteColor: { type: String, required: true },
  birthday: { type: Date, required: true }
});

const Contact = mongoose.model('Contact', contactSchema);

async function addSampleData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

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

    await Contact.insertMany(sampleContacts);
    console.log('Sample data inserted successfully');

    const count = await Contact.countDocuments();
    console.log(`Total contacts in database: ${count}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

addSampleData();
