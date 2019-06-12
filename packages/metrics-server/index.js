const { prepareVisit } = require("./lib/data");
const { insertVisit } = require("./lib/db");

exports.handler = async event => {
  const body = JSON.parse(event.body) || {};
  let result;

  switch (event.httpMethod) {
    case "POST": {
      const visit = prepareVisit(body);
      result = await insertVisit(visit);
      break;
    }
    default: {
      result = { message: "OK" };
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify(result),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};
