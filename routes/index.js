var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = express.Router();


// Connection URL
const url = "https://www.instagram.com/duto_guerra/?__a=1";


const getUser = function(request, callback) {
  
  
};


router.get("/", function(req, res) {
  
  var request = require("request")

  request({
    url: url,
    json: true
  }, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
        res.send(body) ;
    }
  })

});


module.exports = router;
