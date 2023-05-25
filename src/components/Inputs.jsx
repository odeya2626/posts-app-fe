import { Input } from "@mui/material";
import React from "react";

export default function InputComponent({
  name,
  type,
  userInfo,
  updateUserInfo,
}) {
  return (
    <Input
      className="space-bottom"
      placeholder={name}
      type={type}
      name={name}
      value={userInfo[name]}
      onChange={(e) => {
        updateUserInfo(e);
      }}
      required
    />
  );
}
