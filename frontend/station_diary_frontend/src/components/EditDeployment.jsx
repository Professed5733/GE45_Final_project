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
import SelectUser from "./SelectUser";

const EditDeployment = (props) => {
  const { handleCloseEditDeployment, deployment, getDeployments } = props;

  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const { accessToken } = userCtx;

  const [formData, setFormData] = useState({
    date: deployment.date || "",
    sector: deployment.sector || "",
    shift: deployment.shift || "",
    is_active: deployment.is_active || false,
    users: deployment.users || [],
  });

  const [sectorOptions, setSectorOptions] = useState([]);
  const [shiftOptions, setShiftOptions] = useState([]);
  const [showSelectUser, setShowSelectUser] = useState(false); // Flag to control the visibility of SelectUser
  const [selectedUserIds, setSelectedUserIds] = useState([]); // Store selected user IDs from SelectUser

  const getSectorOptions = async () => {
    const res = await fetchData(
      "deployments/data-list/sector/",
      "GET",
      undefined,
      accessToken
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
      accessToken
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

  const handleSelectUserClick = () => {
    setShowSelectUser(true);
  };

  const handleSelectUsers = (selectedIds) => {
    setSelectedUserIds(selectedIds);

    setFormData({
      ...formData,
      users: selectedIds, // Send the selectedIds array directly
    });

    setShowSelectUser(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form data:", formData);

    // You can send the formData to your server here
    const res = await fetchData(
      "deployments/edit/" + deployment.deployment_id + "/",
      "POST",
      formData,
      accessToken
    );

    if (res.ok) {
      console.log(res.data);
      getDeployments();
      handleCloseEditDeployment();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
      <Typography variant="h5">Edit Deployment</Typography>
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
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
          }
          label="Active"
        />
        <TextField
          type="text"
          label="Officers"
          name="officers"
          value={formData.users}
          onChange={handleChange}
          onClick={handleSelectUserClick}
          required
          fullWidth
          margin="normal"
        />
        {showSelectUser && (
          <SelectUser
            onSelectUsers={handleSelectUsers} // Pass callback to SelectUser
            selectedUserIds={selectedUserIds} // Pass selected user IDs
          />
        )}
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
        <Button onClick={handleCloseEditDeployment}>Cancel</Button>
      </form>
    </Container>
  );
};

export default EditDeployment;
