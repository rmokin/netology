var express = require('express');
var bodyParser = require("body-parser");
var uuidv1 = require('uuid/v1');
var app = express();

var port = process.env.npm_package_config_port || 7777;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let services = [
  {id: uuidv1(), name: "React"},
  {id: uuidv1(), name: "Redux"},
  {id: uuidv1(), name: "Redux Thunk"},
  {id: uuidv1(), name: "RxJS"},
  {id: uuidv1(), name: "Redux Observable"},
  {id: uuidv1(), name: "Redux Saga"}
];

function getRandomInt(min, max) {
  let result =  Math.floor(Math.random() * (max - min)) + min;
  return result;
}

function theErrorIsComing(res){
  if ( !(getRandomInt(0, 666) % 13)){
    console.log(`theErrorIsComing`);
    res.statusMessage = "The error is coming.";
    res.statusCode = 500;
    res.end()
    return true;
  }
  return false;

}

async function theDelayIsComing(process,delay){

  let isDelayed = false;
  if ( !(getRandomInt(0, 9) % getRandomInt(0, 9)) || delay ){
    await new Promise(resolve => {
      const timeout = delay || getRandomInt(1, 1 * 1000); 
      console.log(`theDelayIsComing ${timeout}`);
      setTimeout(() => {
          resolve();
      }, timeout);
    })
    isDelayed = true;
  }
  process();
  return isDelayed;
}

app.get('/', async function (req, res) {
  res.send(`
    LLC Search server v.0.0.0.0/2 
    Use some commands: /search 
    Body is som string
    
  `);
});


app.post('/search',function (req,res) {
  theErrorIsComing(res) || theDelayIsComing( () => {
    const {name} = req.body;
    console.log(`search:${name}`);
    res.send(services.filter( o => o.name.toLocaleLowerCase().startsWith(name.toLocaleLowerCase())  ));
  });

});



app.listen(port, function () {
  console.log(`Notes server running on port:${port}`);
});