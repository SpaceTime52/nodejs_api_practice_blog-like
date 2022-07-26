// app.js -> index.js의 Router를 통해 들어온 이파일은,
// 기본값 'api/comments'로 연결된 요청을 처리합니다.

// 이 파일에서 사용할 라우터 객체 생성
const express = require("express");
const router = express.Router();

// 이 파일에서 사용할 post와 comment DB가 어떻게 생겼는지 불러옵니다. (schema/comment.js)
const Comment = require("../schemas/comment.js");
const Post = require("../schemas/post.js");

//  ---------------- 여기부터 API 시작 ----------------

// ------------------
// TASK 1. 댓글 작성 with POST ('/api/comments/_postId')
router.post("/:_postId", async (req, res) => {
  // URL 뒤쪽에 params로 전달받은 _postId를 사용하겠다고 변수 선언합니다.
  const { _postId } = req.params;

  // request body 에 적힌 변수들을 기록해둡니다.
  const { user, password, content } = req.body;

  // body에 입력받은 수정할 댓글이 없으면 수정할 수 없습니다~~
  if (!content) {
    return res.json({ message: "댓글 내용을 입력해주세요" });
  }

  // _postId 와 일치하는 데이터를 DB에서 찾습니다.
  const posts = await Post.find({ _id: _postId });

  // 찾은 게 없으면, 종료합니다.
  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  // 찾은 게 있으면 comment DB에 하나 남깁니다.
  // 이 comment는 _postId '게시글'에 남겨지는 '댓글'입니다.
  await Comment.create({
    _postId,
    user,
    password,
    content,
    createdAt: new Date(),
  });

  // Response 답변합니다.
  res.json({ message: "댓글을 생성하였습니다." });
});

// ------------------
// TASK 2. 댓글 목록 조회 with GET ('/api/comments/_postId')
router.get("/:_postId", async (req, res) => {
  // URL 뒤쪽에 params로 전달받은 _postId를 사용하겠다고 변수 선언합니다.
  const { _postId } = req.params;

  // postId가 일치하는 게시글을 되도록 날짜 내림차순으로 불러와 찾아보고,
  const posts = await Post.find({ _id: _postId }).sort({ createdAt: -1 });

  // 없으면 댓글을 못씁니다~~
  if (!posts.length) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  // postId 게시글에 남겨져 있는 댓글을 Comments DB에서 날짜 내림차순으로 모두 찾아서
  const allCommentInfo = await Comment.find({ _postId }).sort({
    createdAt: -1,
  });
  const data = [];

  // 이 게시물의 댓글을 하나씩 돌면서, 응답할 배열에 넣어서 반환합니다.
  for (let i = 0; i < allCommentInfo.length; i++) {
    data.push({
      commentId: allCommentInfo[i]._id.toString(),
      user: allCommentInfo[i].user,
      content: allCommentInfo[i].content,
      createdAt: allCommentInfo[i].createdAt,
    });
  }

  // 완성된 배열은 명세서와 동일한 모양으로 나오도록 가공하여, Response json으로 응답함
  res.json({ data: data });
});

// ------------------
// TASK 3. 댓글 수정 with PUT ('/api/comments/_commentId')
router.put("/:_commentId", async (req, res) => {
  // params로 전달 받은 댓글번호 _commentId와
  const { _commentId } = req.params;
  // body로 전달 받은 password와 content를 확보합니다.
  const { password, content } = req.body;

  // params 로 입력받은 _commentId에 해당하는 댓글을 찾아서,
  const comments = await Comment.findOne({ _id: _commentId });
  // 해당하는 댓글이 없으면 수정할 수 없습니다~~
  if (!comments) {
    return res.json({ message: "해당 댓글이 없습니다." });
  }

  // body에 입력받은 수정할 댓글이 없으면 수정할 수 없습니다~~
  if (!content) {
    return res.json({ message: "댓글 내용을 입력해주세요" });
  }

  // 찾은 게 있으면 그 password와 body에 입력한 password를 비교합니다.
  const db_password = comments["password"];
  if (db_password != password) {
    return res.json({ message: "비밀번호를 확인해주세요." });
  }

  // 해당 댓글을 업데이트 합니다.
  await Comment.updateOne(
    {
      _id: _commentId, // 어떤 댓글을 수정할지 넣고,
    },
    {
      // 뭐라고 수정할지 정의합니다.
      $set: {
        password: password,
        content: content,
      },
    }
  );

  // 수정이 끝났으므로 메세지를 Response 합니다.
  res.json({ message: "댓글을 수정하였습니다." });
});

// ------------------
// TASK 4.게시글 삭제 with DELETE ('/api/comments/_commentId')
router.delete("/:_commentId", async (req, res) => {
  // params로 전달 받은 댓글번호 _commentId와
  const { _commentId } = req.params;
  // 바디를 통해 password 를 받습니다.
  const { password } = req.body;

  // _commentId 와 일치하는 comments를 불러옵니다.
  const comments = await Comment.findOne({ _id: _commentId });

  // 찾은 게 없으면 삭제할 수 없습니다.
  if (!comments) {
    return res.json({ message: "해당 댓글이 없습니다." });
  }

  // 찾은 게 있으면 그 password와 body에 입력한 password를 비교합니다.
  const db_password = comments["password"];
  if (db_password != password) {
    return res.json({ message: "비밀번호를 확인해주세요." });

    // password 일치하면 그걸 지웁니다~~
  } else {
    await Comment.deleteOne({ _id: _commentId });

    // 지웠으니까 여기서 메세지를 Response 합니다.
    return res.json({ message: "댓글을 삭제하였습니다." });
  }
});

// ------------------
// 댓글 작성 with POST many ('/api/comments/_postId/many')
// 특정 게시글에 벌크로 댓글을 남깁니다. (DB 초기화 위해서 만들어봤어요)
router.post("/:_postId/many", async (req, res) => {
  const { _postId } = req.params;

  const posts = await Post.find({ _id: _postId });
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

module.exports = router;
