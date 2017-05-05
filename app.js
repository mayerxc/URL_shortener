var cors = require('cors');
var bodyParser = require('body-parser');
var express = require('express');
//create an instance of our app and cors and body parser
var app = express();
app.use(bodyParser.json());
app.use(cors());

//Creates the database entry
app.get('/new/:urlshortener(*)', function(){
    
})

/*app.get('/chris', function(req,res,next){
    res.end('chris is the best ever');
})*/


//listen to see if everything is working and process.env.PORT is for heroku
app.listen(process.env.PORT || 3000, function(){
    console.log("listening!!!");
})



module.exports = app