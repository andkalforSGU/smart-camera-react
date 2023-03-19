import React, { useState } from "react";
import { useCam } from "./hooks/useCam";

import './styles.css'

export const Camera = () => {
    const [isUserCamera, setIsUserCamera] = useState(false);
    const [predictions, setPredictions] = useState(null);

    const isCameraEnabled = !!(navigator.mediaDevices &&
        navigator.mediaDevices.getUserMedia && isUserCamera);

    useCam({ isCameraEnabled, setPredictions })

    console.log(predictions);

    return (
        <div id="camera">
            {!isUserCamera && <button onClick={() => setIsUserCamera(true)} className="camera_button" >Включить камеру</button>}
            {isUserCamera &&<video id="webcam" autoPlay muted width="640" height="480"/>}
            {predictions && predictions.map(({ bbox, class: predictClass, score }) => <div className="predict" style={{
                left: bbox[0],
                top: bbox[1],
                width: bbox[2],
                height: bbox[3],
            }}>{predictClass}</div>)}
        </div>
    )
}