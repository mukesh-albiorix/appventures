import React from "react";
import { PacmanLoader } from "react-spinners";
import "./loader.css";

const Loader = () => {
  return (
    <>
      <div className="loader-wrapper">
        <PacmanLoader color="#000000" />
      </div>
    </>
  );
};

export default Loader;
