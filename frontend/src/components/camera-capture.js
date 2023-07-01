// import React, { useCallback, useRef, useState } from "react";

// import Webcam from "react-webcam";

// export default function camera() {
//   const webcamRef = useRef(null);
//   const [imgSrc, setImgSrc] = useState(null);
//   const retake = () => {
//     setImgSrc(null);
//   };
//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImgSrc(imageSrc);
//   }, [webcamRef]);

//   return (
//     <div className="container">
//       {imgSrc ? (
//         <img src={imgSrc} alt="webcam" />
//       ) : (
//         <Webcam height={600} width={600} ref={webcamRef} />
//       )}
//       <div className="btn-container">
//         {imgSrc ? (
//           <button onClick={retake}>Retake photo</button>
//         ) : (
//           <button onClick={capture}>Capture photo</button>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useRef } from 'react';
import axios from 'axios';

export default function camera() {
  const canvasRef = useRef(null);

  const captureAndSendImage = async () => {
    // Get the canvas element from the ref
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Draw the image on the canvas
    const image = new Image();
    image.src = webcamRef.current.getScreenshot();
    await image.decode(); // Wait for the image to load
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Convert the canvas image to base64-encoded string
    const imageSrc = canvas.toDataURL('image/png');

    try {
      const apiUrl = '/upload-image'; // Replace with the API endpoint URL on your server

      // Send the base64-encoded image to the API endpoint using Axios
      await axios.post(apiUrl, { image: imageSrc }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Image sent successfully');
    } catch (error) {
      console.error('Error sending image:', error);
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={640} height={480} />
      <button onClick={captureAndSendImage}>Capture and Send Image</button>
    </div>
  );
};


