const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/usersModel.js");
const { jwtSecret } = require("../config/secrets");

router.post("/register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      Users.findById(saved[0]).then(save => {
        res.status(201).json(save);
      });
    })
    .catch(error => {
      console.log("Error: ", error);
      Response.status(500).json({
        errorMessage: "Failed to register user to the database"
      });
    });
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(error => {
      console.log("Error: ", error);
      res.status(500).json({ errorMessage: "Failed to login user" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "1h"
  };
  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
