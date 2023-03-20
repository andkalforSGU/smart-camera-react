import React, { useState } from "react";
import { useCam } from "./hooks/useCam";

import "./styles.css";

export const Camera = () => {
  const [isUserCamera, setIsUserCamera] = useState(false);
  const [cocoPredictions, setCocoPredictions] = useState(null);
  const [movementPredictions, setMovementPredictions] = useState(null);

  const isCameraEnabled = !!(
    navigator.mediaDevices &&
    navigator.mediaDevices.getUserMedia &&
    isUserCamera
  );

  useCam({ isCameraEnabled, setCocoPredictions, setMovementPredictions });

  return (
    <div id="camera">
      {!isUserCamera && (
        <button onClick={() => setIsUserCamera(true)} className="camera_button">
          Включить камеру
        </button>
      )}
      {isUserCamera && (
        <video id="webcam" autoPlay muted width="640" height="480" />
      )}
      {cocoPredictions &&
        cocoPredictions.map(
          ({ bbox, class: predictClass, score }) =>
            score > 0.6 && (
              <div
                className="coco-predict"
                style={{
                  left: bbox[0],
                  top: bbox[1],
                  width: bbox[2],
                  height: bbox[3],
                }}
              >
                {predictClass}
              </div>
            )
        )}
      {movementPredictions &&
        movementPredictions.map(
          ({ height, width, percent }) =>
            percent > 0.3 && (
              <div
                className="movement-predict"
                style={{
                  top: height,
                  left: width,
                }}
              />
            )
        )}
    </div>
  );
};
