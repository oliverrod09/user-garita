import { createContext, useEffect, useState } from "react";
import { back } from "../const/urls";
import axios from "axios";

export const ContextMain = createContext();

export function ContextMainProvider(props) {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setAuth(true)
    }
  }, [])
    
    function isLogin() {
        setAuth(true)
      }
    
      function isLogout() {
        setAuth(false)
      }


  return (
    <ContextMain.Provider value={{isLogin, isLogout, auth, setAuth }}>{props.children}</ContextMain.Provider>
  );
}
