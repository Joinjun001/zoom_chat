# Noom

Zoom Clone using NodeJs, WebRTC and Websockets.

기본설정.

nodemon > 서버코드를 변경할때마다 서버를 재시작해주는 도구.

babel > es6+ 이상의 자바스크립트를 각 브라우저/노드환경에 맞는 코드로 변환 

express > 서버를 만들때 필요한 도구 

pug > html을 가독성있게 쓸수 있게 해줌.

0.1 >   
      기본적인 뼈대 구축 MVC기반으로 폴더 생성
      src 파일안에 서버를 구축하는 것들은 담는다.
      public > 프론트엔드 파일(정적인 파일) 있는 곳
      views > pug 와 같은 파일 있는곳.
      server.js > 백엔드 작업하는 곳 

0.2 > 

      http와 websocket 두 프로토콜을 서버에 연결해서 사용 가능하게 만듬.
      frontend에서 socket은 서버로의 연결, backend에서 socket은 연결된 브라우저를 뜻함.
    
      socket을 통해 서버 혹은 브라우저에 message를 send하는 기능에 대해 배움.
      send > socket에 message를 전달.
      sockets = []를 만들어서 다른 socket에도 message를 보내는거 배움. 

0.3 > 

      닉네임을 만들어서 서버에 누가 보냈는지 구분함.
      socket 에 내가 원하는 정보를 저장할 수 있음. socket["nickname"] = message.payload 가 그 예.
      API에 데이터를 보낼땐 무조건!!무조건 string 형태로 보내야한다.
      JSON.stringify() 를 사용함.
      그리고 다시 js로 오면 JSON.parse() 로 js에서 쓸 수 있는 형태로 바꿔주면된다.

0.4 >  
      코드를 간단하게 만들어주는 framework 사용 (socket io!!!!)
      기존 websocket보다 더 신뢰성 있고 쉽게 코드를 만들 수 있음.
      인터넷이 끊겨도 다시 연결되면 자동으로 접속해주고, 기존 코드를 훨씬더 간결하고 멋있게 작성할 수 있음.
      JSON.parse 랑 JSON.stringify 안해도 됨.   
      원래는 string으로 된 message만 보낼수 있었다.
      하지만 이젠 object로 된 message도 보낼 수 있고, 또한 front end 에서 function을 가져와서 
      frontend에서 실행 시킬 수 있음! payload도 여러개 보낼 수 있다
      socketIO 쩐다

      socket room 을 만들어서 채팅방을 만들 수 있음. ex) 배달 기사랑 나, 게임방 , tinder채팅방, ...
      
0.5 >
      socket.to 로 같은방 사람들에게 메세지를 보낼수 있음. (본인 빼고 방안의 사람한테 보냄)
      socket.rooms 로 socket이 들어가있는 방을 알수있음. (기본적으로 서버와 유저간의 private room 이 하나 있음)
      emit은 socket으로 event이름을 전달한다.
      event를 받는 쪽에서 socket.on("event name")으로 받는다. 
      이때 argument는 개수, 형태 상관 x.. (awesome) 
      채팅창 기능을 구현할 수 있었다.

0.6 > 
      socket["nickname"] = nickname 처럼 socket에 내가 원하는 payload를 만들 수 있음.
      browser가 server랑 연결하면 private room이 자동으로 만들어짐. 
      그리고 우리가 만드는 방은 public room이다. ex) You joined nico room.
      public room은 socket id 즉 sids 에 저장이 안되고 rooms에만 저장되므로 
      adapter를 이용해 우리가 이용할 public room을 뽑아낼 수 있다.
      socket.emit() >  사용자 < > 서버 일대일로 이루어짐.
      server.sockets.emit() 서버에있는 모든 브라우저한테 보냄 
      public rooms는 사용자가 없으면 삭제된다.
      
      admin 모드도 쓸 수 있는데 오류가 나서 안된다. 나중에 수정해주자..
      asdf
