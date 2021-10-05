const express = require('express');
const app = express();
const emailValidator = require('email-validator');
emailValidator.validate("test@email.com"); // true
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));


// Get Request Route
app.get('/', function (req, res) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) {
            console.log(err);
        } else if (db) {
            var dbo = db.db("mydatabase"); // creating Database
            dbo.collection("mycollection").find({}).toArray(function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");
                console.log(res)
                db.close();
            });
        }
    })
    res.sendFile(__dirname + '/index.html')
});


// Post Request Route
app.post('/', function (req, res) {
    // console.log(req.data);
    // var firstName = req.body.firstName;
    // var lastName = req.body.lastName;
    var email = req.body.email;
    // var address = req.body.address;
    // var mobile = req.body.mobile;
    // var date = req.body.date;
    // let object = [{
    //     firstName : "req.body.firstName",
    //     lastName : "req.body.lastName",
    //     email : "req.body.email",
    //     address :"req.body.address",
    //     mobile :"req.body.mobile",
    //     date : "req.body.date"
    // }]

    if (emailValidator.validate(email)) {
        // console.log(req.body);
        let myobj = req.body;
        // console.log(myobj);
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
            if (err) {
                console.log(err);
            } else if (db) {
                var dbo = db.db("mydatabase"); // creating Database
                dbo.collection("mycollection").findOne({ email: req.body.email }, function (err, res) {
                    // console.log("data", res)
                    if (res) {
                        console.log("Email Already Exist");
                    } else {
                        dbo.collection("mycollection").insertOne(myobj, function (err, res) {
                            if (err) throw err;
                            console.log("1 document inserted");
                            // res.render('myobj');
                            db.close();
                        });
                    }
                });

            }
        })
    }
    else {
        res.send("Email is Invalid");
    }
    res.sendFile(__dirname + '/index.html')

});

// Server Port
app.listen(5000, function () {
    console.log('server is listening on port ${port:5000}');
});

