const mongoose = require("mongoose"); // 몽구스를 사용하겠다는 선언

// 몽구스로 comment라는 객체는 이런 모양으로 받겠다고 선언
const commentSchema = new mongoose.Schema({
  _postId: {
    type: String, // 문자열
    required: true, // 필수로 입력해야 함~~
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
    type: Date, // 이건 날짜 Date 형태로 받습니다.
    required: true,
  },
});

// 이로써 comments 관련 DB는, 여기서 만든 몽구스 모델을 기준으로 받겠다고 외부에 선언/공개합니다.
module.exports = mongoose.model("blog_comments", commentSchema);
