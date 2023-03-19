export const getPredict = async ({ video, model, setPredictions }) => {
    const predict = await model.detect(video);
    setPredictions(predict);

    requestAnimationFrame(() => getPredict({ video, model, setPredictions }));
};