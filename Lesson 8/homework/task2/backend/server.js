var express = require('express');
var bodyParser = require("body-parser");
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

app.get('/', async function (req, res) {
  res.send(`
    LLC Test server v.0.0.0.0/2 
    Use commands:<br/>
       GET /data - test get request<br/>
       GET /loading - test get delayed request<br/>
       GET /error - test get error request<br/>
  `);
});

app.get('/data', async function (req,res) {
  res.send({
    status: "OK",
  });
});

app.get('/error', async function (req,res) {
    res.statusMessage = "Test request with error response.";
    res.statusCode = 500;
    res.end()
});

app.get('/loading', async function (req,res) {
    const timeout = 5 * 1000;
    await new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });

    res.send({
        status: `Test response with delay ${timeout} sec`,
    });
});


app.listen(port, function () {
  console.log(`Notes server running on port:${port}`);
});