const express = require("express");
const { body } = require("express-validator/check");
const router = express.Router();

const User = require("../models/user");
const controller = require("../controllers/auth");

router.put(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      }),
    body("password")
      .trim()
      .isLength({ min: 5 }),
    body("name")
      .trim()
      .not()
      .isEmpty()
  ],
  controller.signup
);

router.post("/login", controller.login);

module.exports = router;
