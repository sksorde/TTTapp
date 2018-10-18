var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var app = express();
app.set('port',process.env.PORT || 3000);
app.set('views',___dirname + '/views');
app.set('view engine','jade');

app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(___dirname,'public')));

mongoose.connect('mongodb://localhost/mydb');

var Schema = new mongoose.Schema({
	
		_id : string,
		name: String,
		age : Number
});
var user = mongoose.model('emp',Schema);

app.post('/new',function(req,res) {
	new user({
		_id  :req.body.email,
		name: req.body.name,
		age: req.body.age
	}).save(function (err,doc) {
		if(err) res.json(err);
		else res.send('Success');
	});
});
