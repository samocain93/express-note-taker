const express = require('express');
const path = require('path');
const api = require('./routes')

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// HTTP://localhost:4000/api
app.use('/api', api)

app.use(express.static('public'))
// http://localhost:4000/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// http://localhost:4000/notes 
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})






const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`)
})