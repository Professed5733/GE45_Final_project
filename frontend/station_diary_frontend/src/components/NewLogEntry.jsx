import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const NewLogEntry = () => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    tencode: "",
    currentLocation: "",
    destinationLocation: "",
    details: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Time"
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Tencode</InputLabel>
          <Select
            name="tencode"
            value={formData.tencode}
            onChange={handleChange}
          >
            <MenuItem value="10-2">10-2</MenuItem>
            <MenuItem value="10-4">10-4</MenuItem>
            <MenuItem value="Code 3">Code 3</MenuItem>
            {/* Add more tencode options as needed */}
          </Select>
        </FormControl>
        <TextField
          label="Current Location"
          name="currentLocation"
          value={formData.currentLocation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Destination Location"
          name="destinationLocation"
          value={formData.destinationLocation}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextareaAutosize
          label="Details"
          name="details"
          value={formData.details}
          onChange={handleChange}
          minRows={4}
          placeholder="Enter details here..."
          style={{ width: "100%" }} // Apply the width property
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
        <Button>Cancel</Button>
      </form>
    </div>
  );
};

export default NewLogEntry;
