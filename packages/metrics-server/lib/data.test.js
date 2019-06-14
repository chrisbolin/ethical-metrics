const { hash, prepareVisit } = require("./data");

describe("hash", () => {
  it("should hash a string", () => {
    expect(hash("123")).toBe(
      "a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3"
    );
  });

  it("should hash a string with a salt", () => {
    expect(hash("123", "456")).toBe(
      "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92"
    );
  });

  it("should apply the salt", () => {
    const value = "a";
    const salt = "b";
    const hashWithoutSalt = hash(value);
    const hashWithSalt = hash(value, salt);

    expect(hashWithSalt).not.toBe(hashWithoutSalt);
    expect(hashWithSalt.length).toBe(hashWithoutSalt.length);
  });
});

describe("prepareVisit", () => {
  it("should add createdAt ISO timestamp", () => {
    const beforeCreatedAt = new Date().toISOString();
    const visit = prepareVisit({ href: "https://bolin.co" });
    const afterCreatedAt = new Date().toISOString();
    expect(beforeCreatedAt <= visit.createdAt).toBeTruthy();
    expect(afterCreatedAt >= visit.createdAt).toBeTruthy();
  });

  it("should create visitorID and remove clientVisitorID", () => {
    const clientVisitorID = "123";
    const visit = prepareVisit({ clientVisitorID, href: "https://bolin.co" });
    expect(visit.visitorID).toHaveLength(64);
    expect(visit.visitorID).not.toEqual(clientVisitorID);
    expect(visit.clientVisitorID).toBeUndefined();
  });
});
