const { sqlInsert } = require("./db");

describe("sqlInsert", () => {
  it("should format simple table and object", () => {
    expect(sqlInsert("cars", { make: "Ford", model: "Probe" })).toEqual([
      'INSERT INTO cars ("make", "model") VALUES ($1, $2)',
      ["Ford", "Probe"]
    ]);
  });
});
