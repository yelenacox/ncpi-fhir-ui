import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { workerContext } from "../WorkerContext/WorkerProvider";

export const authContext = createContext();

export default function AuthProvider({ children }) {
  const useAuth = process.env.REACT_APP_USE_AUTH === "true";
  const [userInfo, setUserInfo] = useState(null);

  const { worker } = useContext(workerContext);
  const navigate = useNavigate();

  const path = useLocation().pathname;

  useEffect(() => {
    if (useAuth && !getRedirect()) {
      setRedirect(path);
    }
  }, []);

  useEffect(() => {
    userInfo === null && useAuth && navigate("/login");
  }, [userInfo]);

  const storeAccessToken = (codeResponse) => {
    //   const expiry = codeResponse.expires_in * 1000;
    //   setTimeout(
    //     () => alert("Your session will expire in one minute."),
    //     expiry - 60000
    //   );
    //   setTimeout(handleSignOut, expiry);
    worker?.postMessage({
      type: "storeToken",
      args: codeResponse.access_token,
      url: process.env.REACT_APP_API_ENDPOINT,
    });
    getReport("test");
  };

  const getRedirect = () => {
    return localStorage.getItem("redirect");
  };

  const setRedirect = (url) => {
    localStorage.setItem("redirect", url === "/login" ? "/" : url);
  };

  const clearToken = () => {
    worker?.postMessage({ type: "clearToken" });
  };

  const getUserInfo = () => {
    worker?.postMessage({ type: "userRequest" });
  };

  const getReport = () => {
    worker?.postMessage({ data: "TEST HERE PLEASE", type: "report" });
  };

  const AuthStore = {
    userInfo,
    setUserInfo,
    storeAccessToken,
    getRedirect,
    setRedirect,
    clearToken,
    getUserInfo,
  };
  return (
    <authContext.Provider value={AuthStore}>{children}</authContext.Provider>
  );
}
