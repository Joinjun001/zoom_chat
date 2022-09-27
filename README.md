# Noom

Zoom Clone using NodeJs, WebRTC and Websockets.

기본설정.

nodemon > 서버코드를 변경할때마다 서버를 재시작해주는 도구.

babel > es6+ 이상의 자바스크립트를 각 브라우저/노드환경에 맞는 코드로 변환 

express > 서버를 만들때 필요한 도구 

pug > html을 가독성있게 쓸수 있게 해줌.

    0.1 > 기본적인 뼈대 구축 MVC기반으로 폴더 생성
    src 파일안에 서버를 구축하는 것들은 담는다.
    public > 프론트엔드 파일(정적인 파일) 있는 곳
    views > pug 와 같은 파일 있는곳.
    server.js > 백엔드 작업하는 곳 

0.2 > http와 websocket 두 프로토콜을 서버에 연결해서 사용 가능하게 만듬.
      frontend에서 socket은 서버로의 연결, backend에서 socket은 연결된 브라우저를 뜻함.
    
        socket을 통해 서버 혹은 브라우저에 message를 send하는 기능에 대해 배움.
        send > socket에 message를 전달.
        sockets = []를 만들어서 다른 socket에도 message를 보내는거 배움. 

0.3 > 닉네임을 만들어서 서버에 누가 보냈는지 구분함.
      socket 에 내가 원하는 정보를 저장할 수 있음. socket["nickname"] = message.payload 가 그 예.
      API에 데이터를 보낼땐 무조건!!무조건 string 형태로 보내야한다.
      JSON.stringify() 를 사용함.
      그리고 다시 js로 오면 JSON.parse() 로 js에서 쓸 수 있는 형태로 바꿔주면된다.