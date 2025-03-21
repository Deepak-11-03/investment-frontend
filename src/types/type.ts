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
}
export interface ContactFormProps {
    handleSubmit: (val: ContactUs) => void
}

export interface ErrorFieldProps {
    message:string;
    classes?:string
}