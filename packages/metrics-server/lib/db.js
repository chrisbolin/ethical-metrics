const { Client } = require("pg");

function createClient() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
  });
  client.connect();
  return client;
}

function sqlInsert(tableName, row) {
  const names = Object.keys(row);
  const values = names.map(name => row[name]);
  const namesSql = names.map(name => `"${name}"`).join(", ");
  const placeholdersSql = names
    .map((name, index) => `$${index + 1}`)
    .join(", ");
  const sql = `INSERT INTO ${tableName} (${namesSql}) VALUES (${placeholdersSql})`;

  return [sql, values];
}

async function insertVisit(visit) {
  const client = createClient();
  const result = await client.query(...sqlInsert("visits", visit));
  await client.end();

  return result;
}

async function createVisitsTable() {
  const client = createClient();
  const result = await client.query(`
  CREATE TABLE visits (
      id SERIAL PRIMARY KEY,
      "clientIDVersion" text,
      href text,
      "innerWidth" integer,
      "innerHeight" integer,
      referrer text,
      "userAgent" text,
      timezone text,
      "deviceID" text,
      "createdAt" timestamp with time zone,
      browser text,
      "browserVersion" text,
      os text,
      "osVersion" text,
      model text
  );
  `);
  await client.end();

  return result;
}

module.exports = { insertVisit, createVisitsTable, sqlInsert };
