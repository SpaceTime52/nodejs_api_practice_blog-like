const express = require("express");
const cors = require("cors");
const port = 3000;

// express 객체 선언, middleware 설치
const app = express();
app.use(cors());
app.use(express.json());

// mongoDB Connection
const connect = require("./schemas/index.js");
connect();

// route the "/api" path
const indexRouter = require("./routes"); // /index.js 생략
app.use("/api", [indexRouter]);

// Open the port, and keep Listening..
app.listen(port, () => {
  console.log(`${port} 번 포트로 연결이 완료되었습니다.`);
});
