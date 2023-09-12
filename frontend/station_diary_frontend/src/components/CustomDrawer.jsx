import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";

const CustomDrawer = (props) => {
  const { open, onClose, setSelectedComponent } = props;

  const handleDrawerItemClick = (componentName) => {
    setSelectedComponent(componentName);
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {/* Add your Drawer content here */}
        <ListItemButton onClick={() => handleDrawerItemClick("Dashboard")}>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        {/* <ListItemButton
          onClick={() => handleDrawerItemClick("CreateDeployment")}
        >
          <ListItemText primary="Create Deployment" />
        </ListItemButton>
        <ListItemButton onClick={() => handleDrawerItemClick("SelectUser")}>
          <ListItemText primary="Select User" />
        </ListItemButton> */}
        <ListItemButton onClick={() => handleDrawerItemClick("Deployment")}>
          <ListItemText primary="Deployment" />
        </ListItemButton>
        <ListItemButton onClick={() => handleDrawerItemClick("Logsheet")}>
          <ListItemText primary="Logsheet" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
