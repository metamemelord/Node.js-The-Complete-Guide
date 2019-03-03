const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("5c7c1208f479600a14793191")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://metamemelord:hehehasdele@dashboard-db-wvq8d.azure.mongodb.net/node-course",
    { useNewUrlParser: true }
  )
  .then(result => {
    return User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Gaurav",
          email: "me@metamemelord.com",
          cart: []
        });
        return user.save();
      }
    });
  })
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
