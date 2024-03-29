import React, { useState, useContext } from "react";
import UserContext from "../context/user";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CustomDrawer from "./CustomDrawer";
import ChangePassword from "./ChangePassword";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

const Navbar = (props) => {
  const { setSelectedComponent } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { full_name, rank, handleLogout } = useContext(UserContext);

  const [openChangePassword, setOpenChangePassword] = useState(false);

  const handleOpenChangePassword = () => {
    setOpenChangePassword(true);
  };

  const handleCloseChangePassword = () => {
    setOpenChangePassword(false);
  };

  const capitalizeFirstLetter = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Add a state to control the password menu
  const [passwordMenuOpen, setPasswordMenuOpen] = useState(false);

  const handlePasswordMenuOpen = (event) => {
    setPasswordMenuOpen(event.currentTarget);
  };

  const handlePasswordMenuClose = () => {
    setPasswordMenuOpen(null);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ bgcolor: "#080d4e" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Station Diary App
            </Typography>

            <div>
              <Typography variant="h6" component="div">
                Welcome {capitalizeFirstLetter(rank)} {full_name}
              </Typography>
            </div>

            <div>
              <IconButton
                color="inherit"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handlePasswordMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={passwordMenuOpen}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(passwordMenuOpen)}
                onClose={handlePasswordMenuClose}
              >
                <MenuItem
                  onClick={() => {
                    handlePasswordMenuClose();
                    handleOpenChangePassword();
                  }}
                >
                  Change Password
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log Out
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        <CustomDrawer
          open={isDrawerOpen}
          onClose={toggleDrawer}
          setSelectedComponent={setSelectedComponent}
        />
      </Box>
      <Dialog
        open={openChangePassword}
        onClose={handleCloseChangePassword}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <ChangePassword
            handleCloseChangePassword={handleCloseChangePassword}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Navbar;
