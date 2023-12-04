import React from "react";
import { useNavigate } from "react-router-dom";
function Protected({ isSignedIn, children }) {
  const Navigate = useNavigate();

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default Protected;
