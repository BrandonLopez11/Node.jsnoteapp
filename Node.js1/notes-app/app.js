//chalk is a library that is used for styling and colorizing outputs in Node.js.
const chalk = require('chalk')
//yargs is a library for creating and processing command line options and arguments.
const yargs = require('yargs')
//Notes exports function for creating, reading, updating, and deleting notes in a command line
const notes = require('./notes.js')

// Customize yargs version
// This sets the version of yargs and is displayed when you run the '--version'
yargs.version('1.1.0')

// Create add command
//yargs.command method defines a new command the command option specifies the name of the command.
//The describe option provides a brief description of what the command does.
//The builder option specifies the arguments the command requires.
//The handler option is a function that will be called when the add command is invoked. In this case, it calls the notes.addNote function and passes it the values of the title and body arguments.
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
//yargs.command method defines a new command the command option specifies the name of the command.
//The describe option provides a brief description of what the command does.
//The builder option specifies the arguments the command requires.
//The handler option is a function that will be called when the remove command is invoked. In this case, it calls the notes.removeNote function and passes it the value of the title argument.
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
//yargs.command method defines a new command the command option specifies the name of the command.
//The describe option provides a brief description of what the command does.
//The builder option specifies the arguments the command requires.
//The handler option is a function that will be called when the list command is invoked. In this case, it calls the notes.listNotes function, which lists all the notes in the application.
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler() {
        notes.listNotes()
    }
})

// Create read command
//yargs.command method defines a new command the command option specifies the name of the command.
//The describe option provides a brief description of what the command does.
//The builder option specifies the arguments the command requires.
//The handler option is a function that will be called when the read command is invoked. In this case, it calls the notes.readNote function and passes it the value of the title argument.
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})
//This  method is called to parse the command-line arguments and call the appropriate handler for the specified command.
yargs.parse()