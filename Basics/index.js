const http = require("http");

const server = http.createServer((req, res) => {
  let body = [];
  req.on("data", data => {
    body.push(data);
  });
  req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = JSON.parse(parsedBody)["hehe"];
    res.setHeader("Content-type", "application/json");
    res.write(JSON.stringify({ message }));
    res.end();
  });
});

server.listen(3000);
