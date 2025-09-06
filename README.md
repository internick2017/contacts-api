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

1. GitHub repo URL visible.
2. Show `.gitignore` contains `.env` and `.env` is not in the repo.
3. Show `server.js`, `routes/contacts.js`, `models/Contact.js` to highlight architecture.
4. Show deployed Render URL and live responses for GET /contacts and GET /contacts/:id.

```
