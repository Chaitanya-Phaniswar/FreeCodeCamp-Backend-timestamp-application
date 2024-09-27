// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date_received",(req,res)=>{
  const date_received=req.params.date_received;
  if(!date_received){
    res.send({
      "error": "Invalid Date"})
    return;
  }
  const data={unix: "",date: ""}
  if(isNaN(date_received)){
    data["unix"]=Math.floor(new Date(date_received).getTime())
    data["date"]= new Date(date_received).toUTCString();
  }else{
    const date= new Date(date_received*1000/1000);
    data["unix"]=Math.floor(date.getTime())
    data["utc"]= date.toUTCString();
  }
  res.json(data)
  //console.log(date)
})
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3001, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
