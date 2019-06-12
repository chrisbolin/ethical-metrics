const { Client } = require("pg");

function createClient() {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "metrics",
    password: "",
    port: 5432
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

module.exports = { insertVisit, sqlInsert };
