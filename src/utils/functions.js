export const handleUpload = async (image, access_token) => {
  try {
    const formData = new FormData();
    formData.append("image", image);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${access_token}`,
      }),
      body: formData,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/post/image`,
      requestOptions
    );
    const data = await response.json();
    return data.filename;
  } catch (err) {
    console.log(err);
  }
};
