import  {imageKit}  from "./imageKit.js"; 

export const uploadToImageKit = async (file) => {
const base64String = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;


  const uploaded = await imageKit.upload({
    file: base64String,
    fileName: file.originalname,
    folder: "/eshop",
    useUniqueFileName: true,
  });

  return {
    url: uploaded.url,
    public_id: uploaded.fileId
  };
};
