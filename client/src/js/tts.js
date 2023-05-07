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
