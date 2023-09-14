import React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import CurrentDeployment from "../dashboardComponents/CurrentDeployment";

const Dashboard = () => {
  return (
    <div style={{ padding: 16 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <CurrentDeployment />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
