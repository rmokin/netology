var express = require('express');
var bodyParser = require("body-parser");
var uuidv1 = require('uuid/v1');
var app = express();

var notes = [], port = process.env.npm_package_config_port || 7777;
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
    Notes server v.0.0.0.0/1 
    Use commands:<br/>
       GET /notes - list all notes
       <br/>
       POST /notes - add new note {id:'', content:''}
       <br/>
       DELETE /notes/{id} - delete note with id 
       <br/>
  `);
});

app.get('/notes', function (req,res) {
    res.send({
      notes: notes,
    });
});

app.post('/notes',function (req,res) {
    notes.push({
        date: new Date(),
        id: uuidv1(),
        content: req.body.content,
    });
    res.send({
      'code': 0,
      'message': 'Successfully add',
    });
});

app.delete('/notes/:noteId', function (req,res) {
    notes = notes.filter(function(item) {
        return req.params.noteId.toLowerCase() !== item.id
    });
    res.send({
      'code': 0,
      'message': 'Successfully del',
    });
});

app.listen(port, function () {
  console.log(`Notes server running on port:${port}`);
});