var express = require("express");
var router = express.Router();
let posts = require("../models/posts.model");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/all-posts", function (req, res, next) {
  posts.find({}, (err, allposts) => {
    if (err) res.send(err);
    else res.send(allposts);
  });
});

router.route("/create-post").post((req, res) => {
  console.log("/create-post");

  const { userid, username, title, content } = req.body;

  const newPost = new posts({ userid, username, title, content });

  newPost
    .save()
    .then(() => res.json("post added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.patch("/:id", function (req, res) {
  const { content } = req.body;
  posts.findById(req.params.id, function (err, post) {
    if (!err) {
      post.content = content;
      post.save(function (err) {
        if (err) res.send(err);
        else res.send({ message: "successfull" });
      });
    } else res.send(err);
  });
});

router.route("/:id").delete((req, res) => {
  console.log(req.params.id);
  posts
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Post Deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  posts.findById(req.params.id, function (err, post) {
    if (!err) {
      res.send(post);
    } else res.send(err);
  });
});

module.exports = router;
