"use client";
import Link from "next/link";

// import useLocation from "@/hooks/useLocation";
import Navbar from "../Navbar";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import { useGlobalState } from "@/context/GlobalContext";

export default function Header() {
const {state} = useGlobalState()

    return (
        <header className="bg-white shadow-md w-full fixed left-0 px-1 py-3 sm:px-6 top-0 z-10">
            <div className="flex justify-between items-center max-w-8xl mx-auto">
                {/* Logo  */}
                <div className="flex gap-4 items-center">
                    {/* {width && width < 768 ? <SideDrawer /> : ''} */}
                    <Link href="/" className="text-2xl font-bold">
                        Investment
                    </Link>
                </div>

                {/* Navbar */}
                <div className="flex gap-6 items-center">
                    <Navbar user={state.user} />

                    {/* Login and logout button */}
                    { state.user?.email ?
                        // <button
                        //     onClick={handleLogout}
                        //     className="bg-black rounded-md text-white cursor-pointer hover:bg-gray-800 px-4 py-2 transition"
                        // >
                        //     Logout
                        // </button>
                        <LogoutButton />
                        :
                        <LoginButton />
                    }


                </div>
            </div>
        </header>
    );
}
