import React, { useContext } from "react";
import UserContext from "../context/user";

const CurrentDeployment = () => {
  // Access the user's deployment_id, sector, and shift from the context
  const userCtx = useContext(UserContext);
  const { deployment_id, sector, shift } = userCtx;

  return (
    <div>
      {deployment_id ? (
        // If the user has an active deployment
        <>
          <p>You're currently deployed to:</p>
          <p>Sector: {sector}</p>
          <p>Shift: {shift}</p>
        </>
      ) : (
        // If the user doesn't have an active deployment
        <p>You currently don't have any active deployment.</p>
      )}
    </div>
  );
};

export default CurrentDeployment;
