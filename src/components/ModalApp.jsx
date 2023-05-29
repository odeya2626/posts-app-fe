import React, { useState } from "react";
import { Button, Dialog, DialogContent } from "@mui/material";
import InputComponent from "./Inputs";
import { BASE_URL } from "../App";
import { useUserContext } from "../context/UserContext";

export default function ModalApp() {
  const { openModal, handleModalState } = useUserContext();
  return (
    <Dialog
      open={openModal.state}
      onClose={() => handleModalState(false, "")}
      fullWidth
      maxWidth="sm"
      className="dialog-container"
    >
      <DialogContent className="dialog-content">
        <Auth handleModalState={handleModalState} />
      </DialogContent>
    </Dialog>
  );
}

export function Auth({ handleModalState }) {
  const { setCurrentUser, openModal } = useUserContext();
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const updateUserInfo = (e) => {
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
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      };
      const response = await fetch(BASE_URL + "/user/register", reqOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setMessage("User signed up successfully.");
        handleModalState(true, "signin");
        return;
      }
      const data = await response.json();

      data.detail && setMessage(data.detail);
    } catch (err) {
      console.log(err);
      setMessage(err.toString());
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
      const reqOptions = {
        method: "POST",
        body: formData,
      };
      const response = await fetch(BASE_URL + "/login", reqOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        setCurrentUser(data);

        handleModalState(false, "");
        return;
      }
      const data = await response.json();
      data.detail && setMessage(data.detail);
    } catch (err) {
      setMessage(err.toString());
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
