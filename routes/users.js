// app.js -> index.js의 Router를 통해 들어온 이파일은,

// 이 파일에 필요한 외부 모듈 import
const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const MY_SECRET_KEY = "mySecretKey";
// const { Op } = require("sequelize");

// 이 파일에서 사용할 라우터 객체 생성
const router = express.Router();

// models 폴더 안에 있는 User DB 모델을 가져다 사용합니다.
const { User } = require("../models");

// 특히 User 정보는, Joi라는 모듈을 활용하여 validataion 처리합니다.

// 회원가입할 떄 user 정보에 대한 joi 객체
const postUsersSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).alphanum().required(), // 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
  password: Joi.string().min(4).max(30).alphanum().required(), // 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패 (API에서 검토)
  confirm: Joi.string().min(4).max(30).alphanum().required(),
});

// 로그인 할 떄 user 입력된 정보에 대한 joi 객체
const postAuthSchema = Joi.object({
  nickname: Joi.string().min(3).max(30).alphanum().required(),
  password: Joi.string().min(4).max(30).required(),
});

//  ---------------- 여기부터 API 시작 ----------------
// 기본값 '/api/'로 연결된 요청 중 user 관련 요청을 처리하는 API를 만듭니다.

// ------------------
// TASK 1 : 회원 가입 API with POST  ('/api/signup' POST로 접근 시)
router.post("/signup", authMiddleware, async (req, res) => {
  // joi 객체의 스키마를 잘 통과했는지 확인
  try {
    const { nickname, password, confirm } = await postUsersSchema.validateAsync(
      req.body
    );
  } catch (error) {
    res.status(400).send({
      errorMessage: "입력하신 아이디와 패스워드를 확인해주세요.",
    });
  }

  // ---- 추가적인 유효성 검사 (validation) ------
  // 입력된 패스워드 2개가 같은지 확인
  if (password !== confirm) {
    res.status(400).send({
      errorMessage: "입력하신 두개의 비밀번호가 다릅니다",
    });
    return;
  }

  // 패스워드가 닉네임을 포함하는지 확인
  if (password.includes(nickname)) {
    res.status(400).send({
      errorMessage: "비밀번호는 닉네임을 포함할 수 없습니다. ",
    });
    return;
  }
  // ---- 추가적인 유효성 검사 (validation) End ------

  // 기존에 같은 닉네임을 가진 유저가 있는지 확인
  const existUsers = await User.findOne({
    where: { nickname },
  });

  // 찾은 사용자가 없으면 에러메세지
  if (existUsers) {
    res.status(400).send({
      errorMessage: "이미 사용중인 닉네임 입니다.",
    });
    return;
  }

  // 여기까지 오면, ID, PW 생성 (회원가입 완료)
  await User.create({ nickname, password });

  res.json({ message: "회원 가입에 성공하였습니다." }); // 값이 다 넣어진 배열을 Response 해줍니다.
});

// ------------------
// TASK 2 : 게시글 작성 with user ('/api/users')
router.post("/login", authMiddleware, async (req, res) => {
  // joi 객체의 스키마를 잘 통과했는지 확인
  try {
    const { nickname, password } = await postAuthSchema.validateAsync(req.body);
  } catch (error) {
    res.status(400).send({
      errorMessage: "유효한 아이디와 패스워드를 입력해주세요.",
    });
  }

  // 입력된 정보로 존재하는 사용자 찾기
  const user = await User.findOne({ where: { nickname, password } });

  // 찾아봤는데 사용자 없으면 리턴
  if (!user) {
    res.status(400).send({
      errorMessage: "닉네임 또는 패스워드를 확인해주세요.",
    });
    return;
  }

  // 사용자 있으면 토큰을 발행하여 전달
  const token = jwt.sign({ userId: user.userId }, MY_SECRET_KEY);

  // 명세서대로 토큰을 Response로 반환 해줍니다.
  res.json({ token });
});

// 이 파일의 router 객체를 외부에 공개합니다.
module.exports = router;
