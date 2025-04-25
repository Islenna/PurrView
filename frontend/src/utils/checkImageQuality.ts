type QualityCheckResult = {
  ok: boolean;
  tooDark: boolean;
  tooLowContrast: boolean;
  tooSmall: boolean;
};

export const checkImageQuality = async (
  imgSrc: string
): Promise<QualityCheckResult> => {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imgSrc;

  await new Promise((resolve) => (img.onload = resolve));

  const result: QualityCheckResult = {
    ok: true,
    tooDark: false,
    tooLowContrast: false,
    tooSmall: false,
  };

  if (img.width < 300 || img.height < 300) {
    result.tooSmall = true;
    result.ok = false;
  }

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const pixels = imageData.data;
  const count = pixels.length / 4;

  let brightnessSum = 0;
  let brightnessSquaredSum = 0;

  for (let i = 0; i < pixels.length; i += 4) {
    const avg = (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
    brightnessSum += avg;
    brightnessSquaredSum += avg * avg;
  }

  const mean = brightnessSum / count;
  const variance = brightnessSquaredSum / count - mean * mean;
  const contrast = Math.sqrt(variance);

  if (mean <= 60) {
    result.tooDark = true;
    result.ok = false;
  }

  if (contrast <= 30) {
    result.tooLowContrast = true;
    result.ok = false;
  }

  return result;
};
