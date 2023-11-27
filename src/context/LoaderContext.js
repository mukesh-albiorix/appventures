import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const LoaderContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export function useLoadingContext() {
  return useContext(LoaderContext);
}
