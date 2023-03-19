import { useCallback, useEffect, useState } from "react";
import { getCocoSsdLoadedModel } from "../mlUtils.js/getCocoSsd";
import { getPredict } from "../mlUtils.js/getPredict";

export const useCam = ({ isCameraEnabled, setPredictions }) => {
    const [model, setModel] = useState(null);

    useEffect(() => {
        getCocoSsdLoadedModel()
            .then(model => setModel(model))
    }, [])

    const logic = useCallback(() => {
        const video = document.getElementById('webcam');

        if (!video) return;

        const constraints = {
            video: true
        };

        navigator.mediaDevices.getUserMedia(constraints)
            .then((stream) => {
                video.srcObject = stream;
                video.addEventListener('loadeddata', async () => {
                    await getPredict({ model, video, setPredictions })
                });
            });
    }, [model, setPredictions])

    useEffect(() => {
        if (!isCameraEnabled || !model) return;
        logic();
    }, [isCameraEnabled, model, logic])
}
