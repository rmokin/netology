var express = require('express');
var bodyParser = require("body-parser");
var uuidv1 = require('uuid/v1');
var app = express();

var posts = [], port = process.env.npm_package_config_port || 7777;
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
    Posts server v.0.0.0.0/1 
    Use commands:<br/>
       GET /posts - list all posts
       <br/>
       POST /posts - add/edit post {id: either 0 for add new item or non-zero for edit item, content:''}
       <br/>
       DELETE /posts/{id} - delete note with id 
       <br/>
  `);
});

app.get('/posts', function (req,res) {
    res.send({
      posts: posts.slice(-10),
    });
});

app.post('/posts/:postId',function (req,res) {

    let postId = req.params.postId;
    console.log(`postId=${postId} content=${req.body.content}`);
    if (postId && postId != '0'){
      posts = posts.map(function (item) {
        let data = {...item};
        if (postId.toLowerCase() === item.id.toLowerCase()){
          data['content'] =req.body.content;
        }
        return data;
      });
    }
    else{
      postId = uuidv1(); 
      posts.push({
          date: new Date(),
          id: postId,
          content: req.body.content,
      });
    }
    res.send({
      'code': postId,
      'message': `Successfully ${req.params.postId && req.params.postId != '0' ? 'edit' : 'add'}`,
    });
    
});

app.delete('/post/:postId', function (req,res) {
    posts = posts.filter(function(item) {
        return req.params.postId.toLowerCase() !== item.id
    });
    res.send({
      'code': 0,
      'message': 'Successfully del',
    });
});

setInterval(function(){
  return;
  let d = new Date();
  posts.push({
    date: new Date(),
    id: uuidv1(),
    content: `Timed message:${d.toISOString()}`,
  });
}, 15 * 1000)

app.listen(port, function () {
  console.log(`Posts server running on port:${port}`);
});