'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

var url = "mongodb://localhost:27017";
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var router = express.Router();
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);
//app.use('/', routes);
//app.use('/users', users);
console.log(__dirname);
console.log(app.get('env'));
// catch 404 and forward to error handler
/*
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/
app.use('/', function (req, res) {
    console.log(req.body.firstName);
    res.sendFile(__dirname + '/index.html');
});

/*
router.get('/', function (req, res, next) {
    MongoClient.connect(url, function (err, db) {
        if (err) { console.log(err); throw err; }
        data = '';
        db.collection('Users').find().toArray(function (err, docs) {
            if (err) throw err;
            res.render('/index.jade', { data: docs });
            db.close();
        });
    });
});
*/

router.get('/fetch', function (req, res, next) {
    //var id = req.query.id;    
    MongoClient.connect(url, function (err, client) {
        if (err) { throw err; }
        var db = client.db("mydb");
        //db.collection('Users').find({ _id: new mongodb.ObjectID(id) }).toArray(function (err, docs) {
        db.collection('Users').find({ }).toArray(function (err, docs) {
            if (err) throw err;
            console.log(docs);
            //res.send(docs);
            res.render('index.pug', { data: docs });
            client.close();
        });
    });
});

router.post('/add', function (req, res, next) {
    console.log(req.body.lastName);
    MongoClient.connect(url, function (err, client) {
        if (err) { console.log(err); throw err; }
        var db = client.db("mydb");
        var collection = db.collection("Users");
        console.log("Mongo Connection");
        var User = { firstName: req.body.firstName, lastName: req.body.lastName };
        collection.insert(User, function (err, result) {
            console.log("User Created");
            client.close();
            res.redirect('/fetch');
        });

    });
});
// production error handler
// no stacktraces leaked to user
/*
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
*/
app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
