const express = require("express");
const Goods = require("../schemas/goods.js"); // DB 모델
const Cart = require("../schemas/cart.js"); // Cart의 DB 모델 스키마 불러옴
const router = express.Router();

// Read with GET
router.get("/goods", async (req, res) => {
  const { category } = req.query;
  console.log(req.query);
  const goods = await Goods.find({ category });
  res.json({ goods });
});

router.get("/goods/:id", async (req, res) => {
  const goods = await Goods.find();
  let id = req.params.id;
  res.json(goods.filter((e) => e.goodsId === Number(id)));
});

router.get("/goods/img/:id", async (req, res) => {
  const goods = await Goods.find();
  let id = req.params.id;
  res.json(goods.filter((e) => e.goodsId === Number(id))[0].thumbnailUrl);
});

// Create with POST : 새로운 Goods를 만들기
router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res
      .status(400)
      .json({ success: false, errorMessage: "이미 있는 데이터입니다." });
  }

  const createdGoods = await Goods.create({
    goodsId,
    name,
    thumbnailUrl,
    category,
    price,
  });

  res.json({ goods: createdGoods });
});

// Create : Goods를 특정 유저의 장바구니에 담기 with Post
router.post("/goods/:goodsId/intoCart/:userId", async (req, res) => {
  const { goodsId, userId } = req.params; // 상품 번호 , userId
  const { quantity } = req.body;

  console.log(goodsId, userId, quantity);

  const goodsInCart = await Cart.find({ goodsId: Number(goodsId) }); // 데이터에 접근

  if (goodsInCart.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "이미 장바구니에 있는 상품입니다.",
    });

    // 나중에 장바구니에 있는 경우 해당 장바구니에 숫자를 업데이트 하는 기능을 추가하면 되겠다.
  }

  const createdGoods = await Cart.create({
    userId: Number(userId),
    goodsId: Number(goodsId),
    quantity: quantity,
  });

  res.json({ goods: createdGoods });
});

// Update : 특정 유저의 장바구니의 해당 Goods를 업데이트 하기
router.put("/goods/:goodsId/updateCart/:userId", async (req, res) => {
  const { goodsId, userId } = req.params; // 상품 번호 , userId
  const { quantity } = req.body;

  const goodsInCart = await Cart.find({ goodsId: Number(goodsId) }); // 데이터에 접근

  if (!goodsInCart.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "장바구니에 없는 상품입니다.",
    });
  }

  await Cart.updateOne(
    {
      userId: Number(userId),
      goodsId: Number(goodsId),
    },
    { $set: { quantity: quantity } }
  );

  res.json({
    result: `${userId} 카트의 ${goodsId} 상품을 ${quantity}개로 변경했습니다.`,
  });
});

// Delete : Goods를 특정 유저의 장바구니에서 지우기 with Delete
router.delete("/goods/:goodsId/fromCart/:userId", async (req, res) => {
  const { goodsId, userId } = req.params; // 상품 번호 , userId

  const goodsInCart = await Cart.find({ goodsId: Number(goodsId) }); // 데이터에 접근

  if (!goodsInCart.length) {
    return res.status(400).json({
      success: false,
      errorMessage: "장바구니에 없는 상품입니다.",
    });
  }

  await Cart.deleteOne({
    userId: Number(userId),
    goodsId: Number(goodsId),
  });

  res.json({ result: userId + "카트에서" + goodsId + "상품을 삭제했습니다." });
});

module.exports = router;
