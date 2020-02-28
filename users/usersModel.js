const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById
};

function find() {
  return db("users")
    .orderBy([{ column: "id" }, { column: "username", order: "desc" }])
    .select("id", "username");
}

function findBy(filter) {
  return db("users").where(filter);
}

function add(user) {
  return db("users").insert(user, "user");
}

function findById(id) {
  return db("users")
    .where({ id })
    .first()
    .select("id", "username");
}
