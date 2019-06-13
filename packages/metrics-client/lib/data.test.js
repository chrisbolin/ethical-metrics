import { clientVisitorID } from "./data";

beforeAll(() => {
  const _consoleError = console.error;
  console.error = (...params) => {
    if (params[0].match(/Not implemented: HTMLCanvasElement/)) {
      return;
    }
    _consoleError(...params);
  };
});

describe("clientVisitorID", () => {
  it("should produce a reliable ID", done => {
    clientVisitorID().then(id => {
      expect(id).toBe("1d562f6e61e1cb2eeb49529c3207dd58");
      done();
    });
  });
});
