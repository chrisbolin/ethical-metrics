const { prepareVisit } = require("./lib/data");

exports.handler = async event => {
  const body = JSON.parse(event.body) || {};
  const visit = prepareVisit(body);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "OK",
      visit
    }),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
};
