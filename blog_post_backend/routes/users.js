var express = require("express");
var router = express.Router();
let users = require("../models/users.model");
var bcrypt = require("bcryptjs");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.route("/signup").post(async (req, res) => {
  console.log("/signup");
  const username = req.body.name;
  const email = req.body.email;
  const temppassword = req.body.password;

  const saltvalue = await bcrypt.genSaltSync(10);
  const password = await bcrypt.hashSync(temppassword, saltvalue);

  const newUser = new users({ username, email, password });

  newUser
    .save()
    .then(() => {
      async function abc(user) {
        const token1 = await user.generateAuthToken();
      }

      abc(newUser);
      res.json("User added!");
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/auth").post((req, res) => {
  const token = req.body;
  console.log(token);
  users
    .find({ tokens: token })
    .then((user) => {
      console.log(user);
      return res.send({ userid: user[0]._id, username: user[0].username });
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/signin").post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  users
    .find({ email: email })
    .then((user) => {
      const pass = bcrypt.compareSync(password, user[0].password);
      if (pass === true) {
        return res.json(user[0].tokens[0]);
      } else {
        return res.json("not-authenticated");
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
