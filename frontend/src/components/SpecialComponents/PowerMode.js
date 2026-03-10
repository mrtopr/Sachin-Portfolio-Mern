import React from "react";
import "../../styles/PowerMode.css";

const PowerMode = ({ isBatterySavingOn, setIsBatterySavingOn, scrolled }) => {
  return (
    <div
      className="power-mode"
      style={{
        backgroundColor: isBatterySavingOn ? "red" : "green",
        top: "5px",
        display: "block",
      }}
      onClick={() => setIsBatterySavingOn(!isBatterySavingOn)}
    >
      <span className="power-tooltip">
        {isBatterySavingOn
          ? "Turn Off Low Power Mode"
          : "Turn On Low Power Mode"}
      </span>
    </div>
  );
};

export default PowerMode;
