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
  const [full_name, setFull_name] = useState("Charlie");
  const [email, setEmail] = useState("officer3@test.com");
  const [rank, setRank] = useState("SERGENT");
  const [role, setRole] = useState("PATROL OFFICER");
  const [station, setStation] = useState("Nanyang Neighbourhood Police Centre");
  const [deployment_id, setDeployment_id] = useState(
    "0e68d68d-bb7d-4869-a678-b67605e2488a"
  );
  const [shift, setShift] = useState("Shift 1");
  const [sector, setSector] = useState("J5R1");

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
        }}
      >
        <Display />
      </UserContext.Provider>
    </>
  );
}

export default App;
