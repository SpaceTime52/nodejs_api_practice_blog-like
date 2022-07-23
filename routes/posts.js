const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;

const Post = require("../schemas/post.js"); // post의 모델 스키마 불러옴
const Comment = require("../schemas/comment.js"); // comment의 DB 모델 스키마 불러옴
const Index = require("../schemas/index.js"); // post의 모델 스키마 불러옴

// 게시글 조회 with GET
router.get("/posts", async (req, res) => {
  const posts = await Post.find();
  console.log(posts);

  res.json({ posts });
});

// 게시글 작성 with POST
router.post("/posts", async (req, res) => {
  const { user, password, title, content } = req.body;

  await Post.create({
    user,
    password,
    title,
    content,
    createdAt: new Date(),
  });

  res.json({ message: "게시글을 생성하였습니다." });
});

router.post("/posts/many", async (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    var { user, password, title, content } = req.body[i];

    await Post.create({
      user,
      password,
      title,
      content,
      createdAt: new Date(),
    });
  }

  res.json({ message: "게시글을 생성하였습니다." });
});

// 게시글 상세조회 with GET
router.get("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;

  const posts = await Post.find();
  const filteredPosts = posts.filter((e) => e["_id"].toString() === _postId);

  res.json({ filteredPosts });
});

// 게시글 수정 with PUT
router.put("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;

  await Post.updateOne(
    {
      _id: ObjectId(_postId),
    },
    {
      $set: {
        password: password,
        title: title,
        content: content,
      },
    }
  );

  res.json({ message: "게시글을 수정하였습니다." });
});

// 게시글 삭제 with DELETE
router.delete("/posts/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  const posts = await Post.find();
  const filteredPosts = posts.filter((e) => e["_id"].toString() === _postId);
  const db_password = filteredPosts[0]["password"];

  console.log(filteredPosts, db_password, password);

  if (password != db_password) {
    res.json({ message: "패스워드가 일치하지 않습니다." });
  } else {
    await Post.deleteOne({
      _id: ObjectId(_postId),
    });

    res.json({ message: "게시글을 삭제하였습니다." });
  }
});

module.exports = router;
