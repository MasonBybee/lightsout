import React from "react";
import "./Restart.css";

const Restart = ({ restartGame }) => {
  return (
    <button className="Restart" onClick={() => restartGame()}>
      Restart
    </button>
  );
};

export default Restart;
