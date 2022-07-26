# nodejs로 간단한 api를 구현하는 것을 해보았습니다. 

본 api는 
[http://nodeapi.myspaceti.me/api](http://nodeapi.myspaceti.me/api) 에서 아래와 같은 명세로 작동합니다. 
(https 아님 주의)
| 기능 | API URL | Method | request(가져 갈 데이터) | response(서버로부터 받아올 데이터) |
| --- | --- | --- | --- | --- |
| 게시글 작성 | /api/posts | POST | {  "user": "Developer", </br>"password": "1234",  </br>"title": "안녕하세요", </br>"content": "안녕하세요content 입니다." } | {  "message": "게시글을 생성하였습니다."} |
| 게시글 조회 | /api/posts | GET | - | {  "data": [{  </br>"postId": "62d6d12cd88cadd496a9e54e", </br>"user": "Developer",  </br>"title": "안녕하세요",  </br>"createdAt": </br>"2022-07-19T15:43:40.266Z" },  </br>{ "postId": "62d6cc66e28b7aff02e82954", </br>"user": "Developer",  </br>"title": "안녕하세요",  </br>"createdAt": "2022-07-19T15:23:18.433Z" }]} |
| 게시글 상세 조회 | /api/posts/:_postId | GET | - | { "data": { </br>"postId": "62d6cb83bb5a517ef2eb83cb", </br>"user": "Developer",  </br>"title": "안녕하세요",  </br>"content": "안녕하세요 content 입니다.", </br>"createdAt": "2022-07-19T15:19:31.730Z" }} |
| 게시글 수정 | /api/posts/:_postId | PUT | { "password": "123", </br>"title": "안녕하세요2", </br>"content": "안녕하세요 content 입니다." } | { "message": "게시글을 수정하였습니다."} |
| 게시글 삭제 | /api/posts/:_postId | DELETE | { "password": "1234"} | { "message": "게시글을 삭제하였습니다."} |
| 댓글 생성 | /api/comments/:_postId | POST | { "user": "Developer",  </br>"password": "1234",  </br>"content": "안녕하세요 댓글입니다."} | {  "message": "댓글을 생성하였습니다."} |
| 댓글 목록 조회 | /api/comments/:_postId | GET | - | { "data": </br>[ { "commentId": "62d6d3fd30b5ca5442641b94", </br>"user": "Developer", </br>"content": "수정된 댓글입니다.", </br>"createdAt": "2022-07-19T15:55:41.490Z" }, </br>{ "commentId":"62d6d34b256e908fc79feaf8", </br>"user": "Developer", </br>"content": "안녕하세요 댓글입니다.", </br>"createdAt": "2022-07-19T15:52:43.212Z" }]} |
| 댓글 수정 | /api/comments/:_commentId | PUT | { "password": "1234",  </br>"content": "수정된 댓글입니다." } | { "message": "댓글을 수정하였습니다."} |
| 댓글 삭제 | /api/comments/:_commentId | DELETE | { "password": "1234"} | {  "message": "댓글을 삭제하였습니다."} |
