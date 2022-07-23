const mongoose = require("mongoose");
const mongo_pw = "test:sparta";
// mongodb+srv://${mongo_pw}@cluster0.plrlvlp.mongodb.net/?retryWrites=true&w=majority

const connect = () => {
  mongoose
    .connect(`mongodb://localhost:27017/nodejs_blog`, { ignoreUndefined: true })
    .catch((err) => console.error(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;

// mongoDB 연결
