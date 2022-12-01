// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
const express = require('express')
const app = express()
const port = 3000
// access models
const db = require('./models')
// access controllers
const locationsCtrl = require('./controllers/locations')
const logEntryCtrl = require('./controllers/logEntries')


// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
// set folder for static files
app.use(express.static('public'))
// sets the view engine to EJS for our app (this allows us to render EJS files without usind `.ejs` after file names)
app.set('view engine', 'ejs')
// body parser: used for POST/PUT/PATCH routes: this will take incoming strings from the body that are url encoded and parse them into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// an example function that shows how middleware will be run every time a route is accessed
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});



// +-+-+-+-+-+-+
// |R|O|U|T|E|S|
// +-+-+-+-+-+-+
// Index Route (GET/Read): We'll leave this route in the server.js since it affects both models
app.get('/', (req, res) => {
    // query locations from the database
    db.Location.find({}, (err, locations) => {
        // query log entries from the database
        db.LogEntry.find({}, (err, entries) => {
            // render `index.ejs` after data has been queried
            res.render('index', {
                locations: locations,
                entries: entries,
                tabTitle: 'Final Frontier'
            })
        })
    })
})
// All routes affecting the Location model: This tells our app to look at the `controllers/locations.js` file to handle all routes that begin with `localhost:3000/location`
app.use('/location', locationsCtrl)
// All routes affecting the LogEntry model: This tells our app to look at the `controllers/logEntries.js` file to handle all routes that begin with `localhost:3000/entry`
app.use('/entry', logEntryCtrl)


// +-+-+-+-+-+-+-+-+
// |L|I|S|T|E|N|E|R|
// +-+-+-+-+-+-+-+-+
// `app.listen()` binds and listens for the connections on the specified host and port
app.listen(port, () => {
    console.log(`App is running at localhost:${port}`)
})