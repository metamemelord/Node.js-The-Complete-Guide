const fs = require("fs");
const path = require("path");

module.exports = function(filePath) {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, err => console.log(err));
};
