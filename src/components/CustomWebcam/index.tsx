import { Button } from 'antd';
import React, { useState } from 'react';
import Webcam from 'react-webcam';

const CustomWebcam: React.FC = () => {
  const webcamRef = React.useRef<Webcam & HTMLVideoElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(''); // initialize it

  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: 'user',
  };

  // create a capture function
  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      console.log('trying to capture...');
      console.log(imgSrc);
      console.log(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  return (
    <div className="container">
      {imgSrc ? (
        <img src={imgSrc} alt="webcam" />
      ) : (
        <Webcam height={300} width={300} ref={webcamRef} videoConstraints={videoConstraints} />
      )}
      <div className="btn-container">
        {imgSrc ? (
          <Button onClick={retake}>Retake photo</Button>
        ) : (
          <Button onClick={capture}>Capture photo</Button>
        )}
      </div>
    </div>
  );
};

export default CustomWebcam;
