import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NewLogEntry from "./NewLogEntry";
import RefLogEntry from "./RefLogEntry";
import {
  descendingComparator,
  getComparator,
  stableSort,
} from "../utilities/tableSorting";

const LogSheetTable = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const deployment_id = userCtx.deployment_id;

  const [logEntries, setLogEntries] = useState([]);
  const [orderBy, setOrderBy] = useState("log_date");
  const [order, setOrder] = useState("asc");

  const getLogEntries = async () => {
    const res = await fetchData(
      "loggings/log-get/" + deployment_id + "/",
      "GET",
      undefined,
      undefined
    );

    if (res.ok) {
      setLogEntries(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getLogEntries();
  }, []);

  const [openLogEntry, setopenLogEntry] = useState(false);
  const [openRefLogEntry, setOpenRefLogEntry] = useState(false);
  const [selectedLogEntry, setSelectedLogEntry] = useState(null);

  const handleOpenCreateLogEntry = () => {
    setopenLogEntry(true);
  };

  const handleCloseCreateLogEntry = () => {
    setopenLogEntry(false);
  };

  const handleOpenRefLogEntry = (logEntry) => {
    setSelectedLogEntry(logEntry);
    setOpenRefLogEntry(true);
  };

  const handleCloseRefLogEntry = () => {
    setOpenRefLogEntry(false);
  };

  const handleDeleteLogEntry = async (logEntryId) => {
    const res = await fetchData(
      "loggings/log-delete/" + logEntryId + "/",
      "POST",
      undefined,
      undefined
    );

    if (res.ok) {
      console.log(res.data);
      getLogEntries();
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when changing the number of rows per page
  };

  return (
    <div style={{ marginLeft: "20px", overflow: "auto" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Logsheet</Typography>
        <Button variant="outlined" onClick={handleOpenCreateLogEntry}>
          New Entry
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "log_date"}
                  direction={orderBy === "log_date" ? order : "asc"}
                  onClick={() => handleSort("log_date")} // Sort by "Date" column
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "log_time"}
                  direction={orderBy === "log_time" ? order : "asc"}
                  onClick={() => handleSort("log_time")} // Sort by "Time" column
                >
                  Time
                </TableSortLabel>
              </TableCell>
              <TableCell>Tencode</TableCell>
              <TableCell>Current Location</TableCell>
              <TableCell>Destination Location</TableCell>
              <TableCell>Details</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(logEntries, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((logEntry) => (
                <TableRow key={logEntry.logging_id}>
                  <TableCell>{logEntry.log_date}</TableCell>
                  <TableCell>{logEntry.log_time}</TableCell>
                  <TableCell>{logEntry.tencode}</TableCell>
                  <TableCell>{logEntry.current_location}</TableCell>
                  <TableCell>{logEntry.destination_location}</TableCell>
                  <TableCell>{logEntry.details}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenRefLogEntry(logEntry)}>
                      Reference
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteLogEntry(logEntry.logging_id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]} // Customize the available options
          component="div"
          count={logEntries.length} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>

      <Dialog
        open={openLogEntry}
        onClose={handleCloseCreateLogEntry}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <NewLogEntry
            handleCloseCreateLogEntry={handleCloseCreateLogEntry}
            getLogEntries={getLogEntries}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openRefLogEntry}
        onClose={handleCloseRefLogEntry}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <RefLogEntry
            logEntry={selectedLogEntry}
            handleCloseRefLogEntry={handleCloseRefLogEntry}
            getLogEntries={getLogEntries}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LogSheetTable;
