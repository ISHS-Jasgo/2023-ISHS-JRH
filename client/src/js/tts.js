//이게 문제다.
import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "./../../../api/celestial-shore-380106-8271a95fb3ec.json",
});

async function getSpeech(text) {
  const request = {
    input: { text },
    voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
    audioConfig: { audioEncoding: "LINEAR16" },
  };

  const [response] = client.synthesizeSpeech(request);

  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(response.audioContent);
  const audioSource = audioContext.createBufferSource();
  audioSource.buffer = audioBuffer;
  audioSource.connect(audioContext.destination);
  audioSource.start();
}

// function getSpeech(text) {
//   const lang = "ko-KR";
//   const utterThis = new SpeechSynthesisUtterance(text);

//   utterThis.lang = lang;
//   utterThis.rate = getSpeed();
//   window.speechSynthesis.speak(utterThis);
// }

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

export { getSpeech, stopSpeech, getDevice };
