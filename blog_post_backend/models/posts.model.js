const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userid: {
      type: String,
      required: true,
      minlength: 10,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 11,
    },
    content: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 20,
    },
  },
  {
    timestamps: true,
  }
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
