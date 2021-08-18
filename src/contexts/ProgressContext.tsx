import React, { createContext, ReactNode } from "react";

interface ProgressContextProviderProps {
  children: ReactNode;
}

const progressDefault = {
  lastTime: "05/02/1991",
  status: "In progress",
};

export const ProgressContext = createContext(progressDefault);

const ProgressContextProvider = ({
  children,
}: ProgressContextProviderProps) => {
  return (
    <ProgressContext.Provider value={progressDefault}>
      {children}
    </ProgressContext.Provider>
  );
};

export default ProgressContextProvider;
