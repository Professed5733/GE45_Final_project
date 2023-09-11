import React from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Deployment from "./Deployment";
import Logsheet from "./Logsheet";

const Display = () => {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Deployment />
      <Logsheet />
    </>
  );
};

export default Display;
