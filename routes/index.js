const express = require("express");
const router = express.Router();
const fs = require("fs");
const marked = require("marked");

// const Post = require("../schemas/post.js"); // post의 모델 스키마 불러옴
// const Comment = require("../schemas/comment.js"); // comment의 DB 모델 스키마 불러옴
// const Index = require("../schemas/index.js"); // post의 모델 스키마 불러옴

// Route the 2 paths "/api/comments, /api/posts"

marked.use({
  pedantic: false,
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: false,
  xhtml: true,
});

const commentsRouter = require("./comments.js");
const postsRouter = require("./posts.js");

router.get("/", async (req, res) => {
  var path = __dirname + "/../README.md";
  var file = fs.readFileSync(path, "utf8");
  res.send(marked.parse(file.toString()));
});

router.use("/posts", [postsRouter]);
router.use("/comments", [commentsRouter]);

module.exports = router;
