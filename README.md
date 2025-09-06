# CSE 341 — Contacts API (Week 1)

This is a small REST API for the Week 1 contacts assignment. It provides two read endpoints backed by MongoDB:
- GET /contacts — return all contacts
- GET /contacts/:id — return a single contact by id

Project layout
- `server.js` — starts the server and connects to the database
- `routes/contacts.js` — route handlers for the contacts endpoints
- `add-sample-data.js` — simple script to insert sample contacts
Quick start (local)
1. Install dependencies
```powershell
2. Create a `.env` file in the project root with these variables (example):
```text
PORT=3000
3. Start the app in development
```powershell
npm run dev
Seed sample data
The repository includes `add-sample-data.js` which uses `MONGODB_URI` to insert three example contacts. To run it:
Deploy to Render (recommended)
1. Push this repo to GitHub.
2. On Render, create a new Web Service and connect the `contacts-api` repository.
3. In Render service settings add an Environment Variable:
   - Key: `MONGODB_URI`
   - Value: your Atlas connection string (include the `/contacts` database name and make sure the password is URL-encoded).
Testing the deployed app
Use the deployed URL returned by Render; for example:
```powershell
Notes
- `.env` is included in `.gitignore` and should not be checked into source control.
- If the deployed app cannot connect to Atlas, check Atlas Network Access (IP allowlist) and ensure the `MONGODB_URI` value on Render matches the URI you used to seed the database.
Grading checklist (what to show in your video)
- GitHub repo URL
- `.gitignore` contains `.env` and `.env` is not in the repo
- Show `server.js`, `routes/contacts.js`, and `add-sample-data.js`
- Show deployed Render URL and live responses for GET /contacts and GET /contacts/:id

That's it — the README contains the information a grader needs to run and verify the Week 1 contacts API.
# CSE 341 Contacts API

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables in .env file

3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints

```markdown
# CSE 341 Contacts API

## Overview
Simple Contacts API for CSE 341 Week 1 (GET all contacts, GET by id). Follows basic MVC: `server.js`, `routes/contacts.js`, `models/Contact.js`.

## Quick setup (local)

1. Install dependencies
```powershell
npm install
```

2. Create a `.env` file in the project root with:
```text
PORT=3000
MONGODB_URI=mongodb://localhost:27017/contacts
```

3. Start the server in development
```powershell
npm run dev
# server will run at http://localhost:3000
```

## Seed sample data (local or remote Atlas)
There is an `add-sample-data.js` script that inserts three sample contacts. To run it against the database pointed to by `MONGODB_URI` in your environment:

```powershell
# set MONGODB_URI for this session (replace with your Atlas string if needed)
#$env:MONGODB_URI = 'your-connection-string-here'
cd 'e:\Users\nick_\Documents\Cursos\byu\CSE341-Web-Services\contacts-api'
node add-sample-data.js
```

Verify by visiting:

GET /contacts -> https://your-deploy-url/contacts
GET /contacts/:id -> https://your-deploy-url/contacts/<id>

## Deploy to Render (recommended)

1. Push your repo to GitHub (already done in this project).
2. In Render dashboard create a new Web Service and connect the `contacts-api` GitHub repo.
3. Set the Environment Variable in Render:

   - Key: `MONGODB_URI`
   - Value: your MongoDB Atlas connection string (e.g. `mongodb+srv://USER:PASS@cluster.mongodb.net/contacts?retryWrites=true&w=majority`)

4. Build & Start settings on Render (defaults usually work):
   - Build command: `npm install`
   - Start command: `npm start`

5. Deploy. Once live, Render provides a URL like `https://your-app.onrender.com`.

Notes:
- Make sure `.env` is listed in `.gitignore` (it is) and not pushed to GitHub.
- If using Atlas, you may need to allow access from Render by configuring IP access (Render can reach Atlas when using the standard connection string).

## API Endpoints

- GET /contacts - returns all contacts (JSON array)
- GET /contacts/:id - returns a single contact by MongoDB ObjectId

## Grading checklist (what to show in your video)

- GitHub repo URL visible.
- `.gitignore` contains `.env` and `.env` is not in the repo.
- Show `server.js`, `routes/contacts.js`, and `add-sample-data.js`.
- Show deployed Render URL and live responses for GET /contacts and GET /contacts/:id.

```
