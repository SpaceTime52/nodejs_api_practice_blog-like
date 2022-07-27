// express 모듈을 불러오고, 보안(CORS),포트 등 환경 초기화
const express = require("express");
const cors = require("cors");
const port = 3000;

// express 객체 선언, 각종 middleware 설치
const app = express();
app.use(cors());
app.use(express.json());

// mongoDB에 연결
const connect = require("./schemas/index.js");
connect();

// "/api" path로 연결하는 라우터 연결 (우선 routes/index.js로)
const indexRouter = require("./routes/index.js");
app.use("/api", [indexRouter]);

// 포트 열어서 Request Listening..
app.listen(port, () => {
  console.log(`${port} 번 포트로 연결이 완료되었습니다.`);
});
