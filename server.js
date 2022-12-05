// +-+-+-+-+-+-+-+-+-+-+-+-+
// |D|E|P|E|N|D|E|N|C|I|E|S|
// +-+-+-+-+-+-+-+-+-+-+-+-+
// access node packages
const express = require("express")
const app = express()
const methodOverride = require("method-override")
require("dotenv").config()
// access models
const db = require('./models')
// access controllers
const taskCtrl = require('./controllers/task')
const userCtrl = require('./controllers/user')
const port = 3000
// +-+-+-+-+-+-+-+-+-+-+
// |M|I|D|D|L|E|W|A|R|E|
// +-+-+-+-+-+-+-+-+-+-+
// set folder for static files
app.use(express.static("public"))
// sets the view engine to EJS for our app (this allows us to render EJS files without usind `.ejs` after file names)
app.set("view engine", "ejs");
// body parser: used for POST/PUT/PATCH routes: this will take incoming strings from the request body that are url encoded and parse them into an object that can be accessed in the request parameter as a property called body (req.body).
app.use(express.urlencoded({ extended: true }));
// method-override allows us to interpret POST requests from the browser as another request type: DELETE, PUT, etc.
app.use(methodOverride("_method"));


// +-+-+-+-+-+-+
// |R|O|U|T|E|S|
// +-+-+-+-+-+-+
// All routes affecting the  model: This tells our app to look at the `controllers/filename.js` file to handle all routes that begin with `localhost:3000/`
app.get('/', (req, res) => {
    db.Task.find({}, (err, tasks) => {
        res.json([tasks])

    res.render('index')})
})

//Controls for other routes
app.use('/', taskCtrl)
app.use('/', userCtrl)


// +-+-+-+-+-+-+-+-+
// |L|I|S|T|E|N|E|R|
// +-+-+-+-+-+-+-+-+
// `app.listen()` binds and listens for the connections on the specified host and port
app.listen(port, () => {
    console.log(`App is running at localhost:${port}`)
})