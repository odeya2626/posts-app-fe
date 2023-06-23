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
import React, { useState } from "react";
import "../App.css";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, signOut, handleModalState } = useUserContext();
  return (
    <div className="app-header">
      <img
        className="app-header-logo pointer"
        src="https://1000logos.net/wp-content/uploads/2017/02/ig-logo.png"
        alt="Instagram"
        onClick={() => {
          navigate("/");
        }}
      />
      {currentUser ? (
        <HeaderDropdown />
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

export function HeaderDropdown() {
  const { currentUser } = useUserContext();
  const navigate = useNavigate();
  const { signOut } = useUserContext();
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = () => {
    signOut();
    handleCloseUserMenu("/");
  };

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
          <Avatar alt="Remy Sharp" src={currentUser?.profile_img || ""} />
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
        <MenuItem component={Link} to="/" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Home</Typography>
        </MenuItem>
        <MenuItem component={Link} to="/profile" onClick={handleCloseUserMenu}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">LogOut</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
