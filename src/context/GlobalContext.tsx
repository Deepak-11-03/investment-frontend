"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { checkUser, getToken } from "@/services/user.service";
// import { useLoadingState } from "./LoadingContext";
import { GlobalContextType, GlobalState } from "@/types/type";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // const { setLoading } = useLoadingState();
  const { data: session, status } = useSession();

  const [state, setGlobalState] = useState<GlobalState>({
    user: null,
    token: null,
  });

  const setState = (newState: Partial<GlobalState>) => {
    setGlobalState((prevState) => ({ ...prevState, ...newState }));
  };


  useEffect(() => {
    if(session?.user.token){
        localStorage.setItem('token',session?.user?.token)
    }    
  }, [session, status]);



  // useEffect(() => {
  //   const fetchUser = async () => {
  //     setLoading(true);

  //     try {
  //       // Fetch token from our server API instead of using next/headers
  //       const tokenData:any = await getToken()
  //       console.log(tokenData)
  //       // const { token } = await tokenRes.json();


  //       if (!tokenData.token) {
  //         setLoading(false);
  //         return;
  //       }

  //       Cookies.set("token", tokenData?.token); // Store tokenData?.token in client-side cookie
  //       setState({token: tokenData?.token });

  //       // Fetch user details
  //       if(tokenData.token){

  //         const res: any = await checkUser();
  //         setState({ user: res.data });
  //       }

  //       setTimeout(() => {
  //         setLoading(false);
  //       }, 1000);
  //     } catch (error) {
  //       console.error("Failed to fetch user", error);
  //       setState({ user: null, token: null });
  //       setLoading(false);
  //     }
  //   };

  //   fetchUser();
  // }, []);

  // Logout function
  
  // useEffect(() => {


  //   if (status === "loading") return; // Avoid fetching during session loading

  //   console.log(session)
  //   setLoading(true);

  //   // if (session) {
  //   //   setGlobalState({
  //   //     user: session.user
  //   //       ? { 
  //   //           ...session.user, 
  //   //           isAdmin: null, 
  //   //           name: session.user.name ?? null, // Ensure name is either string or null
  //   //           email: session.user.email ?? null // Ensure email is either string or null
  //   //         } 
  //   //       : null,
  //   //     token: "session-token", // No need for JWT manually
  //   //   });
  //   // } else {
  //   //   setGlobalState({
  //   //     user: null,
  //   //     token: null,
  //   //   });
  //   // }

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // }, [session, status]);
  
  const logout = () => {
    signOut({
      redirect: false,
    });
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
