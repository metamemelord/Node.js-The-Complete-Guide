const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const graphqlHttp = require("express-graphql");

const auth = require("./middleware/auth");
const schema = require("./graphql/schema");
const resolver = require("./graphql/resolvers");
const clearImage = require("./util/file");

const app = express();
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    const ts = new Date().getTime().toString();
    cb(null, ts + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/gif"
  ) {
    return cb(null, true);
  }
  cb(null, false);
};

const bodyParser = require("body-parser");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  if (req.method === "OPTIONS") {
    return res.status(200).send();
  }

  next();
});

app.use(bodyParser.json());
app.use(
  multer({
    storage: fileStorage,
    fileFilter
  }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(auth);

app.put("/post-image", (req, res, next) => {
  if (!auth)
    if (!req.file) {
      return res.status(200).json({ message: "No file" });
    }
  if (req.body.oldPath) {
    clearImage(req.body.oldPath);
  }
  return res.status(201).json({
    message: "File stored",
    filePath: req.file.path.replace("\\", "/")
  });
});

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    rootValue: resolver,
    graphiql: true,
    formatError(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || "An error occured";
      const status = err.originalError.code || 500;
      return {
        message,
        status,
        data
      };
    }
  })
);
app.use((error, req, res, next) => {
  console.log(error);
  console.log("Hehe has dele");
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose
  .connect(
    "mongodb+srv://metamemelord:hehehasdele@dashboard-db-wvq8d.azure.mongodb.net/node-course-messages-project",
    { useNewUrlParser: true }
  )
  .then(result => {
    app.listen(8080, err => {
      if (err) console.error(err);
      else {
        console.log("Server running on 8080");
      }
    });
  })
  .catch(err => {
    console.error(err);
  });
