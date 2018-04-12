var express = require('express');
var http = require('http');
var path = require('path');
var logger = require("morgan");
var events = require('./events');
var team = require('./team')
var app = express();

process.env.NODE_ENV = 'production';

app.use(logger("dev"));

app.set("views", path.resolve(__dirname, "views"));
var publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));

app.use(function(request, response, next) {
    console.log("In comes a " + request.method + " to " + request.url);
    next();
});

app.get('/', function(req, res) {
    res.render("index");
});

app.get('/events', function(req, res) {
    app.locals.json = events;
    res.render("categories");
});

app.get('/schedule', function(req, res) {
    res.render("schedule");
});

app.get('/events/*', function(req, res, next) {
    if (events[req.originalUrl.slice(8, req.originalUrl.length)]) {
        app.locals.events = events[req.originalUrl.slice(8, req.originalUrl.length)].events;
        app.locals.category = events[req.originalUrl.slice(8, req.originalUrl.length)].name;
        res.render("events");
    } else {
        next();
    }
});

app.get('/team', function(req, res) {
    app.locals.faculty = team.faculty;
    app.locals.core = team.core;
    res.render("team");
});

app.get('/register/*', function(req, res, next) {
    var flag = 0;
    app.locals.eid = req.originalUrl.slice(10, req.originalUrl.length);
    Object.keys(events).forEach(function(key) {
        events[key].events.forEach(function(event) {
            if (app.locals.eid == event.id) {
                app.locals.ename = event.name;
                app.locals.efee = event.fee[0];
                flag = 1;
            }
        });
    });
    if (flag == 1 && app.locals.efee) {
        res.render("register");
    } else {
        next();
    }

});

app.get('/*', function(req, res) {
    res.render("404");
});

app.set("view engine", "ejs");

app.listen(80, function() {
    console.log("Started at 80");
})