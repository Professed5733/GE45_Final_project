import React, { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const CreateDeployment = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [formData, setFormData] = useState({
    date: "",
    sector: "",
    shift: "",
    active: false,
    officers: "",
  });

  const [sectorOptions, setSectorOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);

  const getSectorOptions = async () => {
    const res = await fetchData(
      "deployments/data-list/sector/",
      "GET",
      undefined,
      undefined
    );

    if (res.ok) {
      const extractedSector = res.data.map((sectorData) => sectorData.sector);
      setSectorOptions(extractedSector);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getShiftOptions = async () => {
    const res = await fetchData(
      "deployments/data-list/shift/",
      "GET",
      undefined,
      undefined
    );

    if (res.ok) {
      const extractedShifts = res.data.map((shiftData) => shiftData.shift);
      setShiftOptions(extractedShifts);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getSectorOptions();
    getShiftOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);

    // You can send the formData to your server here
    const res = await fetchData(
      "your-api-endpoint",
      "POST",
      formData,
      undefined
    );

    if (res.ok) {
      // Handle success
    } else {
      // Handle error
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
      <Typography variant="h5">Create Deployment</Typography>
      <form onSubmit={handleSubmit}>
        {/* Render form fields here */}
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
          <MenuItem value="">None</MenuItem>
          {sectorOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
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
          <MenuItem value="">None</MenuItem>
          {shiftOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
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
