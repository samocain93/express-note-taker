const notes = require('express').Router();

const {readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { response } = require('.');


// Get route for retrieving notes
// http://localhost:4000/api/notes/

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
})

//post route for new note
// http://localhost:4000/api/notes/
notes.post('/', (req, res) => {
    console.log(req.body);

    const {title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };


        const parsedData = readAndAppend(newNote, './db/db.json');
        res.json(parsedData)
    } else {
        res.error('Error in creating note')
    }
})

notes.delete(':id', (req, res) => {
    const id = req.params.id;
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        const dbFile = JSON.parse(data);
        const newDbData = dbFile.filter(note => note.id !==id);
        fs.writeFile('./db.db.json', JSON.stringify(newDbData, (error) => {
            res.json('Note has been deleted')
        }))
    })
})





module.exports = notes;