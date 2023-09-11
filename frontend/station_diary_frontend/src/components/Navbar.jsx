import * as React from "react";
import { useState, useContext } from "react";
import UserContext from "../context/user";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import CustomDrawer from "./CustomDrawer";

const Navbar = (props) => {
  const { setSelectedComponent } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { full_name, rank } = useContext(UserContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
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
              Welcome {rank} {full_name}
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <CustomDrawer
        open={isDrawerOpen}
        onClose={toggleDrawer}
        setSelectedComponent={setSelectedComponent}
      />
    </Box>
  );
};

export default Navbar;
