const express = require("express");

const app = express();
const bodyParser = require("body-parser");

const feedRoutes = require("./routes/feed");

app.use(bodyParser.json());
app.use("/feed", feedRoutes);
app.listen(8080, err => {
  if (err) console.error(err);
  else console.log("Server running on 8080");
});
