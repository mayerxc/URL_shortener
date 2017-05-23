var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var shortUrl = require('./models/shortUrl');
var express = require('express');

//create an instance of our app and cors and body parser
var app = express();
app.use(bodyParser.json());
app.use(cors());

//connect to our database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrls');

//allows node to use static content
app.use(express.static(__dirname + "/public"));

//Creates the database entry
app.get('/new/:urlToShorten(*)', function(req, res, next){
    //es5 syntax
    //var urlToShorten = req.params.urlToShorten

    //es6 syntax
    var { urlToShorten } = req.params;
    //regex from Stackoverflow to see test if valid URL
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    if (regex.test(urlToShorten) === true){
        return res.json({urlToShorten});
    } else {
        return res.json({urlToShorten: "Failed"});
    }
    
});

/*app.get('/chris', function(req,res,next){
    res.end('chris is the best ever');
})*/


//listen to see if everything is working and process.env.PORT is for heroku
app.listen(process.env.PORT || 3000, function(){
    console.log("listening!!!");
})



module.exports = app