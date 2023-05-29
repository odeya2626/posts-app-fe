import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export const UserContext = createContext();
export function useUserContext() {
  return useContext(UserContext);
}

export default function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const [openModal, setOpenModal] = useState({ state: false, type: "" });

  const handleModalState = (state, type = "") => {
    setOpenModal({ state, type });
  };

  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signOut,
        openModal,
        handleModalState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
