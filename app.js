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
app.get('/new/:urlToShorten(*)', function (req, res, next) {
    //es5 syntax
    //var urlToShorten = req.params.urlToShorten

    //es6 syntax
    var {urlToShorten} = req.params;

    //regex from Stackoverflow to see test if valid URL
    var regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    if (regex.test(urlToShorten) === true) {
        var short = Math.floor(Math.random() * 100000).toString();
        var data = new shortUrl({
            originalUrl: urlToShorten,
            shorterUrl: short
        });
        //save to mongo database
        data.save(err => {
            if (err) {
                return res.send("Error saving to database");
            }
        });

        return res.json(data);
    } else {
        var data = new shortUrl({
            originalUrl: urlToShorten,
            shorterUrl: "invalid_URL"
        });
        return res.json(data);
    }

});


//Query database and forward to our original URL
app.get('/:urlToForward', (req, res, next) => {
    //stores the value of param
    var shorterUrl = req.params.urlToForward;

    shortUrl.findOne( {'shorterUrl': shorterUrl} , function (err, data) {
        if (err) {
            res.send("Error reading database");
        } else {
            if (data) {
                var re = new RegExp("^(http|https)://", "i");
                var strToCheck = data.originalUrl;
                if (re.test(strToCheck)) {
                    res.redirect(301, data.originalUrl)
                    console.log(data);
                } else {
                    res.redirect(301, 'http://' + data.originalUrl);
                    console.log(data);
                }
            } else {
                res.json( { Error: 'Nothing matching ' + shorterUrl + ' in database' } );
            }
            
        }
    });
});

//listen to see if everything is working and process.env.PORT is for heroku
app.listen(process.env.PORT || 3000, function () {
    console.log("listening!!!");
})

module.exports = app