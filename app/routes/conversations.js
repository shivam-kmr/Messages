var ObjectId = require("mongodb").ObjectID;
module.exports = function (app, db) {
  /* 
  endpoint: /conversations  | GET call for getting all conversations.
  validataion: NA
  */
  app.get("/conversations", (req, res) => {
    var mysort = { time: -1 };
    db.collection("Messages")
      .aggregate([
        {
          $lookup: {
            from: "Contacts",
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
      ])
      .sort(mysort)
      .toArray((err, item) => {
        res.header("Access-Control-Allow-Origin", "*");
        if (err) {
          res.status(500).send({
            error: "An error Occured",
            err,
          });
        } else {
          res.send(item);
        }
      });
  });
  /* 
  endpoint: /conversations/:id  | GET call for getting the contact with same id
  validataion: if not present the raise an error
  */
  app.get("/conversations/:id", (req, res) => {
    const id = req.params.id;
    const detail = { userId: new ObjectId(id) };
    const userId = { _id: new ObjectId(id) };
    db.collection("Messages").find(detail).toArray((err, item) => {
      res.header("Access-Control-Allow-Origin", "*");
      if (err) {
        res.status(500).send({
          error: "An error Occured",
        });
      } else{
        var userInfo = null
        db.collection("Contacts").findOne(userId, (err, detail) => {
            if (err) {
              res.status(500).send({
                error: "An error Occured",
              });
            } else if(detail) {
                var conversationList  = {
                    userInfo: detail,
                    conversation: item
                }
              res.send(conversationList);
            }
            else {
              res.status(404).send({
                  error: "The requested contact details cannot be found",
                });
            }
          });
        
      }
    });
  });
};
