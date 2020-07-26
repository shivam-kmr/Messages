const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");
const { MongoClient } = require("mongodb");
const app = express();

const port = 8081;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
MongoClient.connect(db.url, function (err, client) {
  if (err) throw err;
  var database = client.db('MessagesDB');
  require("./app/routes")(app, database);
  app.listen(port, () => {
    console.log("We are live on" + port);
});
})