const crypto = require("crypto");
const url = require("url");

const parseUA = require("ua-parser-js");

const PRIVATE_SALT = "e74a3078585adff8695df9ce1102b13e";

function hash(value, salt = "") {
  const shaHash = crypto.createHash("sha256");
  shaHash.update(value + salt);
  return shaHash.digest("hex");
}

function prepareVisit(payload) {
  const createdAt = new Date().toISOString();
  const userAgentDetails = parseUA(payload.userAgent);
  const { hostname } = url.parse(payload.href);
  const deviceID = hash(payload.clientDeviceID, PRIVATE_SALT);
  delete payload.clientDeviceID;

  return {
    ...payload,
    hostname,
    deviceID,
    createdAt,
    browser: userAgentDetails.browser.name,
    browserVersion: userAgentDetails.browser.version,
    model: userAgentDetails.device.model,
    os: userAgentDetails.os.name,
    osVersion: userAgentDetails.os.version
  };
}

module.exports = { hash, prepareVisit };
