// dependencies
const db = require("../models")
const express = require('express')
const router = express.Router()

/* 
---------------------------------------------------------------------------------------
NOTE: Remember that all routes on this page are prefixed with `localhost:3000/location`
---------------------------------------------------------------------------------------
*/

// New Route (GET/Read): This route renders a form the user will use to POST (create) a new location
router.get('/new', (req, res) => {
    res.render('newLocation', {
        tabTitle: "Location Creation"
    })
})

// Create Route (POST/Create): This route receives the POST request sent from the new route above, parses it into a location object, creates the location object as a document in the locations collection, and redirects the user back to the root/home page
router.post('/', (req, res) => {
    if (req.body.visited) {
        req.body.visited = true
    } else {
        req.body.visited = false
    }
    db.Location.create(req.body, (err, location) => {
        res.redirect('/')
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

// export these routes so that they are acessible in `server.js`
module.exports = router