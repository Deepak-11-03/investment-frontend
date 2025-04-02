"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { GlobalContextType, GlobalState } from "@/types/type";
import { getUserProfile } from "@/actions/userActions";
// import { getUserProfile } from "@/services/httpService"; // Import API service

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, setGlobalState] = useState<GlobalState>({
    user: null,
    token: Cookies.get("token") || null, // Get token from cookies
  });

  const [loading, setLoading] = useState(true);

  const setState = (newState: Partial<GlobalState>) => {
    setGlobalState((prevState) => ({ ...prevState, ...newState }));
  };

  // 🔹 Validate user on refresh
  useEffect(() => {
    const fetchUser = async () => {
  

      try {
        const user = await getUserProfile(); // Fetch user profile
        if (user) {
          setState({ user: user });
        } else {
          // Cookies.remove("token"); // Remove invalid token
          setState({ user: null, token: null });
        }
      } catch (error) {
        console.error("User validation failed", error);
        setState({ user: null, token: null });
        // Cookies.remove("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {!loading && children} {/* Render only after validation */}
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
