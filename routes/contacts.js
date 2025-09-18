const express = require('express');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// Get all contacts
router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find().lean();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

// Get contact by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const contact = await Contact.findById(id).lean();
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

// Create new contact
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const contact = new Contact({ firstName, lastName, email, favoriteColor, birthday });
    await contact.save();
    res.status(201).json({ id: contact._id });
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(error);
  }
});

// Update contact (replace fields)
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    const update = { firstName, lastName, email, favoriteColor, birthday };

    const updated = await Contact.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
      overwrite: false
    });

    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(error);
  }
});

// Partial update
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });

    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(error);
  }
});

// Delete contact
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!isValidObjectId(id)) return res.status(400).json({ message: 'Invalid id' });
    const result = await Contact.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: 'Contact not found' });
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
