//use navigator mediaDevices to get the user's camera
//then set the source of the video element with the stream
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then(function (stream) {
    video.srcObject = stream;
    video.play();
  })
  .catch(function (err) {
    console.log("An error occurred! " + err);
  });

//get the context of the canvas and draw the video on it every 33 milliseconds
const context = canvas.getContext("2d");
const drawVideo = () => {
  context.drawImage(video, 0, 0, 640, 480);
  requestAnimationFrame(drawVideo);
};
drawVideo();

// fetch the image from the canvas and send it to the server

const sendImage = () => {
  const image = canvas.toDataURL().replace("data:image/png;base64,", "");
  //console.log(image);

  let formData = new FormData();
  formData.append("imageInfo", image);

  fetch("https://0917ba2.pythonanywhere.com/utong", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
};

setInterval(sendImage, 800);
