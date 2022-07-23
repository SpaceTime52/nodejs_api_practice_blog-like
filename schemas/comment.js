const mongoose = require("mongoose"); // 몽구스를 사용하겠다.

const commentSchema = new mongoose.Schema({
  _postId: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("blog_comments", commentSchema);
