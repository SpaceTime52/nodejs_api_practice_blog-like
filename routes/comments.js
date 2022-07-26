const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;

const Comment = require("../schemas/comment.js"); // comment의 DB 모델 스키마 불러옴
const Post = require("../schemas/post.js"); // post의 모델 스키마 불러옴

// 댓글 작성 with POST
router.post("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { user, password, content } = req.body;

  const posts = await Post.find({ _id: ObjectId(_postId) });
  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  await Comment.create({
    _postId,
    user,
    password,
    content,
    createdAt: new Date(),
  });

  res.json({ message: "댓글을 생성하였습니다." });
});

// 댓글 작성 with POST many
router.post("/:_postId/many", async (req, res) => {
  const { _postId } = req.params;

  const posts = await Post.find({ _id: ObjectId(_postId) });
  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  for (let i = 0; i < req.body.length; i++) {
    var { user, password, content } = req.body[i];

    await Comment.create({
      _postId,
      user,
      password,
      content,
      createdAt: new Date(),
    });
  }

  res.json({ message: "댓글을 생성하였습니다." });
});

// 댓글 목록 조회 with GET
router.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;

  const posts = await Post.find({ _id: ObjectId(_postId) });
  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  const allCommentInfo = await Comment.find({ _postId });
  const data = [];

  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  for (let i = 0; i < allCommentInfo.length; i++) {
    data.push({
      commentId: allCommentInfo[i]._id.toString(),
      user: allCommentInfo[i].user,
      content: allCommentInfo[i].content,
      createdAt: allCommentInfo[i].createdAt,
    });
  }

  res.json({ data: data });
});

// 댓글 수정 with PUT
router.put("/:_commentId", async (req, res) => {
  const { _commentId } = req.params;
  const { password, content } = req.body;

  const comments = await Comment.find({ _id: ObjectId(_commentId) });

  if (!comments.length) {
    return res.json({ message: "해당 댓글이 없습니다." });
  }

  await Comment.updateOne(
    {
      _id: ObjectId(_commentId),
    },
    {
      $set: {
        password: password,
        content: content,
      },
    }
  );

  res.json({ message: "댓글을 수정하였습니다." });
});

// 게시글 삭제 with DELETE
router.delete("/:_commentId", async (req, res) => {
  const { _commentId } = req.params;
  const { password } = req.body;

  const comments = await Comment.find({ _id: ObjectId(_commentId) });

  console.log(comments);

  if (!comments.length) {
    return res.json({ message: "해당 댓글이 없습니다." });
  }

  const db_password = comments[0]["password"];

  if (db_password != password) {
    return res.json({ message: "비밀번호를 확인해주세요." });
  } else {
    await Comment.deleteOne({ _id: ObjectId(_commentId) });
    return res.json({ message: "댓글을 삭제하였습니다." });
  }
});

module.exports = router;
