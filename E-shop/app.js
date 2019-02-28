const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./util/database");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");
db.execute("select * from products;")
  .then(data => console.log(data[0]))
  .catch(error => console.log(error));
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(require("./controllers/error").get404);

app.listen(3000);
