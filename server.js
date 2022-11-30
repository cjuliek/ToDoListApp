// const methodOverride = require('method-override');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const path = require('path');
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI


app.use(bodyParser.json());

// -- view engine configuration -- // 
app.get('/', (req, res) => {
  res.render('index.html')
})


// -- Live Server -- // 
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
