const router = require("express").Router();

const Users = require("./users-model.js");

// router.get("/", (request, response) => {
//   Users.find()
//     .then(users => {
//       response.status(200).json(users);
//     })
//     .catch(error => {
//       console.log("Error: ", error);
//       response.status(500).json({ errorMessage: "Failed to retrieve users" });
//     });
// });

module.exports = router;
