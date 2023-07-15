import React from "react";
import Board from "./Board";
import "./App.css";
import Heading from "./Heading";

/** Simple app that just shows the LightsOut game. */

function App() {
  return (
    <div className="App">
      <Heading />
      <Board />
    </div>
  );
}

export default App;
