import { ReactNode } from "react";

export interface AppLayoutProps {
    page: ReactNode;
}

export interface NavLink {
    name: string,
    path: string
}


export interface ApiResponse{
    data?:any,
    status:number,
    message:string
  }
  

export interface InputFieldProps {
    name: string;
    type: string;
    label: string;
    error?:string;
    required?:boolean;
    [key: string]: string | number | boolean | ((event: any) => void) | undefined;
}

export interface Login {
    email: string;
    password: string;
}
export interface ContactUs {
    name: string;
    email: string;
    message: string;
}

export interface LoginFormProps {
    handleSubmit: (val: Login) => void
    isLoading?:boolean   
}
export interface ContactFormProps {
    handleSubmit: (val: ContactUs) => void
}

export interface ErrorFieldProps {
    message:string;
    classes?:string
}

export interface GlobalState {
  user: User | null;
  token: string | null;
}

export interface GlobalContextType {
  state: GlobalState;
  setState: (newState: Partial<GlobalState>) => void;
//   logout: () => void;
}


export interface User {
     name: string |null; 
     email: string | null;
     isAdmin:boolean | null; 
}

export interface NavProps{
       state:GlobalState
}

export interface UserDetailTypes {
    _id:string;
    name: string;
    email: string;
    phone: string;
    transactions: any[]
}
