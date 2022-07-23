const express = require("express");
const cors = require("cors");
const port = 3000;

const app = express();

// mongoDB Connection
const connect = require("./schemas/index.js");
connect();

const indexRouter = require("./routes/index.js");
const commentsRouter = require("./routes/comments.js");
const postsRouter = require("./routes/posts.js");

app.use(cors());
app.use(express.json());

// Routers 연결
app.use("/api", [indexRouter, commentsRouter, postsRouter]);

app.listen(port, () => {
  console.log(`${port} 번 포트로 연결이 완료되었습니다.`);
});
