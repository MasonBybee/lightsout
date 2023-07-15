import React from "react";
import "./Heading.css";

const Heading = () => {
  return (
    <div className="Heading">
      <h1 className="Heading-title">Lights Out!</h1>
      <h3 className="Heading-name">By Mason Bybee</h3>
      <h5 className="Heading-how-to-play-h5">How to Play:</h5>
      <p className="Heading-how-to-play-p">
        The goal of the game is to turn all the lights out! To achieve this
        click on any of the squares below, you will notice it flips both the
        square clicked on and the squares adjacent to it. Good luck!
      </p>
    </div>
  );
};

export default Heading;
