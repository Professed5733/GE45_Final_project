import React, { useState } from "react";
import "./App.css";
import Display from "./components/Display";
import UserContext from "./context/user";
import Login from "./components/Login";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [user_id, setUser_id] = useState("");
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [rank, setRank] = useState("");
  const [role, setRole] = useState("");
  const [station, setStation] = useState("");
  const [deployment_id, setDeployment_id] = useState("");
  const [shift, setShift] = useState("");
  const [sector, setSector] = useState("");

  const [showLogin, setShowLogin] = useState(true);

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    setAccessToken("");
    setUser_id("");
    setFull_name("");
    setEmail("");
    setRank("");
    setRole("");
    setStation("");
    setDeployment_id("");
    setShift("");
    setSector("");
  };

  return (
    <>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          user_id,
          setUser_id,
          full_name,
          setFull_name,
          email,
          setEmail,
          rank,
          setRank,
          role,
          setRole,
          station,
          setStation,
          deployment_id,
          setDeployment_id,
          shift,
          setShift,
          sector,
          setSector,
          handleLogout,
        }}
      >
        {accessToken.length === 0 && showLogin && (
          <Login handleCloseLogin={handleCloseLogin} />
        )}
        {accessToken.length > 0 && <Display />}
      </UserContext.Provider>
    </>
  );
}

export default App;
