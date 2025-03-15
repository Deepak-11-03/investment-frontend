import { ReactNode } from "react";

export interface AppLayoutProps {
    page: ReactNode;
}

export interface NavLink {
    name:string,
    path:string
}
  
export interface InputFieldProps {
    name: string;
    type: string;
    label: string;
    [key: string]: string | number | boolean | undefined;
  }
  
