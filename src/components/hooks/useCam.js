import { useCallback, useEffect, useState } from "react";
import { getCocoSsdLoadedModel } from "../mlUtils.js/coco/getCocoSsd";
import { getMovementModel } from "../mlUtils.js/movement/getMovementModel";
import { getCocoPredict } from "../mlUtils.js/coco/getCocoPredict";
import { getMovementPredict } from "../mlUtils.js/movement/getMovementPredict";

export const useCam = async ({
  isCameraEnabled,
  setCocoPredictions,
  setMovementPredictions,
}) => {
  const [cocoModel, setCocoModel] = useState(null);
  const [movementModel, setMovementCocoModel] = useState(null);
  const [videoElem, setVideoElem] = useState(null);

  useEffect(() => {
    getCocoSsdLoadedModel().then((cocoModel) => setCocoModel(cocoModel));
    getMovementModel().then((movementModel) =>
      setMovementCocoModel(movementModel)
    );
  }, []);

  const logic = () => {
    const video = document.getElementById("webcam");

    if (!video) return;

    const constraints = {
      video: true,
    };

    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      video.srcObject = stream;
      video.addEventListener("loadeddata", async () => {
        setVideoElem(video);
      });
    });
  };

  useEffect(() => {
    if (!isCameraEnabled || !cocoModel || !movementModel) return;
    logic();
  }, [isCameraEnabled, cocoModel, movementModel]);

  useEffect(() => {
    if (!videoElem) return;

    let framing = true;

    const framingFunc = () => {
      if (!framing) return;

      getCocoPredict({ cocoModel, videoElem, setCocoPredictions });
      getMovementPredict({ movementModel, videoElem, setMovementPredictions });

      window.requestAnimationFrame(framingFunc);
    };

    framingFunc();

    return () => (framing = false);
  }, [videoElem]);
};
