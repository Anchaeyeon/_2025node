// http 모듈을 가져옵니다
const http = require('http');

// 서버를 만듭니다
const server = http.createServer((req, res) => {
  // 응답 헤더를 설정합니다
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // 클라이언트에게 보낼 응답 메시지를 작성합니다
  res.end('Hello, World!\n');
});

// 서버를 3000번 포트에서 실행합니다
// localhost를 쓸 수 있는 이유 : DNS가 도메인 이름을 ip주소로 변환해주기 때문
server.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다.');
});
