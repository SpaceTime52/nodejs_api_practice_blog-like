const mongoose = require("mongoose"); // 몽구스를 사용하겠다.

const cartSchema = new mongoose.Schema({
  // 몽구스 스키마를 만든다.
  userId: {
    type: Number,
    required: true,
  },
  goodsId: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
