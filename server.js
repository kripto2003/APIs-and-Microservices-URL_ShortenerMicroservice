'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

const bodyParser = require("body-parser");
const dns = require('dns');

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});
// your first API endpoint... 
app.post("/api/shorturl/new", urlencodedParser, function (req, res) {
  dns.lookup(req.body.url, (err, addresses, family) => {
    if (err) {
      res.json({"error": "invalid URL"});
      //return;
    }
    res.json({original_url: req.body.url, short_url: 1});
    //else res.json({original_url: req.body.url, short_url: 1});
    //console.log('address: %j family: IPv%s', address, family));
  });
  //res.json({original_url: req.body.url, short_url: 1});
});

//app.post('/', function (req, res) {
//  res.send('POST request to the homepage');
//});
  
app.listen(port, function () {
  console.log('Node.js listening ...');
});