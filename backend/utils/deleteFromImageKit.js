import { imageKit } from "./imageKit.js";

export const deleteFromImageKit = async (publicId) => {
  try {
    await imageKit.deleteFile(publicId);
    return true;
  } catch (error) {
    console.log("ImageKit Delete Error:", error.message);
    return false;
  }
};