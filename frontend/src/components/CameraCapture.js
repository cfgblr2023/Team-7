import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as tmImage from '@teachablemachine/image';
import { useState } from 'react';
import { auth } from '../firebase';
const CameraCapture = () => {
  let model, webcam, labelContainer, maxPredictions;
  const [LangLong, setLangLong] = useState(null);

  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    // capture();
    setLocation();
  }, []);

  async function capture() {
    const URL = 'https://teachablemachine.withgoogle.com/models/Ccm-Dcw6_/';
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';
    if (LangLong == null) setLocation();

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    const flip = true;
    webcam = new tmImage.Webcam(200, 200, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);

    document.getElementById('webcam-container').appendChild(webcam.canvas);
    // labelContainer = document.getElementById('label-container');
    // for (let i = 0; i < maxPredictions; i++) {
    //   labelContainer.appendChild(document.createElement('div'));
    // }
  }

  async function loop() {
    webcam.update();
    await predict();
    // window.requestAnimationFrame(loop);
  }

  function setLocation() {
    const location = window.navigator && window.navigator.geolocation;

    if (location) {
      console.log(location);
      location.getCurrentPosition(
        (position) => {
          console.log(position);
          setLangLong({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          // this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
        }
      );
    }
  }

  async function predict() {
    let tblob = null;
    const prediction = await model.predict(webcam.canvas);
    webcam.canvas.toBlob(function (blob) {
      tblob = blob;
    }, 'image/png');
    const apiUrl = 'ec2-54-254-193-13.ap-southeast-1.compute.amazonaws.com:5000/upload_image'; // Replace with the API endpoint URL on your server

    let maxP = 0,
      maxLabel = '';
    for (let i = 0; i < maxPredictions; i++) {
      if (prediction[i].probability.toFixed(2) > maxP) {
        maxP = prediction[i].probability.toFixed(2);
        maxLabel = prediction[i].className;
      }
      // labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    try {
      
      await axios.post(
        apiUrl,
        {
          data: {
            name: 'user.displayName',
            email: 'user.email',
            lat: LangLong.latitude,
            long: LangLong.longitude,
            image: tblob,
            label: maxLabel,
            probability: maxP
          }
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      console.log('Image sent successfully');
      // console.log(blob)
    } catch (error) {
      console.error('Error sending image:', error);
    }
  }

  return (
    <>
      <div>Teachable Machine Image Model</div>
      <button type="button" onClick={capture}>
        Upload Photo
      </button>
      <div id="webcam-container"></div>
      <div id="label-container"></div>
    </>
  );
};

export default CameraCapture;
