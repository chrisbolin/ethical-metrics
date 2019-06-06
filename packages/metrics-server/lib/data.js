const crypto = require("crypto");

function hash(value, salt = "") {
  const shaHash = crypto.createHash("sha256");
  shaHash.update(value + salt);
  return shaHash.digest("hex");
}

function row(payload) {
  return {
    ...payload,
    createdAt: new Date().toISOString()
  };
}

module.exports = { hash, row };
