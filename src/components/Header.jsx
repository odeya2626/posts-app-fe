import { Button } from "@mui/material";
import React from "react";
import "../App.css";
import { useUserContext } from "../context/UserContext";

export default function Header() {
  const { currentUser, signOut, handleModalState } = useUserContext();
  return (
    <div className="app-header">
      <img
        className="app-header-logo"
        src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo.png"
        alt="Instagram"
      />
      {currentUser ? (
        <Button
          color="secondary"
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </Button>
      ) : (
        <div>
          <Button
            color="secondary"
            onClick={() => handleModalState(true, "signin")}
          >
            Sign In
          </Button>
          <Button
            color="secondary"
            onClick={() => handleModalState(true, "signup")}
          >
            Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
