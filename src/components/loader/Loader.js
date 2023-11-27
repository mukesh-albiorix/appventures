import React from "react";
import { PacmanLoader } from "react-spinners";
import "./loader.css";
import { useLoadingContext } from "../../context/LoaderContext";

const Loader = () => {
  const { isLoading } = useLoadingContext();
  return (
    <>
      {isLoading && (
        <div className="loader-wrapper">
          <PacmanLoader color="#000000" />
        </div>
      )}
    </>
  );
};

export default Loader;
