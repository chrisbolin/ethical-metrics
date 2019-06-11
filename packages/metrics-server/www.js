const express = require("express");

const { prepareVisit } = require("./lib/data");
const { listVisits, insertVisit } = require("./lib/db");

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

app
  .route("/visits")
  .post((req, res) => {
    const visit = prepareVisit(req.body);
    insertVisit(visit);
    res.status(201);
    res.json(visit);
  })
  .get((req, res) => {
    res.json(listVisits());
  });

app.listen(3333);
