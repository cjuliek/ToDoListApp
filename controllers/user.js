// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()


// New Route (GET/Read): 
router.get('/new', (req, res) => {
    res.render('newUser.ejs', {
        tabTitle: "Task Creation"
    })
})
// Create Route (POST/Create): 
router.post('/', (req, res) => {
    db.User.create(req.body, (err, location) => {
        res.redirect('/user/')
    })
})
// Show Route (GET/Read): 
router.get('/:id', (req, res) => {
    db.User.findById(req.params.id, (err, location) => {
        res.render("showUser", {
            username: username,
            password: password, 
        })
    })
})

// Delete Route (DELETE/Delete): 
router.delete('/:id', (req, res) => {
    db.User.findByIdAndRemove(req.params.id, (err, task) => {
        res.redirect('/')
    })
})

// Edit Route (GET/Read):
router.get('/:id/edit', (req, res) => {
    db.User.findById(req.params.id, (err, location) => {
        res.render("editUser", {
            username: username,
            password: password, 
        })
    })
})

// Update Route (PUT/Update):
router.put('/:id', (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, task) => {
        res.redirect('/user/')
    })
})

// export these routes so that they are acessible in `server.js`
module.exports = router