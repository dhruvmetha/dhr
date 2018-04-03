var express = require('express');
var http = require('http');
var path = require('path');
var events = require('./events');
var team = require('./team')
var app = express();

process.env.NODE_ENV = 'production';

app.set("views", path.resolve(__dirname, "views"));
var publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.get('/', function(req, res){
	 res.render("index"); 
});

app.get('/events', function(req, res,){
		app.locals.json = events;

	  res.render("categories"); 
});



app.get('/schedule', function(req, res){
		

	  res.render("schedule"); 
});



app.get('/events/*', function(req, res){
	 app.locals.events  = events[req.originalUrl.slice(8, req.originalUrl.length)].events;
	 app.locals.category = events[req.originalUrl.slice(8, req.originalUrl.length)].name;

	  res.render("events"); 
});

app.get('/about-us', function(req, res){
	 app.locals.faculty  = team.faculty;
	 app.locals.core = team.core;
	  res.render("about-us"); 
});


app.get('/*',function(req, res){
	res.render("404");
});

app.set("view engine", "ejs");

app.listen(80, function(){
	console.log("Started at 80");
})