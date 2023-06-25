import { useState } from "react";
import { Button } from "@mui/material";

import { useUserContext } from "../context/UserContext";
import InputComponent from "./Inputs";
import { login, register } from "../api";
import axios from "axios";

export function Auth({ handleModalState }) {
  const params = new URLSearchParams(window.location.search);

  const { setCurrentUser, openModal, setCurrentUserInfo } = useUserContext();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [message, setMessage] = useState(params.get("message") || "");
  const updateUserInfo = (e) => {
    if (e.nativeEvent.data && message) {
      setMessage("");
    }
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (openModal.type === "signup") {
      handleSignup();
    } else {
      handleSignin();
    }
  };

  const handleSignup = async () => {
    if (
      userInfo.username === "" ||
      userInfo.password === "" ||
      userInfo.email === ""
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      const response = await register(userInfo);
      if (response.status === 201) {
        handleSignin();
        return;
      }
    } catch (err) {
      console.log(err);
      setMessage(err?.response?.data?.detail);
    }
  };

  const handleSignin = async () => {
    if (userInfo.username === "" || userInfo.password === "") {
      setMessage("Please fill in all required fields.");
      return;
    }
    try {
      let formData = new FormData();
      formData.append("username", userInfo.username);
      formData.append("password", userInfo.password);

      const response = await login(formData);
      console.log(response);
      const data = response?.data;
      if (response.status === 200) {
        console.log(data);
        const currentUser = {
          username: data.username,
          email: data.email,
          profile_img: data.profile_img,
          access_token: data.access_token,
          user_id: data.user_id,
        };
        setCurrentUser(currentUser);
        setCurrentUserInfo(currentUser);
        handleModalState(false, "");
        window.location.reload();
        return;
      }

      data.detail && setMessage(data.detail);
    } catch (err) {
      setMessage(err?.response?.data?.detail);
    }
  };

  return (
    <form className="app_signin">
      <center>
        <img
          className="app_headerImage space-bottom"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </center>

      <InputComponent
        name={"username"}
        type={"text"}
        userInfo={userInfo}
        updateUserInfo={updateUserInfo}
      />
      {openModal && openModal.type === "signup" && (
        <InputComponent
          name={"email"}
          type={"email"}
          userInfo={userInfo}
          updateUserInfo={updateUserInfo}
        />
      )}
      <InputComponent
        name={"password"}
        type={"password"}
        userInfo={userInfo}
        updateUserInfo={updateUserInfo}
      />
      <Button type="submit" onClick={handleSubmit}>
        {openModal.type === "signup" ? "Sign Up" : "Sign In"}
      </Button>
      {message && (
        <p className={message.includes("success") ? "success" : "error"}>
          {message}
        </p>
      )}
    </form>
  );
}
