"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import apiClient from "@/services/http.service";
import Cookies from "js-cookie";
import { checkUser } from "@/services/user.service";

interface GlobalState {
  user: { _id: string; name: string; email: string } | null;
  token: string | null;
  isAdmin: boolean;
}

interface GlobalContextType {
  state: GlobalState;
  setState: (newState: Partial<GlobalState>) => void;
  logout: () => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setGlobalState] = useState<GlobalState>({
    user: null,
    token: null,
    isAdmin: false,
  });

  const setState = (newState: Partial<GlobalState>) => {
    setGlobalState((prevState) => ({ ...prevState, ...newState }));
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get("token"); // Get token from cookies
      if (!token) return;

      try {
        const res:any = await checkUser()
        const user = res.data;
        setState({ user, token, isAdmin: user?.isAdmin });
      } catch (error) {
        console.error("Failed to fetch user", error);
        setState({ user: null, token: null, isAdmin: false });
      }
    };
    
    fetchUser();
  }, []);

  // Logout function
  const logout = () => {
    Cookies.remove("token"); // Remove token from cookies
    setState({ user: null, token: null, isAdmin: false });
  };

  return (
    <GlobalContext.Provider value={{ state, setState, logout }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalProvider");
  }
  return context;
};
