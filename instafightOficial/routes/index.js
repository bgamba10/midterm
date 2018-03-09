var express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
var router = express.Router();


// Connection URL
const url = "mongodb://"+process.env.mlabUsername+":"+process.env.mlabPassword+"@"+process.env.mlabDatabase;
console.log(url);
const dbName = "webdev"

//gets documents from db
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection("instafights");
  // Find some documents
  collection.find().limit(20).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found " + docs.length + " records");
    // console.log(docs);
    callback(docs);
  });
};

//inserts documents in db
const insertDocuments = function(db,d,callback) {
  // Get the documents collection
  const collection = db.collection('instafights');

  // Insert some documents
  collection.insert(d, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted 1 documents into the collection");
    callback(result);
  });
}

//gets from db
function getFollowers(callback) {

  // Database Name
  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    findDocuments(db, callback);
    client.close();
  });

}

//posts from db
function postDate(d,callback) {
// Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db,d, function() {
    client.close();
    callback();
  });
});
}



//router for get 
router.get("/", function(req, res) {
  getFollowers( 
    (followers) => res.send(followers) 
    );
});

//router for post
router.post("/", function(req, res) {
  var body = req.body
  postDate(body, () => res.send('Funcionaaaaaa!!!!!'));
});

module.exports = router;
