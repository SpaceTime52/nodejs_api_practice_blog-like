const express = require("express");
const router = express.Router();

const Comment = require("../schemas/comment.js"); // comment의 DB 모델 스키마 불러옴
const post = require("../schemas/post.js"); // post의 모델 스키마 불러옴
const Index = require("../schemas/index.js"); // post의 모델 스키마 불러옴

// 댓글 작성 with POST
router.post("/comments/:_postId", async (req, res) => {
  /*
  



  */
  res.json({ message: "댓글을 생성하였습니다." });
});

// 댓글 목록 조회 with GET
router.get("/comments/:_postId", async (req, res) => {
  /*




  */
  res.json({ message: "게시글을 생성하였습니다." });
});

// 댓글 수정 with PUT
router.put("/comments/:_commentId", async (req, res) => {
  /*




  */
  res.json({ message: "댓글을 수정하였습니다." });
});

// 게시글 삭제 with DELETE
router.delete("/comments/:_commentId", async (req, res) => {
  /*




  */
  res.json({ message: "댓글을 삭제하였습니다." });
});

module.exports = router;

/* 
const { userId } = req.query; // 쿼리로 userId 받기
  const comment = await comment.find({ userId }); // userId의 쿼리정보를 받아 탐색
  const postIds = comment.map((el) => el.postId); // user의 카트의 상품번호 리스트

  // 상품번호 리스트에 맞는 상품정보 리스트
  const post = await post.find({ postId: postIds });

  // 반환할 정보
  const postInfo = comment.map((comment_item) => {
    return {
      quantity: comment_item.quantity,
      post: post.find((item) => {
        return item.postId === comment_item.postId;
      }),
    };
  });

  res.json({ userId: userId, postInfo });
  * / 


  /*   

  res.json({ comment: createdcomment });
  */
