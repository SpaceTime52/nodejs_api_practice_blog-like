const mongoose = require("mongoose"); // 몽구스를 사용하겠다.

const commentSchema = new mongoose.Schema({
  // 몽구스 스키마를 만든다.
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
});

module.exports = mongoose.model("blog_comments", commentSchema);
