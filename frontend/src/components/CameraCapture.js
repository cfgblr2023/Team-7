import React, { useEffect } from 'react';
import axios from 'axios';
import * as tmImage from '@teachablemachine/image';

const CameraCapture = () => {
  let model, webcam, labelContainer, maxPredictions;

  useEffect(() => {
    init();
  }, []);

  async function init() {
    const URL = 'https://teachablemachine.withgoogle.com/models/Ccm-Dcw6_/';
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById('webcam-container').appendChild(webcam.canvas);
    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) {
      labelContainer.appendChild(document.createElement('div'));
    }
  }

  async function loop() {
    webcam.update();
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    const prediction = await model.predict(webcam.canvas);
    webcam.canvas.toBlob(async function (blob) {
      try {
        // TODO: API URL  
        const apiUrl = '/upload-image'; // Replace with the API endpoint URL on your server

        // Create a FormData object to send the Blob
        const formData = new FormData();
        formData.append('image', blob, 'image.png');

        // Send the image Blob to the API endpoint using Axios
        // await axios.post(apiUrl, formData, {
        //   headers: {
        //     'Content-Type': 'multipart/form-data'
        //   }
        // });

        console.log('Image sent successfully');
        // console.log(blob)
      } catch (error) {
        console.error('Error sending image:', error);
      }
    }, 'image/png');

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction = prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }

  return (
    <>
      <div>Teachable Machine Image Model</div>
      <button type="button" onClick={init}>
        Start
      </button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
    </>
  );
};

export default CameraCapture;
