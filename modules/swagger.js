const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      version: "1.0.0",
      description: "Blog user, comment, post API",
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
