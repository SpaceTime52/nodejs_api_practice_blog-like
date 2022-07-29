// '/api'로 들어온 경우에 '/api/posts' '/api/comments', '/api '로 연결해주는 역할을 함

// express와 이 파일의 router 객체 초기화
const express = require("express");
const router = express.Router();

// '/api/posts' '/api/comments'로 들어오는 건 아래 두 파일 (comments.js, posts.js)에서 처리하겠다는 내용
const usersRouter = require("./users.js");
router.use("/", [usersRouter]);

const postsRouter = require("./posts.js");
router.use("/posts", [postsRouter]);

const commentsRouter = require("./comments.js");
router.use("/comments", [commentsRouter]);

// 13~29번째 라인은 - '/api' 메인 페이지를 README.md로 연결하기 위한 작업이니 무시하셔도 됩니다.
const fs = require("fs");
const marked = require("marked");
marked.use({
  pedantic: false,
  gfm: true,
  breaks: true,
  smartLists: true,
  smartypants: false,
  xhtml: true,
});

router.get("/", async (req, res) => {
  var path = __dirname + "/../README.md";
  var file = fs.readFileSync(path, "utf8");
  res.send(marked.parse(file.toString()));
});

// 이 파일에서 만든 router 객체를 외부에 공개 -> app.js에서 사용할 수 있도록
module.exports = router;
