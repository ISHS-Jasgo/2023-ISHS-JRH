const audio = new Audio();
let isAudioEnded = false;

async function textToSpeech(text, isImportant = false) {
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
    const fetchData = await fetch(url, otherparam);
    const res = await fetchData.json();

    audio.src = `data:audio/mp3;base64,${res.audioContent}`;
    console.log("tts start!");
    //audio.load();
    audio.play();
  } catch (err) {
    console.log(err);
  }

  return new Promise((resolve) => {
    audio.addEventListener(
      "ended",
      () => {
        console.log("tts end!");
        resolve();
      },
      { once: true }
    );
  });
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

export { getSpeed, getDevice, textToSpeech };
