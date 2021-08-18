import { PropTypes } from "@material-ui/core";
import React, { createContext, ReactNode, useState, useReducer } from "react";
import { authReducer, AuthState } from "../reducers/AuthReducer";
import { AuthActionType } from "../reducers/types";

const { TOGGLE_AUTH } = AuthActionType;

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextDefault {
  authInfo: AuthState;
  toggleAuth: (username: string) => void;
}

const authContextDefaultData = {
  isAuthenticated: false,
  username: "",
};

export const AuthContext = createContext<AuthContextDefault>({
  authInfo: authContextDefaultData,
  toggleAuth: () => {},
});

const AuthContextProvider = ({ children }: AuthContextProps) => {
  const [authInfo, dispatch] = useReducer(authReducer, authContextDefaultData);
  const toggleAuth = (username: string) =>
    dispatch({ type: TOGGLE_AUTH, payload: username });

  const authContextData = {
    authInfo,
    toggleAuth,
  };

  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
