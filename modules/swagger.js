const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      version: "1.0.0",
      description:
        "API 연습을 위한 블로그 콘텐츠, 댓글 API - 명세는 아래와 같습니다.",
    },
    host: "http://nodeapi.myspaceti.me:8000",
    basePath: "/",
  },
  apis: ["./routes/users.js", "./routes/posts.js", "./routes/comments.js"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};
