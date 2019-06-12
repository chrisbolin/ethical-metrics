const { prepareVisit } = require("./lib/data");
const { insertVisit } = require("./lib/db");

exports.handler = async event => {
  const requestBody = JSON.parse(event.body) || {};
  let result;
  let body, statusCode;

  try {
    switch (event.httpMethod) {
      case "POST": {
        const visit = prepareVisit(requestBody);
        await insertVisit(visit);
        body = visit;
        statusCode = 201;
        break;
      }
      default: {
        statusCode = 200;
        body = { message: "OK" };
      }
    }
  } catch (error) {
    statusCode = 500;
    body = { error: error.message };
  }
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};
