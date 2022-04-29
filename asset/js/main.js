import { fetchGET, fetchPOST } from "./dataFetching.js";

const SERVER_HOST =
  "https://asia-northeast3-likelion-js-practice.cloudfunctions.net/api";

const NAME = "정지원";

// /member라는 경로에서 데이터를 찾아와줘~
async function getProfileData(name) {
    const path = "/member";

    //async-await 비동기를 동기로 만들어줌
    //코드가 시간이 오래걸리니 기다려줘!!-await
    //서버 /member라는 곳에 questString으로 name을 요청
    const res = await fetchGET(SERVER_HOST, path, {name:name});

    const myName = res.data.profile.name;
    const myMbti = res.data.profile.mbti;
    const myGithub = res.data.profile.github;

    document.querySelector('#fetch-name').innerHTML = myName;
    document.querySelector('#fetch-mbti').innerHTML = myMbti;
    document.querySelector('#fetch-github').innerHTML = myGithub;
}

async function getFootprint(name) {
  const path = "/footprint";

    //async-await 비동기를 동기로 만들어줌
    //코드가 시간이 오래걸리니 기다려줘!!-await
    //서버 /member라는 곳에 questString으로 name을 요청
    const res = await fetchGET(SERVER_HOST, path, {name:name});

    const messages = res.data.messages;

    //전송받은 메세지 개수만큼 추가하라
    for(let i=0; i < messages.length; i++){
      const messageFormat = `
      <div class="board-row">
      ${messages[i]}
      </div>
      `
      document.querySelector('.board').innerHTML += messageFormat;
    }
 
}

async function sendFootprint() {
  const path = '/footprint';

  const messageObj = {
    content: document.querySelector('.message-content').value,
    receiverName: document.querySelector('.message-sender').value,
  };

  const res = await fetchPOST(SERVER_HOST, path, messageObj);
  if(res.status === 200) {
    alert("메세지를 성공적으로 전송하였습니다.");
  }
}

//렌더링 되자마자 실행
window.onload = function () {
  const sendButton = document.querySelector(".send-btn");
  sendButton.addEventListener("click", () => {
    sendFootprint();
  });

  
  getProfileData(NAME);
  getFootprint(NAME);
  
};
