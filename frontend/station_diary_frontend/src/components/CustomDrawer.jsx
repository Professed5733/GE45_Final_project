import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const CustomDrawer = (props) => {
  const { open, onClose } = props;
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {/* Add your Drawer content here */}
        <ListItemButton onClick={onClose}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton onClick={onClose}>
          <ListItemText primary="Deployment" />
        </ListItemButton>
        <ListItemButton onClick={onClose}>
          <ListItemText primary="Logsheet" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
