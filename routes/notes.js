const notes = require('express').Router();
const fs = require('fs');

const {readFromFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');


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

// Delete route for Notes

notes.delete('/:id', (req, res) => {
    const id = req.params.id;
    let notes = fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        let parsedData = JSON.parse(data);
        let newNotesArray = parsedData.filter(note => note.id !== id);

        fs.writeFile('./db/db.json', JSON.stringify(newNotesArray, null, 4), (err) => {
            if (!err) {
                res.json({
                    message: `Note with ID: ${req.params.id} was deleted successfully`
                })
            }
            else {
                res.json(`Failed to delete note with ID: ${req.params.id}`)
            }
        })
    })
})





module.exports = notes;