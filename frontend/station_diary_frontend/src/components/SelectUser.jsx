import React, { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

const SelectUser = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const { accessToken } = userCtx;

  const [selectedIds, setSelectedIds] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);
  const [filter, setFilter] = useState({
    email: "",
    full_name: "",
    rank: "",
    role: "",
    station: "",
  });

  const [roleOptions, setRoleOptions] = useState([]);
  const [stationOptions, setStationOptions] = useState([]);
  const [rankOptions, setRankOptions] = useState([]);

  const getUsers = async () => {
    const res = await fetchData(
      "users/data-users/",
      "POST",
      filter,
      accessToken
    );

    if (res.ok) {
      setDisplayUsers(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const getRoleOptions = async () => {
    const res = await fetchData(
      "users/data-list/roles/",
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      setRoleOptions(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getRankOptions = async () => {
    const res = await fetchData(
      "users/data-list/ranks/",
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      setRankOptions(res.data);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  const getStationOptions = async () => {
    const res = await fetchData(
      "users/data-list/stations/",
      "GET",
      undefined,
      accessToken
    );

    if (res.ok) {
      const extractedStations = res.data.map(
        (stationData) => stationData.station
      );
      setStationOptions(extractedStations);
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  useEffect(() => {
    getUsers();
    getRoleOptions();
    getStationOptions();
    getRankOptions();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = displayUsers.map((user) => user.user_id); // Use displayUsers here
      setSelectedIds(newSelectedIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleClick = (event, user_id) => {
    const selectedIndex = selectedIds.indexOf(user_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedIds, user_id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedIds.slice(1));
    } else if (selectedIndex === selectedIds.length - 1) {
      newSelected = newSelected.concat(selectedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedIds.slice(0, selectedIndex),
        selectedIds.slice(selectedIndex + 1)
      );
    }

    setSelectedIds(newSelected);
  };

  const isSelected = (user_id) => selectedIds.indexOf(user_id) !== -1;

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleSelectButtonClick = () => {
    // Call the callback function provided by the parent component (CreateDeployment)
    props.onSelectUsers(selectedIds);
  };

  return (
    <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
      <Typography variant="h5">Select Officers</Typography>
      <div>
        <TextField
          label="Email"
          name="email"
          value={filter.email}
          onChange={handleFilterChange}
          variant="outlined"
          margin="dense"
        />
        <TextField
          label="Full Name"
          name="full_name"
          value={filter.full_name}
          onChange={handleFilterChange}
          variant="outlined"
          margin="dense"
        />
        <TextField
          select
          label="Rank"
          name="rank"
          value={filter.rank}
          onChange={handleFilterChange}
          variant="outlined"
          margin="dense"
          sx={{ minWidth: "150px" }}
        >
          {" "}
          <MenuItem value="">None</MenuItem>
          {rankOptions.map((option) => (
            <MenuItem key={option.rank} value={option.rank}>
              {option.rank}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Role"
          name="role"
          value={filter.role}
          onChange={handleFilterChange}
          variant="outlined"
          margin="dense"
          sx={{ minWidth: "150px" }}
        >
          {" "}
          <MenuItem value="">None</MenuItem>
          {roleOptions.map((option) => (
            <MenuItem key={option.role} value={option.role}>
              {option.role}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Station"
          name="station"
          value={filter.station}
          onChange={handleFilterChange}
          variant="outlined"
          margin="dense"
          sx={{ minWidth: "150px" }}
        >
          {" "}
          <MenuItem value="">None</MenuItem>
          {stationOptions.map((station) => (
            <MenuItem key={station} value={station}>
              {station}
            </MenuItem>
          ))}
        </TextField>
        <Button
          variant="contained"
          color="primary"
          onClick={getUsers}
          style={{ marginLeft: "10px" }}
        >
          Filter
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  checked={selectedIds.length === displayUsers.length}
                  indeterminate={
                    selectedIds.length > 0 &&
                    selectedIds.length < displayUsers.length
                  }
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Rank</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Station</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayUsers.map((user) => {
              // Use displayUsers instead of users
              const isItemSelected = isSelected(user.user_id);

              return (
                <TableRow
                  key={user.user_id}
                  onClick={(event) => handleClick(event, user.user_id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell>
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>{user.user_id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.full_name}</TableCell>
                  <TableCell>{user.rank || "-"}</TableCell>
                  <TableCell>{user.role || "-"}</TableCell>
                  <TableCell>{user.station || "-"}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="subtitle1">
        Selected IDs: {selectedIds.join(", ")}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSelectButtonClick}
      >
        Select
      </Button>
    </Container>
  );
};

export default SelectUser;
