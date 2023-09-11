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

const SelectUser = (props) => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [selectedIds, setSelectedIds] = useState([]);
  const [displayUsers, setDisplayUsers] = useState([]);

  const getUsers = async () => {
    const res = await fetchData("users/data-users/", "POST", {}, undefined);

    if (res.ok) {
      setDisplayUsers(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelectedIds = users.map((user) => user.user_id);
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

  return (
    <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
      <Typography variant="h5">User Table</Typography>
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
        onClick={() => onSelect(selectedIds)}
      >
        Select
      </Button>
    </Container>
  );
};

export default SelectUser;
