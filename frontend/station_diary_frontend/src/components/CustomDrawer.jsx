import React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";

const CustomDrawer = (props) => {
  const { open, onClose } = props;
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <List>
        {/* Add your Drawer content here */}
        <ListItem>
          {/* Wrap ListItemText in a Button */}
          <Button onClick={onClose} fullWidth>
            <ListItemText primary="Item 1" />
          </Button>
        </ListItem>
        <ListItem>
          {/* Wrap ListItemText in a Button */}
          <Button onClick={onClose} fullWidth>
            <ListItemText primary="Item 2" />
          </Button>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default CustomDrawer;
