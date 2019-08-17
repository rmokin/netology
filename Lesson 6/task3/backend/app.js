var express = require('express');
var bodyParser = require("body-parser");
var TokenGenerator = require('uuid-token-generator');
var tokgen = new TokenGenerator(); 
var uuidv1 = require('uuid/v1');
var crypto = require('crypto');
var app = express();

var messages = [], port = process.env.npm_package_config_port || 7777;
var tokens = {};
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send(`
    LLC Private Chat server v.0.0.0.0/2 
    Use commands:<br/>
       GET /messages[from=number] - list last 100 message from number(default last number)
  `);
});

app.post('/hello', function (req,res) {
  var hashSecret = crypto.createHash('sha256').update(req.body.secret).digest('hex')
  if (!tokens[hashSecret]){
    tokens[hashSecret] = tokgen.generate();
  }
  res.send({
    token: crypto.createHash('sha256').update(tokens[hashSecret]).digest('hex'),
  });
});

app.get('/messages', function (req,res) {
    let indx = -1;
    let msg = [];
    let count = 100;
    let start = 0;
    let end = start + count;
    let from = req.query.from;
    if (!from){
      start = messages.length - count > 0 ? messages.length - count  : 0;
    }
    else{
      start = messages.length;
      messages.forEach( function (item, index) {
        if (item.id === from){
          start = index + 1;
          return false;
        }
      });
    }
    end = start + count;
    msg = messages.slice(start, end);
    res.send({
      messages: msg,
    });
});

app.post('/messages',function (req,res) {
    messages.push({
        date: new Date(),
        uid: req.body.uid,
        id: uuidv1(),
        content: req.body.content,
    });
    res.send({
      'code': 0,
      'message': 'Successfully add',
    });
});

app.listen(port, function () {
  console.log(`Notes server running on port:${port}`);
});