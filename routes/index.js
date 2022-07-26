const express = require("express");
const router = express.Router();

// const Post = require("../schemas/post.js"); // post의 모델 스키마 불러옴
// const Comment = require("../schemas/comment.js"); // comment의 DB 모델 스키마 불러옴
// const Index = require("../schemas/index.js"); // post의 모델 스키마 불러옴

// Route the 2 paths "/api/comments, /api/posts"
const commentsRouter = require("./comments.js");
const postsRouter = require("./posts.js");

router.use("/posts", [postsRouter]);
router.use("/comments", [commentsRouter]);

module.exports = router;
