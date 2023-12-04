import React from "react";
import { PacmanLoader } from "react-spinners";
import "./loader.css";
import { useSelector } from "react-redux";
import { useLoadingContext } from "../../context/LoaderContext";

const Loader = () => {
  // const { isLoading } = useLoadingContext();

  const { isLoading } = useSelector((state) => state.loader);

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
