// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const port = process.env.PORT || 3000

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});




app.get('/api/:date',(req,res) => {
  const input = parseInt(req.params.date);
  const response = {}
  const unix = Math.round(Date.parse(req.params.date))
  if(isNaN(input)) {
    res.send({ error : "Invalid Date" })
    return
  }
  else if (unix) {
    response.unix = unix
    response.utc = new Date(unix).toUTCString()
  }
  else {
    response.unix = input
    response.utc = new Date(input).toUTCString()
  }
  res.send(response)
})


// listen for requests :)
app.listen(port, _ => console.log(`App is listening on port ${port}`))