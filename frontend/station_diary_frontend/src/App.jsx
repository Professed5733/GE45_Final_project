import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Display from "./components/Display";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("MockAccessToken");
  const [user_id, setUser_id] = useState(
    "6cec861e-52bd-4bd5-a996-f529bf60b7a4"
  );
  const [full_name, setFull_name] = useState("Alex");
  const [email, setEmail] = useState("officer1@test.com");
  const [rank, setRank] = useState("STATION INSPECTOR");
  const [role, setRole] = useState("TEAM LEADER");
  const [station, setStation] = useState("Nanyang Neighbourhood Police Centre");
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
        }}
      >
        <Display />
      </UserContext.Provider>
    </>
  );
}

export default App;
