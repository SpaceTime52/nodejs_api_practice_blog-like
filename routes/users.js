// app.js -> index.js의 Router를 통해 들어온 이파일은,

// 이 파일에 필요한 외부 모듈 import
const express = require("express");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const MY_SECRET_KEY = "mySecretKey";
const { Op } = require("sequelize");

// 이 파일에서 사용할 라우터 객체 생성
const router = express.Router();

// models 폴더 안에 있는 User DB 모델을 가져다 사용합니다.
const { User } = require("../models");

// 특히 User 정보는, Joi라는 모듈을 활용하여 validataion 처리합니다.

// 회원가입할 떄 user 정보에 대한 joi 객체
const postUsersSchema = Joi.object({
  nickname: Joi.string()
    .min(3)
    .max(30)
    .alphanum()
    .required()
    .invalid(Joi.in("password")),
  // 최소 3자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)
  password: Joi.string().min(4).max(30).alphanum().required(), // 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패
  confirm: Joi.string()
    .valid(Joi.ref("password"))
    .min(4)
    .max(30)
    .alphanum()
    .required(),
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
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;

  res.json({ message: "유효한 닉네임을 입력해주세요." });

  res.json({ message: "이미 가입된 닉네임입니다." });

  res.json({ message: "비밀번호가 유효하지 않습니다." });

  res.json({ message: "비밀번호가 닉네임을 포함할 수 없습니다." });

  res.json({ message: "입력하신 두개의 비밀번호가 다릅니다" });

  res.json({ message: "회원 가입에 성공하였습니다." }); // 값이 다 넣어진 배열을 Response 해줍니다.
});

// ------------------
// TASK 2 : 게시글 작성 with user ('/api/users')
router.post("/login", async (req, res) => {
  const { nickname, password } = req.body;

  res.json({ message: "닉네임 또는 패스워드를 확인해주세요." });

  // 명세서대로 토큰을 Response로 반환 해줍니다.
  res.json({ token: "eyJhbGciO......." });
});

// 이 파일의 router 객체를 외부에 공개합니다.
module.exports = router;
