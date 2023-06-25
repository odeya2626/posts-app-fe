import { uploadImage } from "../api";

export const handleUpload = async (image, access_token) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await uploadImage(formData);

    return response.data.filename;
  } catch (err) {
    console.log(err);
  }
};
