import { Button } from "@mui/material";
import React, { useState } from "react";
// import Compressor from "compressorjs";

import "./ImageUpload.css";
import { getLocalStorage } from "../../hooks/useLocalStorage";

export default function ImageUpload() {
  const currentUser = getLocalStorage("currentUser");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  // const compresser = async () => {
  //   new Compressor(image, {
  //     quality: 0.8,
  //     success(result) {
  //       return result;
  //     },
  //     error(err) {
  //       console.log(err.message);
  //     },
  //   });
  // };

  const handleUpload = async (e) => {
    e?.preventDefault();
    try {
      const formData = new FormData();
      formData.append("image", image);
      // const result = await compresser();
      // formData.append("image", result, result.name);

      const requestOptions = {
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${currentUser.access_token}`,
        }),
        body: formData,
      };

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/image`,
        requestOptions
      );

      const data = await response.json();
      createPost(data.filename);
    } catch (err) {
      console.log(err);
    } finally {
      setCaption("");
      setImage(null);
      document.querySelector(".image-upload input[type=file]").value = "";
    }
  };

  const createPost = async (imgURL) => {
    try {
      const json_string = JSON.stringify({
        caption: caption,
        img_url: imgURL,
        img_url_type: "absolute",
        creator_id: currentUser.user_id,
      });
      const requestOptions = {
        method: "POST",
        headers: new Headers({
          Authorization: `${currentUser.token_type} ${currentUser.access_token}`,
          "Content-Type": "application/json",
        }),
        body: json_string,
      };
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post`,
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      window.location.reload();
      window.location.scrollTo(0, 0);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="image-upload-container">
      <input
        className="caption-input"
        type="text"
        name="caption"
        placeholder="Enter your caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <div className="image-upload">
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="file-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="file-upload-label">
          <div className="upload-icon">&#x21ea;</div>
          <div className="upload-text">Upload Image</div>
        </label>
        {image && (
          <div className="selected-file">Selected file: {image.name}</div>
        )}
        <Button className="image-upload-btn" onClick={handleUpload}>
          Upload
        </Button>
      </div>
    </div>
  );
}
