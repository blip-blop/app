const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  jobDescription: {
    type: String,
    required: true,
  },
  jobDate: {
    type: String,
    required: true,
  },
  employerId: {
    type: String,
    required: false,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
