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
    db.Task.create(req.body, (err, location) => {
        res.redirect('/task/')
    })
})
// Show Route (GET/Read): 
router.get('/:id', (req, res) => {
    db.Task.findById(req.params.id, (err, location) => {
        res.render("showTask", {
            task: task
        })
    })
})

// Delete Route (DELETE/Delete): 
router.delete('/:id', (req, res) => {
    db.Task.findByIdAndRemove(req.params.id, (err, task) => {
        res.redirect('/')
    })
})

// Edit Route (GET/Read):
router.get('/:id/edit', (req, res) => {
    db.Task.findById(req.params.id, (err, location) => {
        res.render("editTask", {
            task: task
        })
    })
})

// Update Route (PUT/Update):
router.put('/:id', (req, res) => {
    db.Task.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, task) => {
        res.redirect('/task/')
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router