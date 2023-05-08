import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient({
  keyFilename: "./../../../api/celestial-shore-380106-8271a95fb3ec.json",
});

console.log(client);

// async function quickStart(text) {
//   const request = {
//     input: { text: text },
//     // Select the language and SSML voice gender (optional)
//     voice: { languageCode: "ko-KR", ssmlGender: "NEUTRAL" },
//     // select the type of audio encoding
//     audioConfig: { audioEncoding: "LINEAR16", speakingRate: 1 },
//   };

//   const [response] = await client.synthesizeSpeech(request);
//   console.log("$$$ : ", response);

//   return response.audioContent;
// }

function getSpeech(text) {
  const lang = "ko-KR";
  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.lang = lang;
  utterThis.rate = getSpeed();
  window.speechSynthesis.speak(utterThis);
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

export { getSpeech, stopSpeech, getDevice };
