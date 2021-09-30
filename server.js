const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Get Request Route
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
});


// Post Request Route
app.post('/insert', function(req, res){
    // console.log(req.data);
    console.log(req.body);
    let myobj = req.body
    console.log(myobj);
    MongoClient.connect(url,{ useUnifiedTopology: true }, function(err, db){
        if (err){
            console.log(err);
        } else if(db) {
            var dbo = db.db(""); // creating Database
            dbo.collection("").insertOne(myobj, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
        }
    })
    
    res.sendFile(__dirname+'/index.html')
});

// Server Port
app.listen(3000, function () {
    console.log('server is listening on port ${port:3000}');
})
