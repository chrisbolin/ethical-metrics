const express = require("express");

const { handler } = require("./index");

const app = express();

app.use(express.json());

app.route("/").post(async (req, res) => {
  const event = {
    body: JSON.stringify(req.body)
  };

  const { statusCode, body, headers } = await handler(event);

  res.status(statusCode);
  res.set(headers);
  res.send(body);
});

app.listen(3333);
