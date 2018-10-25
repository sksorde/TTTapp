'use strict';
var express = require('express');
var router = express.Router();
var url = "mongodb://localhost:27017";
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var engines = require('consolidate');
var path = require('path');

var app = express();

app.engine('html', engines.nunjucks);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');


/* GET home page. */
router.get('/', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        if (err) { throw err; }
        //console.log("test");
        var db = client.db("mydb");
        //db.collection('Users').find({ _id: new mongodb.ObjectID(id) }).toArray(function (err, docs) {
        db.collection('Users').find({}).toArray(function (err, docs) {
            if (err) throw err;
            console.log(docs);
            //res.send(docs);
            res.render('mongDBCRUD.html', { data: docs });
            client.close();
        });
    });
});

router.get('/fetch', function (req, res, next) {
    var id = req.query.id;    
    MongoClient.connect(url, function (err, client) {
        if (err) { throw err; }
        var db = client.db("mydb");
        db.collection('Users').find({ _id: new mongodb.ObjectID(id) }).toArray(function (err, docs) {
        //db.collection('Users').find({}).toArray(function (err, docs) {
            if (err) throw err;
            console.log(docs);
            res.send(docs);
            //res.render('/', { data: docs });
            client.close();
        });
    });
});

router.post('/add', function (req, res, next) {
    //console.log(req.body.lastName);
    MongoClient.connect(url, function (err, client) {
        if (err) { console.log(err); throw err; }
        var db = client.db("mydb");
        var collection = db.collection("Users");
        console.log("Mongo Connection");
        var User = { firstName: req.body.firstName, lastName: req.body.lastName };
        collection.insert(User, function (err, result) {
            console.log("User Created");
            client.close();
            res.redirect('/');
        });
    });
});

router.get('/delete', function (req, res, next) {
    var id = req.query.id;
    //console.log("SKS: " + id);
    MongoClient.connect(url, function (err, client) {
        if (err) { throw err; }
        var db = client.db("mydb");
        var collection = db.collection("Users");
        collection.deleteOne({ '_id': new mongodb.ObjectId(id) }, function (err, result) {
        //collection.deleteOne({ _id: 'req.params.id' }, function (err, result) {
            if (err) {
                throw err;
            } else {
                client.close();
                res.redirect('/');
            }
        });
    });
});

router.post('/edit', function (req, res, next) {
    var id = req.body.id;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    //console.log("SKS :" + id + firstName + lastName);
    MongoClient.connect(url, function (err, client) {
        if (err) { throw err; }
        var db = client.db("mydb");
        var collection = db.collection("Users");
        collection.updateOne({ _id: new mongodb.ObjectId(id) }, { $set: { 'firstName': firstName, 'lastName': lastName } }, function (err, result) {
            if (err) {
                throw err;
            } else {
                client.close();
                res.redirect('/');
            }
        });
    });
});

module.exports = router;
