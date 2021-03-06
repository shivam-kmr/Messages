const express = require("express");
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const db = require("./config/db");
const { MongoClient } = require("mongodb");
const app = express();
var cors = require('cors')
const port = process.env.PORT || 8080;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, function (err, client) {
  if (err) throw err;
  var database = client.db('MessagesDB');
  require("./app/routes")(app, database);
  app.listen(port, () => {
    console.log("We are live on" + port);
});
})
