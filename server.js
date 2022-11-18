const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const PORT = 8000;
const path = require('path');
app.use(bodyParser.json());




// -- view engine configuration -- // 
app.get('/', (req, res) => {
  res.send('Hello World')
})







// -- Live Server -- // 
app.listen(PORT, async () => {
  console.log(`server up on port ${PORT}`);
});
