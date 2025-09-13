'use strict';

/**
 * Contacts API — Theoretical Example (Learning Stub)
 * -------------------------------------------------
 * Purpose: Demonstrate how a typical Express + MongoDB (native driver)
 * contacts API could be structured in this codebase. This file is NOT wired
 * into the application and is safe to keep in the repo for learning only.
 *
 * Key ideas shown below:
 * - How the router would be created and exported
 * - How the database connection made in server.js can be accessed via req.app.locals.db
 * - How CRUD endpoints (GET/POST/PUT/DELETE) could be implemented
 * - Basic validation patterns and expected status codes
 *
 * NOTE: All route handlers return 501 Not Implemented on purpose. Replace the
 * commented pseudo-code with real logic only when you're ready to integrate.
 */

const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

/**
 * GET /contacts
 * List all contacts.
 *
 * Pseudo-logic:
 *   const db = req.app.locals.db;
 *   const contacts = await db.collection('contacts').find().toArray();
 *   return res.status(200).json(contacts);
 */
router.get('/', async (req, res) => {
  // Example (commented):
  // try {
  //   const db = req.app.locals.db;
  //   const contacts = await db.collection('contacts').find().toArray();
  //   return res.status(200).json(contacts);
  // } catch (err) {
  //   return res.status(500).json({ message: 'Server error', error: String(err) });
  // }
  return res.status(501).json({ message: 'Not implemented — learning stub' });
});

/**
 * GET /contacts/:id
 * Fetch a single contact by MongoDB ObjectId.
 *
 * Pseudo-logic:
 *   const { id } = req.params;
 *   if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
 *   const db = req.app.locals.db;
 *   const doc = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
 *   if (!doc) return res.status(404).json({ message: 'Not found' });
 *   return res.status(200).json(doc);
 */
router.get('/:id', async (req, res) => {
  return res.status(501).json({ message: 'Not implemented — learning stub' });
});

/**
 * POST /contacts
 * Create a new contact.
 *
 * Expected body example:
 *   {
 *     "firstName": "Ada",
 *     "lastName": "Lovelace",
 *     "email": "ada@example.com",
 *     "favoriteColor": "blue",
 *     "birthday": "1990-01-01"   // or ISO string
 *   }
 *
 * Validation pattern (simple example):
 *   - Ensure required fields exist and are strings (birthday can be Date or ISO string)
 *   - Optionally check email format
 *
 * Pseudo-logic:
 *   const body = req.body || {};
 *   // Validate body...
 *   const db = req.app.locals.db;
 *   const result = await db.collection('contacts').insertOne({ ...body, birthday: new Date(body.birthday) });
 *   return res.status(201).json({ _id: result.insertedId, ...body });
 */
router.post('/', async (req, res) => {
  return res.status(501).json({ message: 'Not implemented — learning stub' });
});

/**
 * PUT /contacts/:id
 * Replace an existing contact (idempotent). In practice, PATCH could be used for partial updates.
 *
 * Expected body: same shape as POST, full replacement (except _id which is immutable)
 *
 * Pseudo-logic:
 *   const { id } = req.params;
 *   if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
 *   const body = req.body || {};
 *   // Validate body...
 *   const db = req.app.locals.db;
 *   const result = await db.collection('contacts').replaceOne(
 *     { _id: new ObjectId(id) },
 *     { ...body, birthday: new Date(body.birthday) },
 *     { upsert: false }
 *   );
 *   if (result.matchedCount === 0) return res.status(404).json({ message: 'Not found' });
 *   return res.status(200).json({ _id: id, ...body });
 */
router.put('/:id', async (req, res) => {
  return res.status(501).json({ message: 'Not implemented — learning stub' });
});

/**
 * DELETE /contacts/:id
 * Delete a contact by id.
 *
 * Pseudo-logic:
 *   const { id } = req.params;
 *   if (!ObjectId.isValid(id)) return res.status(400).json({ message: 'Invalid id' });
 *   const db = req.app.locals.db;
 *   const result = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });
 *   if (result.deletedCount === 0) return res.status(404).json({ message: 'Not found' });
 *   return res.status(204).send();
 */
router.delete('/:id', async (req, res) => {
  return res.status(501).json({ message: 'Not implemented — learning stub' });
});

/**
 * Example of mounting this router (DO NOT add to server.js yet):
 * --------------------------------------------------------------
 * const app = express();
 * // after you connect to Mongo and set app.locals.db
 * app.use('/contacts', require('./routes/contacts.theoretical'));
 *
 * Example .rest client usage (when mounted):
 *   GET http://localhost:3000/contacts
 *   GET http://localhost:3000/contacts/507f1f77bcf86cd799439011
 *   POST http://localhost:3000/contacts
 *   Content-Type: application/json
 *   {
 *     "firstName": "Ada",
 *     "lastName": "Lovelace",
 *     "email": "ada@example.com",
 *     "favoriteColor": "blue",
 *     "birthday": "1990-01-01"
 *   }
 *
 *   PUT http://localhost:3000/contacts/507f1f77bcf86cd799439011
 *   Content-Type: application/json
 *   {
 *     "firstName": "Ada",
 *     "lastName": "Lovelace",
 *     "email": "ada@example.com",
 *     "favoriteColor": "blue",
 *     "birthday": "1990-01-01"
 *   }
 *
 *   DELETE http://localhost:3000/contacts/507f1f77bcf86cd799439011
 */

module.exports = router;