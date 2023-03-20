import * as tf from "@tensorflow/tfjs";
import { renormalizeMovementPredict } from "./renormalizeMovementPredict";

export const getMovementPredict = async ({
  movementModel,
  videoElem,
  setMovementPredictions,
}) => {
  tf.engine().startScope();
  const frameTensor = tf.browser.fromPixels(videoElem);

  const cropStartPoint = [0, 80, 0];
  const cropSize = [480, 480, 3];

  const cropedFrameTensor = tf.slice(frameTensor, cropStartPoint, cropSize);

  const resizeFrameTensor = tf.image
    .resizeBilinear(cropedFrameTensor, [256, 256], true)
    .toInt();

  const predict = await movementModel
    .predict(tf.expandDims(resizeFrameTensor))
    .array();

  const renormalizePredict = renormalizeMovementPredict(predict[0][0]);

  setMovementPredictions(renormalizePredict);
  tf.engine().endScope();
};
