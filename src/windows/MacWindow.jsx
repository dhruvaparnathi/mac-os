import React from "react";
import "./macwindow.scss";
import { Rnd } from "react-rnd";

const MacWindow = ({ children }) => {
  return (
    <div className="mac-window-container">
        <Rnd
      bounds="window"
      default={{
        x: window.innerWidth / 2 - 300,
        y: window.innerHeight / 2 - 400,
        width: 600,
        height: 400,
      }}
      style={{ zIndex: 1000 }}
      minWidth={300}
      minHeight={200}
      enableResizing={true}
      dragGrid={[1, 1]}
      dragHandleClassName="window-navbar"
    >
      <div className="mac-window">
        <div className="window-navbar">
          <div className="dots">
            <div className="dot red"></div>
            <div className="dot yellow"></div>
            <div className="dot green"></div>
          </div>
          <div className="title">
            <p>dhruvaparnathi - azs</p>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </Rnd>
    </div>
  );
};

export default MacWindow;
