const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: `</br>
        (연습문제이므로 ERD도 여기에 기록합니다.)
        <img src="https://user-images.githubusercontent.com/49124248/181908641-6efe0ad2-049a-4aae-9a4b-31a225662482.png" alt="image" width="600">
        </br>
        <b>API 연습을 위한 블로그 콘텐츠, 댓글 API</b> - 명세는 아래와 같습니다.
        </br>
        `,
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
