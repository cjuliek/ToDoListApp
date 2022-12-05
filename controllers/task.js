// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()


// New Route (GET/Read): 
router.get('/new', (req, res) => {
    res.render('newTask.ejs', {
        tabTitle: "Task Creation"
    })
})


// Create Route (POST/Create): 
router.post('/', (req, res) => {
    if (req.body.visited) {
        req.body.visited = true
    } else {
        req.body.visited = false
    }
    db.Task.create(req.body, (err, location) => {
        res.redirect('/task/' + location._id)
        // res.send(location)
    })
})

// Show Route (GET/Read): This route will show an individual location document using the URL parameter (which will always be the location document's ID)
router.get('/:id', (req, res) => {
    db.Location.findById(req.params.id, (err, location) => {
        res.render("showLocation", {
            location: location,
            tabTitle: "Location: " + location.name
        })
    })
})

// Delete Route (DELETE/Delete): This route allows us to delete an individual location document using the URL parameter (which will always be the location document's ID)
router.delete('/:id', (req, res) => {

    db.Location.findByIdAndRemove(req.params.id, (err, location) => {
        // res.send(location)
        res.redirect('/')
    })
    // res.send(req.params.id)
})

// Edit Route (GET/Read): This route renders a form the user will use to PUT (edit) properties of an existing location
router.get('/:id/edit', (req, res) => {
    db.Location.findById(req.params.id, (err, location) => {
        res.render("editLocation", {
            location: location,
            tabTitle: "Edit"
        })
    })
})

// Update Route (PUT/Update): This route receives the PUT request sent from the edit route above, parses it into a location object, edits the specified location object as a document in the locations collection, and redirects the user back to the show page for the updated location.
router.put('/:id', (req, res) => {
    db.Location.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, location) => {
        res.redirect('/location/' + location._id)
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router