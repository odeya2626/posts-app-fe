import React from "react";
import { Dialog, DialogContent } from "@mui/material";

import { useUserContext } from "../context/UserContext";
import ImageUpload from "./imageUpload/ImageUpload";
import { Auth } from "./Auth";

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
        {openModal.type === "imageUpload" ? (
          <ImageUpload />
        ) : (
          <Auth handleModalState={handleModalState} />
        )}
      </DialogContent>
    </Dialog>
  );
}
