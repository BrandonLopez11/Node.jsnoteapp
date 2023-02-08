// provides a way to interact with the file system on the computer
const fs = require('fs')
////chalk is a library that is used for styling and colorizing outputs in Node.js.
const chalk = require('chalk')

// it adds a new note with a given title and body to the list of notes. It first loads the existing notes, then checks if there is a note with the same title. If there is not, the new note is added to the list and saved to the file.
const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

//it removes a note with a given title from the list of notes. It first loads the existing notes, then removes the note from the list and saves the remaining notes to the file.
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }
}

//it lists all the existing notes by reading them from the file and printing their titles.
const listNotes = () => {
    const notes = loadNotes()

    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

//it reads a note with a given title from the list of notes. It first loads the existing notes, then finds the note and prints its title and body.
//The function first calls loadNotes function to get the list of existing notes stored in the file.
//It then uses the Array method find to find the note with a matching title.
//If a note with a matching title is found, it logs the title and body of the note to the console using the console.log method, with the title in an inverted color using chalk.inverse.
//If no note with a matching title is found, it logs the message "Note not found!" in red and inverted color using chalk.red.inverse to the console.
const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }
}

//it saves a given list of notes to the file notes.json. It converts the list to a string representation in JSON format and writes it to the file.
// takes an argument "notes" which is an array of objects. The function converts the notes array into a JSON string using the JSON.stringify() method and then writes the JSON string to a file named 'notes.json' using the fs.writeFileSync() method
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

// it loads the existing list of notes from the file notes.json. It reads the contents of the file, converts it to a list of objects, and returns it.
// a function in Node.js that attempts to read the contents of a file named "notes.json". If the file exists and can be successfully read, the contents are converted from a JSON string to a JavaScript object and returned.
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

//export multiple functions from the current module so that they can be used in other files by using the require function. 
//exports make the functions available as properties of the object that is returned when the required file is executed.
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}