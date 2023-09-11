import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";

const CreateDeployment = () => {
  const [formData, setFormData] = useState({
    date: "",
    sector: "",
    shift: "",
    active: false,
    officers: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);
  };

  return (
    <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
      <Typography variant="h5">Create Deployment</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          type="date"
          label="Date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          select
          label="Sector"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        >
          {/* Add sector options here */}
        </TextField>
        <TextField
          select
          label="Shift"
          name="shift"
          value={formData.shift}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        >
          {/* Add shift options here */}
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              name="active"
              checked={formData.active}
              onChange={handleChange}
            />
          }
          label="Active"
        />
        <TextField
          type="text"
          label="Officers"
          name="officers"
          value={formData.officers}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default CreateDeployment;
