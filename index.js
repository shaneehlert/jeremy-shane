//  require modules
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

 // set application
var app = express();


// connecting mongo database
var mongodburl = process.env.MONGODB_URI || 'mongodb://localhost/myDb';
mongoose.connect(mongodburl);


// set port
var PORT = process.env.PORT || 3000;


// servering static files to public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

// call to get data from API and send to front end

app.listen(PORT, function(){
  console.log('listening on port ' + PORT);
});