"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import apiClient from "@/services/http.service";
import Cookies from "js-cookie";
import { checkUser } from "@/services/user.service";


interface LoadingContextType {
  isLoading: boolean;
  setLoading: (newState:boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (newState:boolean) => {
    setIsLoading(newState)
  };
  
  // Logout function


  return (
    <LoadingContext.Provider value={{ isLoading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoadingState = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingState must be used within a LoadingProvider");
  }
  return context;
};
