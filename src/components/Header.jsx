import {
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
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
        <HeaderDropdown />
      ) : (
        // <Button
        //   color="secondary"
        //   onClick={() => {
        //     signOut();
        //   }}
        // >
        //   Logout
        // </Button>
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
const settings = ["Profile", "Logout"];
export function HeaderDropdown() {
  const { signOut } = useUserContext();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Remy Sharp" src="" />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={signOut} textAlign="center">
            LogOut
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
