import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";

const MODEL_URL =
  "https://tfhub.dev/google/tfjs-model/movenet/multipose/lightning/1";

export const getMovementModel = async () =>
  await loadGraphModel(MODEL_URL, { fromTFHub: true });
