const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();
const travelRouter = require('./routes/travel');

app.set('view engine', 'ejs');
//__dirname : 현재 디렉토리의 절대경로
// path.join : 경로지정자(/ or \)를 운영체제에 맞추어 줌
app.set('views', path.join(__dirname, 'views'));

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: true}));

app.use('/travel', travelRouter);

app.use((req, res) => {
  res.status(404).send('404 not found');
});

// 서버를 3001번 포트에서 실행
app.listen(3001, () => {
  console.log('서버가 http://localhost:3001 에서 실행 중입니다.');
});