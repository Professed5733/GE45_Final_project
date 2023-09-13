import React from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import Deployment from "./Deployment";
import Logsheet from "./Logsheet";
import CreateDeployment from "./CreateDeployment";
import SelectUser from "./SelectUser";

const Display = () => {
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const renderComponent = (componentName) => {
    switch (componentName) {
      case "Dashboard":
        return <Dashboard />;
      case "Deployment":
        return <Deployment />;
      case "Logsheet":
        return <Logsheet />;
      default:
        return null;
    }
  };
  return (
    <>
      <Navbar setSelectedComponent={setSelectedComponent} />
      {renderComponent(selectedComponent)}
    </>
  );
};

export default Display;
