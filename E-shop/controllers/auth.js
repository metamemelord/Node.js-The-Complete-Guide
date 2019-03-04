const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("5c7c1208f479600a14793191")
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      return req.session.save();
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect("/");
  });
};
