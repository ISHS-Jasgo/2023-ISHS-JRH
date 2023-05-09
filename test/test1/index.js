import textToSpeech from "./../node_modules/@google-cloud/text-to-speech";

// const client = new textToSpeech.TextToSpeechClient({
//   keyFilename: "./api/celestial-shore-380106-8271a95fb3ec.json",
// });

// async function getSpeech(text) {
//   const request = {
//     input: { text: text },
//     voice: { languageCode: "en-US", ssmlGender: "NEUTRAL" },
//     audioConfig: { audioEncoding: "LINEAR16" },
//   };

//   const [response] = await client.synthesizeSpeech(request);

//   const audioContext = new AudioContext();
//   const audioBuffer = await audioContext.decodeAudioData(response.audioContent);
//   const audioSource = audioContext.createBufferSource();
//   audioSource.buffer = audioBuffer;
//   audioSource.connect(audioContext.destination);
//   audioSource.start();
// }

// getSpeech("Hello!");
