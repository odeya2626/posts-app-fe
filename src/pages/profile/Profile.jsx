import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { CircularProgress, Paper } from "@mui/material";

import "./Profile.css";
import { useUserContext } from "../../context/UserContext";
import InputComponent from "../../components/Inputs";
import { handleUpload } from "../../utils/functions";

export default function Profile() {
  const { currentUser, setCurrentUser } = useUserContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    profile_img: "",
  });
  const updateUserInfo = (e) => {
    if (message) {
      setMessage("");
    }
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setUserInfo((prev) => ({ ...prev, profile_img: file }));
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const url = userInfo.profile_img
        ? await handleUpload(userInfo.profile_img, currentUser.access_token)
        : currentUser.profile_img || "";

      const res = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
        method: "PUT",
        headers: new Headers({
          Authorization: `Bearer ${currentUser.access_token}`,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          username: userInfo.username,
          email: userInfo.email,
          profile_img: url,
        }),
      });
      const data = await res.json();
      if (data?.detail) setMessage(data.detail);
      setCurrentUser((prev) => ({ ...prev, ...data }));
      setIsLoading(false);
    } catch (err) {
      setMessage(err?.data?.message);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setSelectedImage(currentUser?.profile_img);
    }
  }, [currentUser.profile_img, currentUser.username, currentUser.email]);
  return (
    <Paper className="container">
      <form className="profile-form" onSubmit={handleSubmit}>
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
            src={selectedImage || currentUser?.profile_img}
            alt={"username"}
            sx={{ width: 80, height: 80, marginRight: 2 }}
          />
        </div>

        <InputComponent
          name={"username"}
          type={"text"}
          userInfo={userInfo}
          updateUserInfo={updateUserInfo}
        />
        <InputComponent
          name={"email"}
          type={"email"}
          userInfo={userInfo}
          updateUserInfo={updateUserInfo}
        />
        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>

        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button variant="contained" color="secondary" type="submit">
            Save
          </Button>
        )}
      </form>
    </Paper>
  );
}
