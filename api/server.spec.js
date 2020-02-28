const request = require("supertest");
const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("server", function() {
  it("should use the testing environment", function() {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("GET /", function() {
    it("should return 200", function() {
      return request(server)
        .get("/")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  it("should return {api: 'Server is working'}", function() {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.body).toEqual({ api: "Server is working" });
      });
  });

  it("should return JSON formatted body", function() {
    return request(server)
      .get("/")
      .then(res => {
        expect(res.type).toMatch(/json/);
      });
  });

  describe("users model", function() {
    beforeEach(async () => {
      await db("users").truncate();
    });
    describe("POST /api/auth/register", function() {
      it("should register the provided user into the db", done => {
        return request(server)
          .post("/api/auth/register")
          .send({ username: "DrManhattan", password: "mars" })
          .set("Accept", "application/json")
          .expect(201)
          .end(function(error, res) {
            if (error) return done(error);
            done();
          });
      });
    });
  });
});
