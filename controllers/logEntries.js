// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()

/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/entry`
---------------------------------------------------------------------------------------
*/

// New Route (GET/Read): This route renders a form the user will use to POST (create) a new log entry
router.get('/new', (req, res) => {
    res.render('newEntry', {
        tabTitle: "Log Entry"
    })
})

router.get('/:id', (req, res) => {
    db.LogEntry.findById(req.params.id, (err, entry) => {
        res.render("showEntry", {
            entry: entry,
            tabTitle: "Star Date " + entry.starDate
        })
    })
})

// Create Route (POST/Create): This route receives the POST request sent from the new route above, parses it into a logEntry object, creates the logEntry object as a document in the logentries collection, and redirects the user to the show page for the new log entry that was created
router.post('/', (req, res) => {
    db.LogEntry.create(req.body, (err, entry) => {
        res.redirect('/entry/' + entry._id)
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router;