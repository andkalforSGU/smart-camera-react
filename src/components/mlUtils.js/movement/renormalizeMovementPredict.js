export const renormalizeMovementPredict = (predict_0) =>
  predict_0.slice(0, predict_0.length - 5).reduce((acc, elem, index) => {
    if (index % 3 === 0) {
      const o = {
        height: elem * 480,
      };

      acc.push(o);
    } else if ((index + 2) % 3 === 0) {
      acc[acc.length - 1].width = elem * 480 + 80;
    } else {
      acc[acc.length - 1].percent = elem;
    }

    return acc;
  }, []);
