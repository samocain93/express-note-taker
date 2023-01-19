
const express = require('express');

const notesRouter = require('./notes');

const app = express();
// http://localhost:4000/api/notes

app.use('/notes', notesRouter);


module.exports = app;

