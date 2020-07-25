var ObjectId = require("mongodb").ObjectID;
module.exports = function (app, db) {
  app.post("/messages", (req, res) => {
    var date = new Date();
    var timeStamp = date.getTime();
    const messegeToBeSent = {
      userId: new ObjectId(req.body.userId),
      to: req.body.to,
      message: req.body.message,
      time: timeStamp,
    };
    db.collection("Messages").insertOne(messegeToBeSent, (err, result) => {
      res. header("Access-Control-Allow-Origin", "*");
      if (err) {
        console.log(err);
        res.send({
          error: "An error Occured" + res,
        });
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};
