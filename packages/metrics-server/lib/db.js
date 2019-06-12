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
      "id" SERIAL PRIMARY KEY,
      "browser" text,
      "browserVersion" text,
      "clientIDVersion" text,
      "createdAt" timestamp with time zone,
      "hostname" text,
      "href" text,
      "innerHeight" integer,
      "innerWidth" integer,
      "model" text,
      "os" text,
      "osVersion" text,
      "referrer" text,
      "timezone" text,
      "userAgent" text,
      "visitorID" text
  );

  CREATE INDEX "visits_hostname_createdat_vistorid_idx" ON visits (
    "hostname",
    "createdAt",
    "visitorID"
  );
  `);
  await client.end();

  return result;
}

module.exports = { insertVisit, createVisitsTable, sqlInsert };
