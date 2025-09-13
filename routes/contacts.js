const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// Get all contacts
/*
  #swagger.summary = 'Get all contacts'
  #swagger.description = 'Retrieve all contacts from the database'
  #swagger.responses[200] = {
    description: 'List of all contacts',
    schema: [{
      _id: '507f1f77bcf86cd799439011',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    }]
  }
*/
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
/*
  #swagger.summary = 'Get contact by ID'
  #swagger.description = 'Retrieve a specific contact by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Contact ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Contact found',
    schema: {
      _id: '507f1f77bcf86cd799439011',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    }
  }
  #swagger.responses[404] = {
    description: 'Contact not found'
  }
*/
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
/*
  #swagger.summary = 'Create a new contact'
  #swagger.description = 'Add a new contact to the database'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Contact data',
    required: true,
    schema: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    }
  }
  #swagger.responses[201] = {
    description: 'Contact created successfully',
    schema: {
      id: '507f1f77bcf86cd799439011'
    }
  }
  #swagger.responses[400] = {
    description: 'Missing required fields'
  }
*/
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
/*
  #swagger.summary = 'Update contact by ID'
  #swagger.description = 'Update an existing contact by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Contact ID',
    required: true,
    type: 'string'
  }
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Updated contact data',
    required: true,
    schema: {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      favoriteColor: 'Red',
      birthday: '1992-02-02'
    }
  }
  #swagger.responses[200] = {
    description: 'Contact updated successfully'
  }
  #swagger.responses[404] = {
    description: 'Contact not found'
  }
*/
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
/*
  #swagger.summary = 'Delete contact by ID'
  #swagger.description = 'Delete a contact from the database by its ID'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Contact ID',
    required: true,
    type: 'string'
  }
  #swagger.responses[200] = {
    description: 'Contact deleted successfully'
  }
  #swagger.responses[404] = {
    description: 'Contact not found'
  }
*/
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
