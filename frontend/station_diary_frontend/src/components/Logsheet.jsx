import React, { useContext } from "react";
import UserContext from "../context/user";
import LogSheetTable from "./LogSheetTable";

const Logsheet = () => {
  const userCtx = useContext(UserContext);
  const deployment_id = userCtx.deployment_id;

  return (
    <div style={{ marginLeft: "20px", overflow: "auto" }}>
      {deployment_id.length === 0 ? (
        <p>You currently do not have an Active Deployment</p>
      ) : (
        <LogSheetTable />
      )}
    </div>
  );
};

export default Logsheet;
