export type GeneratedImageVariant = {
  previewUrl: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  mimeType: string;
};

function loadImage(sourceUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to read image preview."));
    image.src = sourceUrl;
  });
}

function pickOutputType(file: File) {
  if (file.type === "image/png") {
    return "image/png";
  }

  if (file.type === "image/webp") {
    return "image/webp";
  }

  return "image/jpeg";
}

function canvasToDataUrl(
  canvas: HTMLCanvasElement,
  type: string,
  quality: number
) {
  if (type === "image/png") {
    return canvas.toDataURL(type);
  }

  return canvas.toDataURL(type, quality);
}

async function resizeSource(
  file: File,
  maxDimension: number,
  quality: number
) {
  const sourceUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(sourceUrl);
    const width = image.naturalWidth || image.width;
    const height = image.naturalHeight || image.height;
    const scale = Math.min(1, maxDimension / Math.max(width, height));
    const outputWidth = Math.max(1, Math.round(width * scale));
    const outputHeight = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = outputWidth;
    canvas.height = outputHeight;

    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas support is required for image uploads.");
    }

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image, 0, 0, outputWidth, outputHeight);

    return {
      dataUrl: canvasToDataUrl(canvas, pickOutputType(file), quality),
      width: outputWidth,
      height: outputHeight,
      mimeType: pickOutputType(file),
    };
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

export async function generateUploadVariants(file: File): Promise<GeneratedImageVariant> {
  const preview = await resizeSource(file, 1600, 0.88);
  const thumbnail = await resizeSource(file, 420, 0.82);

  return {
    previewUrl: preview.dataUrl,
    thumbnailUrl: thumbnail.dataUrl,
    width: preview.width,
    height: preview.height,
    mimeType: preview.mimeType,
  };
}

