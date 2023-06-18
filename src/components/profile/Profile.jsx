import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Paper } from "@mui/material";

import "./Profile.css";

import { getLocalStorage } from "../../hooks/useLocalStorage";
//TODO FUN TO UPLOAD PICTURE AND ADD DB
export default function Profile() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentUser, setCurrentUser] = useState(
    getLocalStorage("currentUser") || { username: "", email: "" }
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Paper className="container">
      <div className="profile-picture-container">
        <label
          className="profile-picture-upload"
          htmlFor="profile-picture-upload"
        >
          <input
            id="profile-picture-upload"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <IconButton
            className="icon-btn"
            color="secondary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Avatar
          className="profile-picture"
          src={selectedImage || ""}
          alt={"username"}
          sx={{ width: 80, height: 80, marginRight: 2 }}
        />
      </div>
      <div>
        <Typography variant="h6" component="div">
          {currentUser?.username ? currentUser?.username : "Username"}
        </Typography>
        <Typography variant="body1" color="textSecondary" component="div">
          {currentUser?.username ? currentUser?.username : "Email"}
        </Typography>
      </div>
      <Button variant="contained" color="primary">
        Save
      </Button>
    </Paper>
  );
}
