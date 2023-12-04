import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header = ({ setIsSignedIn, isSignedIn }) => {
  // const signout = () => {
  //   setIsSignedIn(false);
  // };

  return (
    <div className="header-bg">
      <nav>
        <div className="p-2">
          <Link to="/">Home</Link>
        </div>
        <div className="p-2">
          <Link to="/category/smartphones">Shop</Link>
        </div>
        <div className="p-2">
          <Link to="/product/1">Product</Link>
        </div>
      </nav>
      {/* {isSignedIn && (
        <div className="d-grid mt-5">
          <button className="btn-danger" onClick={signout}>
            Sign out
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Header;
