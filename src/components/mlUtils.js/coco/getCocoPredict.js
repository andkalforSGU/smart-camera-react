export const getCocoPredict = async ({
  videoElem,
  cocoModel,
  setCocoPredictions,
}) => {
  const predict = await cocoModel.detect(videoElem);

  setCocoPredictions(predict);
};
