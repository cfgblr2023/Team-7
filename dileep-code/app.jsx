import React from "react";
import  * as tmImage from "@teachablemachine/image"

export default function App() {
    let model, webcam, labelContainer, maxPredictions;


    async function init() {

            // the link to your model provided by Teachable Machine export panel

    const URL = "https://teachablemachine.withgoogle.com/models/Ccm-Dcw6_/";

         const modelURL = URL + "model.json";

        const metadataURL = URL + "metadata.json";

 

        // load the model and metadata

        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker

        // or files from your local hard drive

        // Note: the pose library adds "tmImage" object to your window (window.tmImage)

        model = await tmImage.load(modelURL, metadataURL);

        maxPredictions = model.getTotalClasses();

 

        // Convenience function to setup a webcam

        const flip = true; // whether to flip the webcam

        webcam = new tmImage.Webcam(200, 200, flip); // width, height, flip

        await webcam.setup(); // request access to the webcam

        await webcam.play();

        window.requestAnimationFrame(loop);

 

        // append elements to the DOM

        document.getElementById("webcam-container").appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");

        for (let i = 0; i < maxPredictions; i++) { // and class labels

            labelContainer.appendChild(document.createElement("div"));

        }

    }

 

    async function loop() {

        webcam.update(); // update the webcam frame

        await predict();

        window.requestAnimationFrame(loop);

    }

 

    // run the webcam image through the image model

    async function predict() {

        // predict can take in an image, video or canvas html element

        const prediction = await model.predict(webcam.canvas);
        webcam.canvas.toBlob(function(blob){
            console.log(blob);
          },'image/png');

        for (let i = 0; i < maxPredictions; i++) {

            const classPrediction =

               prediction[i].className + ": " + prediction[i].probability.toFixed(2);

            labelContainer.childNodes[i].innerHTML = classPrediction;

        }

    }
  return (<>
<div>Teachable Machine Image Model</div>

<button type="button" onClick={init}>Start</button>

<div id="webcam-container"></div>

<div id="label-container"></div>
</>

  );

}