import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const ChangePassword = (props) => {
  const { handleCloseChangePassword } = props;
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.new_password !== formData.confirmNewPassword) {
      alert("Passwords do not match");
      console.log("Passwords do not match");
    } else {
      const res = await fetchData(
        "users/token/change-password/",
        "POST",
        formData,
        userCtx.accessToken
      );
      if (res.ok) {
        alert(JSON.stringify(res.data));
        console.log(res.data);
        handleCloseChangePassword();
      } else {
        alert(JSON.stringify(res.data));
        console.log(res.data);
      }

      // Clear form fields or perform any necessary actions
      setFormData({
        old_password: "",
        new_password: "",
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
            name="old_password"
            value={formData.old_password}
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
            name="new_password"
            value={formData.new_password}
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
        <Button onClick={handleCloseChangePassword}>Cancel</Button>
      </form>
    </div>
  );
};

export default ChangePassword;
