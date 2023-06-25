import { Button } from "@mui/material";
import React, { useState } from "react";

import "./ImageUpload.css";
import { useUserContext } from "../../context/UserContext";
import { handleUpload } from "../../utils/functions";
import { addPost } from "../../api";

export default function ImageUpload() {
  const { currentUser } = useUserContext();
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setMessage("");
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      if (!image) {
        setMessage("Please upload an image");
        return;
      }
      const data = await handleUpload(image, currentUser.access_token);
      createPost(data);
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
      const post_string = {
        caption: caption,
        img_url: imgURL,
        img_url_type: "absolute",
        creator_id: currentUser.user_id,
      };

      const response = await addPost(post_string);
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
        <div className="message error">{message}</div>
        <Button className="image-upload-btn" onClick={handleSubmit}>
          Upload
        </Button>
      </div>
    </div>
  );
}
