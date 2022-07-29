// 이 미들웨어를 거쳐가면 로그인 된 것으로 인증된 것임
const jwt = require("jsonwebtoken");

// DB의 유저 모델을 참고하여 인증을 진행함
const { User } = require("../models");

// 우리가 Export할 미들웨어 시작
const authMiddleware = (req, res, next) => {
  // Client 요청의 header 중 authorization을 읽어들여서,공백을 기준으로 둘로 나눔
  const { authorization } = req.headers;
  const [authType, authToken] = (authorization || "").split(" ");

  // 전달받은 인증값이 Bearer가 아니면 반려
  if (authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 사용해주세요",
    });
    return;
  }

  // 우리 Bearer 토큰을 전달한 게 맞는데 요청한 pathrk 로그인이나 signup이면,
  if (req.path.includes("/login") || req.path.includes("/signup")) {
    res.status(401).send({
      errorMessage: "이미 로그인이 되어 있습니다.",
    });
    return;
  }

  // 뒤쪽 authToken을 우리 secretKey를 가지고 인증해보고 에러 없으면, user 정보를 토근으로 다음 next으로 넘겨줌
  try {
    //
    jwt.verify(
      authToken,
      "mySecretKey",

      async (error, decoded) => {
        // 인증 결과 에러가 나타나면 클라이언트와 서버에 모두 에러를 던지고 미들웨어 종료
        if (error) {
          res.status(401).send({
            errorMessage: "이용에 문제가 있습니다. 관리자에게 문의해주세요.",
          });
          console.error(error);
          return;
        }

        // 에러없이 잘 인증 된거면, 인증된 사용자이므로 decoding 된 decode 객체가 생김
        // 이 decoded 객체로 DB로부터 사용자 정보를 빼 와서 토큰을 res.locals(전역 객체) 위치에 반환
        let user = await User.findOne({ where: { userId: decoded.userId } });
        res.locals.user = user;
        next();
      }
    );

    // 에러 생기면 에러메세지
  } catch (e) {
    res.status(401).send({
      errorMessage: "로그인 후 사용하세요",
    });
    return;
  }
};

module.exports = authMiddleware;
