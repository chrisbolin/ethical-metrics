const crypto = require("crypto");

const PRIVATE_SALT = "e74a3078585adff8695df9ce1102b13e";

function hash(value, salt = "") {
  const shaHash = crypto.createHash("sha256");
  shaHash.update(value + salt);
  return shaHash.digest("hex");
}

function row(payload) {
  const createdAt = new Date().toISOString();
  const deviceID = hash(payload.clientDeviceID, PRIVATE_SALT);
  delete payload.clientDeviceID;

  return {
    ...payload,
    deviceID,
    createdAt
  };
}

module.exports = { hash, row };
