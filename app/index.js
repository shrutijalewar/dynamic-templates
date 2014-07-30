'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(__dirname + '/static'));

app.get('/', function(req,res){
  res.render('home');
});
app.get('/checkers', function(req,res){
  res.render('checkers');
});
app.get('/add/:x/:y/:a/:b', function(req,res){
req.params.a *= 1;
req.params.b *= 1;
req.params.x *= 1;
req.params.y *= 1;

console.log(req.params, req.query);

req.params.fontsize = req.query.fontsize;  
req.params.color = req.query.color;
req.params.borderwidth = req.query.borderwidth;
res.render('sum',req.params);
});

app.get('/sumlist/:a', function(req,res){
  var a =req.params.a.split(',');
  a = a.map(function(x){return x * 1;});
  var sum = 0;
  for(var i = 0; i< a.length; i++){
    sum += a[i];
  }
  
  res.render('sumlist',{a:a, sum:sum, even:req.query.even, odd:req.query.odd});
  });
var port = process.env.PORT;

app.listen(port, function(){
    console.log('Express is now listening on PORT');
});


