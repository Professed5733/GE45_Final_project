import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    showOldPassword: false,
    showNewPassword: false,
    showConfirmNewPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPasswordToggle = (field) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      // Passwords do not match, handle error or display a message
      console.log("Passwords do not match");
    } else {
      // Handle password change submission with the following payload
      const payload = {
        old_password: formData.oldPassword,
        new_password: formData.newPassword,
      };
      console.log(payload);
      // Clear form fields or perform any necessary actions
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        showOldPassword: false,
        showNewPassword: false,
        showConfirmNewPassword: false,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <TextField
            label="Old Password"
            type={formData.showOldPassword ? "text" : "password"}
            name="oldPassword"
            value={formData.oldPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => handleShowPasswordToggle("showOldPassword")}
                  >
                    {formData.showOldPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <TextField
            label="New Password"
            type={formData.showNewPassword ? "text" : "password"}
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => handleShowPasswordToggle("showNewPassword")}
                  >
                    {formData.showNewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <TextField
            label="Confirm New Password"
            type={formData.showConfirmNewPassword ? "text" : "password"}
            name="confirmNewPassword"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      handleShowPasswordToggle("showConfirmNewPassword")
                    }
                  >
                    {formData.showConfirmNewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
