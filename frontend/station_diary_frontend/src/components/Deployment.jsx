import React, { useState, useContext, useEffect } from "react";
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
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";
import CreateDeployment from "./CreateDeployment";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import EditDeployment from "./EditDeployment";
import {
  descendingComparator,
  getComparator,
  stableSort,
} from "../utilities/tableSorting";

const Deployment = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();

  const { accessToken } = userCtx;

  const [deployments, setDeployments] = useState([]);
  const [userNames, setUserNames] = useState({});

  const [openCreateDeployment, setOpenCreateDeployment] = useState(false);
  const [openEditDeployment, setOpenEditDeployment] = useState(false);

  const [selectedDeployment, setSelectedDeployment] = useState(null);

  const [orderBy, setOrderBy] = useState("date"); // Default sorting by "Date"
  const [order, setOrder] = useState("asc"); // Default sorting order

  const handleOpenCreateDeployment = () => {
    setOpenCreateDeployment(true);
  };

  const handleCloseCreateDeployment = () => {
    setOpenCreateDeployment(false);
  };

  const handleOpenEditDeployment = (deployment) => {
    setSelectedDeployment(deployment);
    setOpenEditDeployment(true);
  };

  const handleCloseEditDeployment = () => {
    setOpenEditDeployment(false);
  };

  const getDeployments = async () => {
    const res = await fetchData(
      "deployments/data-deployment/",
      "POST",
      {},
      accessToken
    );

    if (res.ok) {
      setDeployments(res.data);
      const userIds = res.data.map((deployment) => deployment.users).flat();
      fetchUserNames(userIds);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  const fetchUserNames = async (userIds) => {
    if (userIds.length === 0) {
      return;
    }

    const res = await fetchData(
      "users/data-name/",
      "POST",
      { user_ids: userIds },
      accessToken
    );

    if (res.ok) {
      setUserNames(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getDeployments();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0); // Reset to the first page when changing the number of rows per page
  };

  const handleDeleteDeployment = async (deploymentId) => {
    const res = await fetchData(
      "deployments/delete/" + deploymentId + "/",
      "POST",
      undefined,
      accessToken
    );

    if (res.ok) {
      console.log(res.data);
      getDeployments();
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

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  return (
    <div style={{ marginLeft: "20px", overflow: "auto" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Deployment</Typography>
        <Button variant="outlined" onClick={handleOpenCreateDeployment}>
          Create Deployment
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleSort("date")} // Sort by "Date" column
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "sector"}
                  direction={orderBy === "sector" ? order : "asc"}
                  onClick={() => handleSort("sector")} // Sort by "Sector" column
                >
                  Sector
                </TableSortLabel>
              </TableCell>
              {/* Add more columns here with TableSortLabel */}
              <TableCell>Shift</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Officers</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(deployments, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((deployment) => (
                <TableRow key={deployment.deployment_id}>
                  <TableCell>{deployment.date}</TableCell>
                  <TableCell>{deployment.sector}</TableCell>
                  <TableCell>{deployment.shift}</TableCell>
                  <TableCell>
                    {deployment.is_active ? "true" : "false"}
                  </TableCell>
                  <TableCell>
                    {deployment.users
                      .map((userId) => userNames[userId])
                      .join(", ")}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleOpenEditDeployment(deployment)}
                    >
                      Update
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        handleDeleteDeployment(deployment.deployment_id)
                      }
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
          count={deployments.length} // Total number of rows
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Container>

      <Dialog
        open={openCreateDeployment}
        onClose={handleCloseCreateDeployment}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <CreateDeployment
            handleCloseCreateDeployment={handleCloseCreateDeployment}
            getDeployments={getDeployments}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={openEditDeployment}
        onClose={handleCloseEditDeployment}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <EditDeployment
            deployment={selectedDeployment}
            handleCloseEditDeployment={handleCloseEditDeployment}
            getDeployments={getDeployments}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Deployment;
