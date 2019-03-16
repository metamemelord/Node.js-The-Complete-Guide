const { validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then(hashedPassword => {
      let user = new User({
        email,
        name,
        password: hashedPassword
      });
      return user.save();
    })
    .then(user => {
      res.status(201).json({ message: "CREATED", userId: user._id });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        const error = new Error("No user found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(success => {
      if (success) {
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString()
          },
          "3gL-7$nEvXs2HFFj-rwzpTw%yFCYEM!-g$J-@R@J_gr4WNzuVBqDY3VPaEr-",
          { expiresIn: "1h" }
        );

        res
          .status(200)
          .json({ message: "OK", token, userId: loadedUser._id.toString() });
      } else {
        const error = new Error("Wrong password");
        error.statusCode = 401;
        throw error;
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      return next(err);
    });
};
