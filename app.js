// Express 모듈을 불러오기
const express = require('express');

//Express 에플리케이션을 생성
const app = express();

// json 형태로 정보를 전달
app.use(express.json());

//라우팅 설정
app.get('/swag', (req, res) => {
  res.status(200).send('Get swag');
});

app.post('/swag', (req, res) => {
  res.status(200).send('Post swag');
});

app.get('/swag/:person', (req, res) => {
  const person = req.params.person;
  res.status(200).send(person);
});

// 서버를 3000번 포트에서 실행
app.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});