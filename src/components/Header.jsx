import { Button } from "@mui/material";
import React from "react";
import "../App.css";

export default function Header({ handleModalState }) {
  return (
    <div className="app-header">
      <img
        className="app-header-logo"
        src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo.png"
        alt="Instagram"
      />
      <div>
        <Button onClick={() => handleModalState(true)}>Sign In</Button>
        <Button onClick={() => handleModalState(true)}>Sign Up</Button>
      </div>
    </div>
  );
}
