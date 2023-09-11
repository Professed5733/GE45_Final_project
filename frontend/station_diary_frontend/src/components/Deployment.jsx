import React, { useState, useContext, useEffect } from "react";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import UserContext from "../context/user";
import useFetch from "../hooks/useFetch";

const Deployment = () => {
  const userCtx = useContext(UserContext);
  const fetchData = useFetch();
  const [deployments, setDeployments] = useState([]);

  const getDeployments = async () => {
    const res = await fetchData(
      "/deployments/data-deployment/",
      "POST",
      {},
      undefined
    );

    if (res.ok) {
      setDeployments(res.data);
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  useEffect(() => {
    getDeployments();
  }, []);

  return (
    <div style={{ marginLeft: "20px" }}>
      <Container sx={{ textAlign: "left", marginBottom: "20px" }}>
        <Typography variant="h5">Deployment</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Sector</TableCell>
              <TableCell>Shift</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Officers</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.deployment_id}>
                <TableCell>{deployment.date}</TableCell>
                <TableCell>{deployment.sector}</TableCell>
                <TableCell>{deployment.shift}</TableCell>
                <TableCell>{deployment.is_active ? "true" : "false"}</TableCell>
                <TableCell>{deployment.users}</TableCell>
                <TableCell>
                  <Button>Update</Button>
                </TableCell>
                <TableCell>
                  <Button>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </div>
  );
};

export default Deployment;
