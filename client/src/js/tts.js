function getSpeech(text) {
  const lang = "ko-KR";
  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.lang = lang;
  utterThis.rate = getSpeed();
  window.speechSynthesis.speak(utterThis);
}

const audio = new Audio();
let canAudioPause = false;

async function textToSpeech(text, notImportant = false) {
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
    console.log(canAudioPause);

    if (canAudioPause) audio.pause();
    audio.src = `data:audio/mp3;base64,${res.audioContent}`;
    canAudioPause = notImportant;
    audio.play();

  } catch (err) {
    console.log(err);
  }
}

function stopSpeech() {
  window.speechSynthesis.cancel();
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

export { getSpeech, stopSpeech, getDevice, textToSpeech };
