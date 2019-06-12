const express = require("express");

const { handler } = require("./index");

const app = express();

app.use(express.json());

app.route("/").all(async (req, res) => {
  const event = {
    body: JSON.stringify(req.body),
    httpMethod: req.method
  };

  console.log(event);

  const { statusCode, body, headers } = await handler(event);

  res.status(statusCode);
  res.set(headers);
  res.send(body);
});

app.listen(3333);
