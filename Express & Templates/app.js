const express = require("express");
const app = express();
const path = require("path");

const expressHbs = require("express-handlebars");

//app.engine("hbs", expressHbs({ layoutsDir: "views/layout/", defaultLayout: "main", extname: "hbs"}));
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoute = require("./routes/admin");
const shopRouter = require("./routes/shop");

app.use("/admin", adminRoute.router);
app.use(shopRouter);
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).render("404", { docTitle: "Sed" });
  //res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(process.env.PORT || 3000, error => {
  if (error) {
    console.log("Could not start the server!");
  } else {
    console.log(`Server running on port ${process.env.PORT || 3000}`);
  }
});
