import { func } from "prop-types";

async function speechToText(audioBase64) {
  const url =
    "https://speech.googleapis.com/v1/speech:recognize?key=AIzaSyCxnSFvcQd6a17xfB4nDwDafJH_juHSNA0";
  let audioContent = audioBase64.replace("data:audio/mp4;base64,", "");

  const data = {
    config: {
      encoding: "WEBM_OPUS",
      languageCode: "ko-KR",
      audio_channel_count: 1,
    },
    audio: {
      content: audioContent,
    },
  };

  // console.log(data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  const results = await response.json();
  console.log(results.results[0].alternatives[0].transcript);
  return results.results[0].alternatives[0].transcript;
}

/**
 * @description Get the audio stream from the microphone
 */
async function getUserMedia() {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
  });
  return stream;
}
/**
 * @description Create a new MediaRecorder instance
 *
 */
async function getMediaRecorder() {
  const stream = await getUserMedia();
  const recorder = new MediaRecorder(stream);
  return recorder;
}
/**
 * @description Start recording
 */
async function startRecording() {
  const recorder = await getMediaRecorder();
  recorder.start();
}

/**
 * @description Stop recording
 */
async function stopRecording() {
  const recorder = await getMediaRecorder();
  recorder.stop();
}

/**
 * @description When the recorder stops, the data will be given as a base64 string
 */
let sttResult = "";
getMediaRecorder().then((recorder) => {
  recorder.addEventListener("dataavailable", (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.data);
    reader.onloadend = () => {
      let base64String = reader.result.replace(
        "data:audio/webm;codecs=opus;base64,",
        ""
      );
      // console.log(base64String);
      sttResult = speechToText(base64String);
    };
  })
});

function updateSttResult() {
  return sttResult;
}

export { startRecording, stopRecording, updateSttResult };
