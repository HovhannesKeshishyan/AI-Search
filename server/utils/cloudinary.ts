import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER_NAME = "Products";
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const DATA_URI_IMAGE_REGEX = /^data:image\/[a-zA-Z0-9.+-]+;base64,/;

type ReturnType = Promise<
  { publicId: string; url: string; secureUrl: string } | never
>;

// Defense in depth: the client already restricts file type/size, but this
// endpoint is only ever called with an admin-submitted image, so validate
// again here rather than trusting client-side checks alone.
const assertValidImagePayload = (image: string) => {
  if (!image.startsWith("data:")) return;

  if (!DATA_URI_IMAGE_REGEX.test(image)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image must be a valid image file",
    });
  }

  const base64Length = image.length - image.indexOf(",") - 1;
  const approxBytes = (base64Length * 3) / 4;

  if (approxBytes > MAX_IMAGE_SIZE_BYTES) {
    throw createError({
      statusCode: 400,
      statusMessage: "Image must be smaller than 5MB",
    });
  }
};

export const uploadeImageToCloud = async (image: string): ReturnType => {
  assertValidImagePayload(image);

  try {
    const data = await cloudinary.uploader.upload(image, {
      folder: FOLDER_NAME,
    });
    return {
      publicId: data.public_id,
      url: data.url,
      secureUrl: data.secure_url,
    };
  } catch (error) {
    logger.error("Cloudinary upload failed", error);
    throw createError({
      statusCode: 424,
      statusMessage: "Failed to upload image",
    });
  }
};

export const deleteImageFromCloud = async (publicId: string): Promise<void> => {
  try {
    const data = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
    });
    logger.info("Cloudinary image deleted", { publicId, result: data });
  } catch (error) {
    logger.error("Cloudinary delete failed", error, { publicId });
  }
};

export const imageHasOtherUsage = (
  publicId: string,
  currentProductId: string,
  products: Product[]
): boolean => {
  return !!products.find((p) => {
    return p.id !== currentProductId && p.imagePublicID === publicId;
  });
};
