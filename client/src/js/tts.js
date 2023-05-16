const audio = new Audio();
let nowImportant = true;

//isImportant = true: 말을 끊지 않는다. false: 말을 끊는다.
async function textToSpeech(text, isImportant = true, speakRate = 1) {
  const url =
    "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0";
  const audioData = {
    input: {
      text: text,
    },
    voice: {
      languageCode: "ko-KR",
      name: "ko-KR-Neural2-c",
      ssmlGender: "MALE",
    },
    audioConfig: {
      audioEncoding: "MP3",
      speakingRate: speakRate,
    },
  };
  const otherparam = {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(audioData),
    method: "POST",
  };
  // 사운드 생성
  try {
    const currSource4 = audio.src.substring(0, 4);
    if (nowImportant && currSource4 !== "http" && currSource4 !== "") {
      //현재 재생되는 오디오가 중요할 때
      audio.addEventListener(
        "ended",
        () => {
          fetch(url, otherparam)
            .then((fetchData) => fetchData.json())
            .then((res) => {
              audio.src = `data:audio/mp3;base64,${res.audioContent}`;
              console.log("tts start!");
              audio.play();
            });
        },
        { once: true }
      );
    } else {
      //현재 재생되는 오디오가 중요하지 않을때 또는 오디오가 없을때
      fetch(url, otherparam)
        .then((fetchData) => fetchData.json())
        .then((res) => {
          audio.pause();
          audio.src = `data:audio/mp3;base64,${res.audioContent}`;
          console.log("tts start!");
          audio.play();
          //console.log("play!");
          //console.log("curr", audio.src);
        });
    }
    nowImportant = isImportant;
  } catch (err) {
    console.log(err);
  }

  return new Promise((resolve) => {
    audio.addEventListener(
      "ended",
      () => {
        console.log("tts end!");
        audio.src = "";
        //console.log("now is", audio.src);
        resolve();
      },
      { once: true }
    );
  });
}

function stopTTS() {
  audio.pause();
  console.log("stop..");
  audio.src = "";
  audio.load();
}

function getDevice() {
  let ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("android") > -1) {
    return "android";
  } else if (
    ua.indexOf("iphone") > -1 ||
    ua.indexOf("ipad") > -1 ||
    ua.indexOf("ipod") > -1
  ) {
    return "ios";
  } else {
    return "computer";
  }
}

function getSpeed() {
  let device = getDevice();
  if (device === "ios") return 1.2;
  else if (device === "android") return 1.5;
  else return 2;
}

export { getSpeed, getDevice, textToSpeech, stopTTS };
