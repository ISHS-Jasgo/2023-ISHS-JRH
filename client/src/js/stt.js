async function speechToText(audioBase64) {
  const url =
    "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0";
  let audioContent = audioBase64.replace("data:audio/mp4;base64,", "");

  const data = {
    config: {
      encoding: "FLAC",
      languageCode: "en-US",
      audio_channel_count: 2,
    },
    audio: {
      content: audioContent,
    },
  };

  console.log(data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  const results = await response.json();
  console.log(results);
}

/**
 * @description Get the audio stream from the microphone
 */
const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false,
});

/**
 * @description Create a new MediaRecorder instance
 *
 */
const recorder = new MediaRecorder(stream);

/**
 * @description When the start button is clicked, start recording
 */
document.querySelector("#start").addEventListener("click", startRecording);

/**
 * @description When the recorder stops, the data will be given as a base64 string
 */
recorder.addEventListener("dataavailable", (e) => {
  console.log(e.data);
  const reader = new FileReader();

  reader.readAsDataURL(e.data);

  reader.onloadend = () => {
    console.log(reader.result);
  };
});

/**
 *
 * @param {Number} time
 * @description Start recording for a given time in milliseconds
 */
function startRecording(time) {
  recorder.start();
  setTimeout(() => {
    recorder.stop();
  }, time);
}
