const methodOverride = require('method-override');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config()
const PORT = 8000;
const path = require('path');


app.use(bodyParser.json());

// -- view engine configuration -- // 
app.get('/', (req, res) => {
  res.redirect('/index.html')
})







// -- Live Server -- // 
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
