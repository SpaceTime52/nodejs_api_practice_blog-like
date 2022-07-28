// app.js -> index.js의 Router를 통해 들어온 이파일은,
// 기본값 'api/posts'로 연결된 요청을 처리합니다.

// 이 파일에서 사용할 라우터 객체 생성
const express = require("express");
const router = express.Router();

// 이 파일에서 사용할 post DB가 어떻게 생겼는지 불러옵니다. (schema/post.js)
const Post = require("../schemas/post.js");

//  ---------------- 여기부터 API 시작 ----------------

// ------------------
// TASK 1 : 게시글 조회 with GET ('/api/posts')
router.get("/", async (req, res) => {
  // 몽고디비 데이터베이스 상의 'Post'에서 모든 데이터를 createdAt의 내림차순으로 불러온 후,
  const dataAll = await Post.find().sort({ createdAt: -1 });
  // data 배열에 하나씩 넣어 줍니다. (push)
  const data = [];

  for (let i = 0; i < dataAll.length; i++) {
    data.push({
      postId: dataAll[i]._id.toString(), // 이 때 ObjectId 객체로 불러와진 값은 문자열로 바꿉니다.
      user: dataAll[i].user,
      title: dataAll[i].title,
      createdAt: dataAll[i].createdAt,
    });
  }

  res.json({ data: data }); // 값이 다 넣어진 배열을 Response 해줍니다.
});

// ------------------
// TASK 2 : 게시글 작성 with POST ('/api/posts')
router.post("/", async (req, res) => {
  // POST 요청의 body로 받은 아이들을 각 변수 user, password, title, content에 넣어줍니다.

  const { user, password, title, content } = req.body; // 변수 4개를 한꺼번에 선언했다.

  // 그 변수들을 Post DB에 create - 생성해줍니다.
  await Post.create({
    user,
    password,
    title,
    content,
    createdAt: new Date(), // 오늘 날짜, 시간이 자동 생성돼서 넘어가야 하므로 new Date()를 사용합니다. '지금 날짜+시간'
  });

  // 명세서대로 Response를 반환 해줍니다.
  res.json({ message: "게시글을 생성하였습니다." });
});

// ------------------
// TASK 3 : 게시글 상세조회 with GET ('/api/posts/:_postId')
router.get("/:_postId", async (req, res) => {
  // URL 뒤쪽에 params{ 로 전달받은 _postId를 사용하겠다고 변수 선언합니다.
  const { _postId } = req.params;
  // 이 _postId를 id로 가진 DB 요소를 모두 찾아서 thisPost라는 변수에 넣습니다.
  const thisPost = await Post.findOne({ _id: _postId });

  // DB에서 찾아낸 thisPost의 개수가 0개이면, 없다고 response 합니다.
  if (!thisPost) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  // 그렇지 않으면,
  const data = [
    {
      postId: thisPost._id.toString(),
      user: thisPost.user,
      title: thisPost.title,
      content: thisPost.content,
      createdAt: thisPost.createdAt,
    },
  ];

  // 그 데이터를 Response 합니다.
  res.json({ data: data });
});

// ------------------
// TASK 4 : 게시글 수정 with PUT ('/api/posts/:_postId')
router.put("/:_postId", async (req, res) => {
  // URL 뒤쪽에 params로 전달받은 _postId를 사용하겠다고 변수 선언합니다.
  const { _postId } = req.params;
  // 동시에 수정할 내용을 Request body에 담아 받게 되는데
  const { password, title, content } = req.body;

  // 이 _postId를 id로 가진 DB 요소를 모두 찾아서 thisPost라는 변수에 넣습니다.
  const thisPost = await Post.findOne({ _id: _postId });

  // 마찬가지로 찾아낸 게 없으면 게시글 수정을 진행할 수 없습니다.
  if (!thisPost) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  // 찾아낸 게 있으면, 찾아둔 thisPost의 password와 입력받은 패스워드를 비교해보고,
  const db_password = thisPost["password"];
  if (password != db_password) {
    console.log(password, db_password);
    return res.json({ message: "패스워드가 일치하지 않습니다." });
  }

  // 비밀번호까지 일치하면 if문을 거치지 않고 여기까지 오는데, 그 Post를 update합니다.
  await Post.updateOne(
    {
      _id: _postId,
      // updateOne 메소드는 첫번째 인자로 업데이트할 DB의 고유값을 받습니다. (여기선 _id)
    },
    {
      $set: {
        // 두번째 인자로 $set:{}이라는 명령어와 함꼐 바꿀 내용들을 적어 보냅니다.
        password: password,
        title: title,
        content: content,
      },
    }
  );

  // 수정이 원활하게 진행되면 게시글을 수정하였다는 Response를 보냅니다.
  res.json({ message: "게시글을 수정하였습니다." });
});

// ------------------
// TASK 5 : 게시글 삭제 with DELETE ('/api/posts/:_postId')
router.delete("/:_postId", async (req, res) => {
  // URL 뒤쪽에 params로 전달받은 _postId를 사용하겠다고 변수 선언합니다.
  const { _postId } = req.params;
  // 비교를 위해서 body에 담아 받은 password를 password변수에 그대로 담습니다.
  const { password } = req.body;

  // 입력 받은 _postId와 동일한 요소를 DB에서 찾아냅니다.
  const thisPost = await Post.findOne({ _id: _postId });
  // 찾은 게 없으면 실패를 Response 하고,
  if (!thisPost) {
    return res.json({ message: "해당 게시글이 없습니다." });
  }

  // 아까 찾은 thisPost의 password와
  const db_password = thisPost["password"];

  // body로 입력받았던 password와 DB에서 찾아낸 password가 일치하지 않으면 요청 종료.
  if (password != db_password) {
    res.json({ message: "패스워드가 일치하지 않습니다." });

    // 아니면 내용 삭제합니다.
  } else {
    await Post.deleteOne({
      _id: _postId,
    });
    // 여기까지 왔으면 게시글이 삭제되었으므로 삭제하게 됩니다.
    res.json({ message: "게시글을 삭제하였습니다." });
  }
});

// ----부가기능--------------
// // 게시글 작성 여러개 한꺼번에 with POST ('/api/posts/many')
// // 명세서에 없는 내용이지만 한번에 여러개 게시글을 작성해놓기 위해서 만들어본 것입니다. 건너 뛰셔도 됩니다.
router.post("/many", async (req, res) => {
  for (let i = 0; i < req.body.length; i++) {
    var { user, password, title, content } = req.body[i];

    await Post.create({
      user,
      password,
      title,
      content,
      createdAt: new Date(),
    });
  }

  res.json({ message: "게시글을 생성하였습니다." });
});

// 이 파일의 router 객체를 외부에 공개합니다.
module.exports = router;
