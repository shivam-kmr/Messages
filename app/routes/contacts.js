var ObjectId = require("mongodb").ObjectID;
module.exports = function (app, db) {
/* 
  endpoint: /contacts  | GET call for getting all contacts.
  validataion: NA
  */
  app.get("/contacts", (req, res) => {
    db.collection("Contacts")
      .find({})
      .toArray((err, item) => {
        if (err) {
          console.log(err);
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
  endpoint: /contacts/:id  | GET call for getting the contact with same id
  validataion: if not present the raise an error
  */
  app.get("/contacts/:id", (req, res) => {
    const id = req.params.id;
    const detail = { _id: new ObjectId(id) };
    db.collection("Contacts").findOne(detail, (err, item) => {
      if (err) {
        res.status(500).send({
          error: "An error Occured",
        });
      } else if(detail) {
        res.send(item);
      }
      else {
        res.status(404).send({
            error: "The requested contact details cannot be found",
          });
      }
    });
  });
  /* 
  endpoint: /contacts  | post call for saving contacts.
  validataion: If a contact detail is already present in the db then dont insert.
  */
  app.post("/contacts", (req, res) => {
    var date = new Date();
    var timeStamp = date.getTime();
    const contactDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      countryCode: req.body.countryCode,
      email: req.body.email,
      city: req.body.city,
      createdAt: timeStamp,
    };
    const detail = { mobile: req.body.mobile };
    db.collection("Contacts").findOne(detail, (err, item) => {
      console.log(item);
      if (err) {
        res.status(500).send({
          error: "Something went wrong while fetching contact details",
        });
      } else if (item) {
        // Checking if some phone Number is already present then don't save and raise conflict status
        res.status(409).send({
          error:
            "Phone Number already present and is saved in name of " +
            item.firstName +
            " " +
            item.lastName,
        });
      } else {
        // everything looks good here. Insert the contact details.
        db.collection("Contacts").insertOne(contactDetails, (err, result) => {
          if (err) {
            res.status(500).send({
              error: "An error Occured" + res,
            });
          } else {
            res.send(result.ops[0]);
          }
        });
      }
    });
  });
};
