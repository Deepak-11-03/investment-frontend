"use client";
import Link from "next/link";
import useLocation from "@/hooks/useLocation";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import useWindowWidth from "@/hooks/useWindowWidth";

export default function Header() {
    
    const { navigate } = useLocation();
    const width = useWindowWidth()


    return (
        <header className="py-3 px-6  shadow-md fixed top-0 left-0 w-full z-10 bg-white">
            <div className="max-w-8xl mx-auto flex justify-between items-center">
                {/* Logo  */}
               <div className="flex gap-4 items-center">
               { width && width < 768  ?  <SideDrawer/> :'' }
                <Link href="/" className="text-2xl font-bold">
                    Investment
                </Link>
               </div>

                {/* Navbar */}
               <div className="flex items-center gap-6">
                <Navbar/>

                {/* Login and logout button */}
                <button 
                    onClick={()=>navigate('/auth/login')} 
                    className="text-white bg-black px-4 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer"
                >
                   Login
                </button>
              
               </div>
            </div>
        </header>
    );
}
