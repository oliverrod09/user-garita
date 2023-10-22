import { createContext, useEffect, useState } from "react";
import { back } from "../const/urls";
import axios from "axios";

export const ContextMain = createContext();

export function ContextMainProvider(props) {
  const [auth, setAuth] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, []);

  function isLogin() {
    setAuth(true);
  }

  function isLogout() {
    setAuth(false);
  }

  function formatDate(date) {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false 
    };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  return (
    <ContextMain.Provider value={{ isLogin, isLogout, auth, setAuth, formatDate }}>
      {props.children}
    </ContextMain.Provider>
  );
}
