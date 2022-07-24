const mongoose = require("mongoose");
const mongo_pw = "test:sparta";
const mongo_atlas = `mongodb+srv://${mongo_pw}@cluster0.plrlvlp.mongodb.net/?retryWrites=true&w=majority`;
const mongo_local = "mongodb://localhost:27017/node_api";
//
const connect = () => {
  mongoose
    .connect(mongo_local, { ignoreUndefined: true })
    .catch((err) => console.error(err));
};

mongoose.connection.on("error", (err) => {
  console.error("몽고디비 연결 에러", err);
});

module.exports = connect;

// mongoDB 연결
