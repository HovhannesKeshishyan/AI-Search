import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const FOLDER_NAME = "Products";

type ReturnType = Promise<
  { publicId: string; url: string; secureUrl: string } | never
>;

export const uploadeImageToCloud = async (image: string): ReturnType => {
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
    console.log("Error uploading to cloudinary: ", error);
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
    console.log("Image is deleted from cloudinary: ", data);
  } catch (error) {
    console.log("Error deleteing image from cloudinary: ", error);
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
