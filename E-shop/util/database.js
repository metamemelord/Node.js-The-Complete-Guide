const mysql = require("mysql2");

const connectionPool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "node_course",
  password: "1234"
});

module.exports = connectionPool.promise();
