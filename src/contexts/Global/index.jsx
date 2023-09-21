import { createContext, useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import toast, { Toaster } from "react-hot-toast";

import { getUser, setUser as saveUser } from '../../services/auth';

import './style.css';

export const GlobalContext = createContext({});

export const useGlobal = () => useContext(GlobalContext);

export function GlobalProvider(props) {
  const [isLoad, setIsLoad] = useState(false);
  const [user, setUser] = useState(getUser() || null);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  const handleLoader = (isLoad) => setIsLoad(isLoad);

  const handleMessage = (message, type) => {
    return toast[type](message, {
      className: `toast-${type}`,
      style: {
        opacity: 1
      }
    });
  };

  const handleUser = (user) => setUser(user);

  return (
    <GlobalContext.Provider value={{
      handleLoader,
      handleMessage,
      user,
      handleUser
    }}>
      {props.children}

      {isLoad && ReactDOM.createPortal(
        <div className="loader">
          <div className="loader-content" />
        </div>, document.body)}
      <Toaster containerStyle={{ top: '4rem' }} />
    </GlobalContext.Provider>
  );
}