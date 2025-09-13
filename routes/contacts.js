const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Get all contacts
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const contacts = await db.collection('contacts').find().toArray();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new contact
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Check if all fields are provided
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const result = await db.collection('contacts').insertOne({
      firstName,
      lastName,
      email,
      favoriteColor,
      birthday
    });

    res.status(201).json({ id: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update contact
router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const updateFields = { firstName, lastName, email, favoriteColor, birthday };

    const result = await db.collection('contacts').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete contact
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const id = req.params.id;
    if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });

    const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
