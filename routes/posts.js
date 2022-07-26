const express = require("express");
const router = express.Router();
const ObjectId = require("mongodb").ObjectID;

const Post = require("../schemas/post.js"); // post의 모델 스키마 불러옴

// 게시글 조회 with GET
router.get("/", async (req, res) => {
  const dataAll = await Post.find();
  const data = [];

  for (let i = 0; i < dataAll.length; i++) {
    data.push({
      postId: dataAll[i]._id.toString(),
      user: dataAll[i].user,
      title: dataAll[i].title,
      createdAt: dataAll[i].createdAt,
    });
  }

  res.json({ data: data });
});

// 게시글 작성 with POST
router.post("/", async (req, res) => {
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

// 게시글 작성 여러개 한꺼번에 with POST
router.post("/many", async (req, res) => {
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
router.get("/:_postId", async (req, res) => {
  const { _postId } = req.params;

  const thisPost = await Post.find({ _id: ObjectId(_postId) });
  if (!thisPost.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  const posts = await Post.find();
  const filteredPosts = posts.filter((e) => e["_id"].toString() === _postId);

  const data = [
    {
      postId: filteredPosts[0]._id.toString(),
      user: filteredPosts[0].user,
      title: filteredPosts[0].title,
      content: filteredPosts[0].content,
      createdAt: filteredPosts[0].createdAt,
    },
  ];

  res.json({ data: data });
});

// 게시글 수정 with PUT
router.put("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password, title, content } = req.body;

  const thisPost = await Post.find({ _id: ObjectId(_postId) });

  if (!thisPost.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

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
router.delete("/:_postId", async (req, res) => {
  const { _postId } = req.params;
  const { password } = req.body;

  const posts = await Post.find();
  const thisPost = await Post.find({ _id: ObjectId(_postId) });

  if (!thisPost.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

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
