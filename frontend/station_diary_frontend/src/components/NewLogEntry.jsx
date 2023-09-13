import React, { useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const NewLogEntry = (props) => {
  const { handleCloseCreateLogEntry, getLogEntries } = props;

  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const deployment_id = userCtx.deployment_id;

  const [formData, setFormData] = useState({
    deployment: deployment_id,
    log_date: "",
    log_time: "",
    tencode: "",
    current_location: "",
    destination_location: "",
    details: "",
  });

  const [tencodeOptions, setTencodeOptions] = useState([]);

  const getTencodeOptions = async () => {
    const res = await fetchData(
      "loggings/data-list/tencode/",
      "GET",
      undefined,
      undefined
    );

    if (res.ok) {
      const extractTencode = res.data.map((tencodeData) => tencodeData.tencode);
      setTencodeOptions(extractTencode);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getTencodeOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim() === "" ? null : value,
    }));
  };

  const formDataToSend = { ...formData };
  for (const key in formDataToSend) {
    if (formDataToSend[key] === "") {
      formDataToSend[key] = null;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetchData(
      "loggings/log-create/",
      "PUT",
      formDataToSend,
      undefined
    );

    if (res.ok) {
      console.log(res.data);
      // You can call getLogEntries here to refresh the log entries list.
      getLogEntries();
      handleCloseCreateLogEntry(); // Close the form dialog
    } else {
      alert(JSON.stringify(res.data));
      console.error(res.data);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          name="log_date"
          value={formData.log_date}
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
          name="log_time"
          value={formData.log_time}
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
            <MenuItem value="">None</MenuItem>
            {tencodeOptions.map((tencodeOption) => (
              <MenuItem key={tencodeOption} value={tencodeOption}>
                {tencodeOption}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Current Location"
          name="current_location"
          value={formData.current_location}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Destination Location"
          name="destination_location"
          value={formData.destination_location}
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
        <Button onClick={handleCloseCreateLogEntry}>Cancel</Button>
      </form>
    </div>
  );
};

export default NewLogEntry;
