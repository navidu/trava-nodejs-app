//app.js
//load the things we need
const express = require('express');
const app = express();
var port = 8080;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/trava-nodejs-app");
var nameSchema = new mongoose.Schema({
    firstName: String,
    email: String,
    subject: String,
    description: String
});
var User = mongoose.model("User", nameSchema);

app.use(express.static('public'));
//set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index');
});

app.post("/contactus", (req, res) => {
    var myData = new User(req.body);
myData.save()
    .then(item => {
    res.send("Form submitted uccessfully!");
})
.catch(err => {
    res.status(400).send("Unable to save to database");
});
});

app.listen(port, function () {
    console.log('TRAVA app on port ' + port);
})


