"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";


interface LoadingContextType {
  isLoading: boolean;
  setLoading: (newState:boolean) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
   const router:any = useRouter()

  const setLoading = (newState:boolean) => {
    setIsLoading(newState)
  };


  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  
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
