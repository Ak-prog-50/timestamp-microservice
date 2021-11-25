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
  // Add some logic to check whether the date is a unix timestamp or iso date.
  // Make sure users can't post invalid data.
  const unix = Date.parse(req.params.date)
  const utc = moment(req.params.date).format('MMMM Do YYYY, h:mm:ss a');
  res.send({unix , utc})
})


// listen for requests :)
app.listen(port, _ => console.log(`App is listening on port ${port}`))