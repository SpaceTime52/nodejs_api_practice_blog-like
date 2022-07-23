const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const connect = require("./schemas/index.js");
const goodsRouter = require("./routes/goods.js");
const cartRouter = require("./routes/cart.js");

connect();

app.use(cors());
app.use(express.json());
app.use("/api", [goodsRouter, cartRouter]);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
