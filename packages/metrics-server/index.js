const { prepareVisit } = require("./lib/data");
const { insertVisit, createVisitsTable } = require("./lib/db");

exports.handler = async event => {
  const requestBody = JSON.parse(event.body) || {};
  let result;
  let body, statusCode;

  try {
    switch (event.httpMethod) {
      case "POST": {
        const visit = prepareVisit(requestBody);
        await insertVisit(visit);
        body = { message: "visit recorded" };
        statusCode = 201;
        break;
      }
      case "LINK": {
        await createVisitsTable();
        statusCode = 201;
        body = { message: "visits table created" };
        break;
      }
      default: {
        statusCode = 200;
        body = { message: "OK" };
        break;
      }
    }
  } catch (error) {
    statusCode = 500;
    body = { error: error.message, stack: error.stack };
  }
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept",
      "Content-Type": "application/json"
    }
  };
};
