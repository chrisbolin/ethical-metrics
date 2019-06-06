const express = require("express");
const { prepareVisit } = require("./lib/data");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/visits", (req, res) => {
  const visit = prepareVisit(req.body);
  console.log("INSERT INTO VISITS", visit);
  res.status(201);
  res.end();
});

app.listen(3333);
