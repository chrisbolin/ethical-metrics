const crypto = require("crypto");
const url = require("url");

const parseUA = require("ua-parser-js");

function hash(value, salt = "") {
  const shaHash = crypto.createHash("sha256");
  shaHash.update(value + salt);
  return shaHash.digest("hex");
}

function prepareVisit(payload) {
  const createdAt = new Date().toISOString();
  const userAgentDetails = parseUA(payload.userAgent);
  const { hostname } = url.parse(payload.href);
  const visitorID = hash(payload.clientVisitorID, hostname);
  delete payload.clientVisitorID;

  return {
    ...payload,
    hostname,
    visitorID,
    createdAt,
    browser: userAgentDetails.browser.name,
    browserVersion: userAgentDetails.browser.version,
    model: userAgentDetails.device.model,
    os: userAgentDetails.os.name,
    osVersion: userAgentDetails.os.version
  };
}

module.exports = { hash, prepareVisit };
