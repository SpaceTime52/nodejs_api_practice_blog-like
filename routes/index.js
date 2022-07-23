const express = require("express");
const router = express.Router();

const Post = require("../schemas/post.js"); // post의 모델 스키마 불러옴
const Comment = require("../schemas/comment.js"); // comment의 DB 모델 스키마 불러옴
const Index = require("../schemas/index.js"); // post의 모델 스키마 불러옴

// 게시글 작성 with POST
// router.post("/posts", async (req, res) => {
//   const { user, password, title, content } = req.body;

//   const post = await Post.find();

//   const createdPost = await Post.create({
//     user,
//     password,
//     title,
//     content,
//     createdAt: new Date(),
//   });

//   console.log(createdPost);

//   res.json({ message: "게시글을 생성하였습니다." });
// });

// // 게시글 조회 with GET
// router.get("/posts", async (req, res) => {
//   /*

//   */
//   res.json({ message: "게시글을 생성하였습니다." });
// });

// // 게시글 상세조회 with GET
// router.get("/posts/:_postId", async (req, res) => {
//   /*

//   */
//   res.json({ message: "게시글을 생성하였습니다." });
// });

// // 게시글 수정 with PUT
// router.put("/posts/:_postId", async (req, res) => {
//   /*

//   */
//   res.json({ message: "게시글을 수정하였습니다." });
// });

// // 게시글 삭제 with DELETE
// router.delete("/posts/:_postId", async (req, res) => {
//   /*

//   */
//   res.json({ message: "게시글을 삭제하였습니다." });
// });

module.exports = router;
