function getSpeech(text, speed = 2) {
  const lang = "ko-KR";
  const utterThis = new SpeechSynthesisUtterance(text);

  utterThis.lang = lang;
  utterThis.rate = speed;
  window.speechSynthesis.speak(utterThis);
}

function stopSpeech() {
  window.speechSynthesis.cancel();
}

export { getSpeech, stopSpeech };
