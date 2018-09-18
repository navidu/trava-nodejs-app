//app.js
//load the things we need
const express = require('express')
const app = express()

app.use(express.static('public'));
//set the view engine to ejs
app.set('view engine', 'ejs')

//load the index page
app.get('/', function (req, res) {
    res.render('index');
})

app.listen(8080, function () {
    console.log('TRAVA app on port 8080!')
})