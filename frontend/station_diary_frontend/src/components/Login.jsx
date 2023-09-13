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
import jwtDecode from "jwt-decode";

const Login = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPasswordToggle = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetchData("users/token/", "POST", formData, undefined);

    if (res.ok) {
      console.log(formData);
      userCtx.setAccessToken(res.data.access);
      const decoded = jwtDecode(res.data.access);
      userCtx.setUser_id(decoded.user_id);
      userCtx.setFull_name(decoded.full_name);
      userCtx.setEmail(decoded.email);
      userCtx.setRank(decoded.rank);
      userCtx.setRole(decoded.role);
      userCtx.setStation(decoded.station);
      userCtx.setDeployment_id(decoded.deployment_id);
      userCtx.setShift(decoded.shift);
      userCtx.setSector(decoded.sector);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <TextField
            label="Password"
            type={formData.showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={handleShowPasswordToggle}>
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
