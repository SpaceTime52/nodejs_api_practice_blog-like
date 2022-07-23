const express = require("express");
const Cart = require("../schemas/cart.js"); // Cart의 DB 모델 스키마 불러옴
const Goods = require("../schemas/goods.js"); // Goods의 모델 스키마 불러옴
const router = express.Router();

// Read with GET : 특정 유저의 장바구니 보기
router.get("/cart", async (req, res) => {
  const { userId } = req.query; // 쿼리로 userId 받기
  const cart = await Cart.find({ userId }); // userId의 쿼리정보를 받아 탐색
  const goodsIds = cart.map((el) => el.goodsId); // user의 카트의 상품번호 리스트

  // 상품번호 리스트에 맞는 상품정보 리스트
  const goods = await Goods.find({ goodsId: goodsIds });

  // 반환할 정보
  const goodsInfo = cart.map((cart_item) => {
    return {
      quantity: cart_item.quantity,
      goods: goods.find((item) => {
        return item.goodsId === cart_item.goodsId;
      }),
    };
  });

  res.json({ userId: userId, goodsInfo });
});

// Create with POST
router.post("/cart/add", async (req, res) => {
  const { userId, goodsId, quantity } = req.body;

  const cart = await Cart.find({ userId });

  const createdCart = await Cart.create({
    userId,
    goodsId,
    quantity,
  });

  res.json({ cart: createdCart });
});

module.exports = router;
