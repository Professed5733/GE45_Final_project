import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Display from "./components/Display";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Display />
    </>
  );
}

export default App;
