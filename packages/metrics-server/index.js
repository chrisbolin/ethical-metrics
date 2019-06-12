const { prepareVisit } = require("./lib/data");
const { insertVisit } = require("./lib/db");

exports.handler = async event => {
  const body = JSON.parse(event.body) || {};
  const visit = prepareVisit(body);
  const result = await insertVisit(visit);

  return {
    statusCode: 200,
    body: JSON.stringify({
      visit,
      result
    }),
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };
};
