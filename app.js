// express 모듈을 불러오고, 보안(CORS),포트 등 환경 초기화
const express = require("express");
const cors = require("cors");
const port = 8000;

// express 객체 선언, 각종 middleware 설치
const app = express();
app.use(cors());
app.use(express.json());

// DB에 연결 - sync() 사용으로 DB 모델(./models)의 변화를 감지하여 동기화
const { sequelize } = require("./models");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// queryInterface: 데이터베이스의 테이블이나 컬럼을 생성하고 이름을 바꾸는 등의 쿼리문을 만드는 데 활용한다.
// const queryInterface = sequelize.getQueryInterface();
// queryInterface.dropTable("Tests");

// "/api" path로 연결하는 라우터 연결 (우선 routes/index.js로)
const indexRouter = require("./routes/index.js");
app.use("/api", [indexRouter]);

// 포트 열어서 Request Listening..
app.listen(port, () => {
  console.log(`${port} 번 포트로 연결이 완료되었습니다.`);
});
