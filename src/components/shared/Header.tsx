"use client";
import Link from "next/link";

// import useLocation from "@/hooks/useLocation";
import Navbar from "./Navbar";
import SideDrawer from "./SideDrawer";
import useWindowWidth from "@/hooks/useWindowWidth";
import { useGlobalState } from "@/context/GlobalContext";
import { userLogout } from "@/services/user.service";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
    const router = useRouter()
    const width = useWindowWidth()
    const { data: session, status } = useSession();

    const handleLogout = async () => {
        await signOut({redirect: false})
        router.push('/')
    }

    return (
        <header className="bg-white shadow-md w-full fixed left-0 px-1 py-3 sm:px-6 top-0 z-10">
            <div className="flex justify-between items-center max-w-8xl mx-auto">
                {/* Logo  */}
                <div className="flex gap-4 items-center">
                    {width && width < 768 ? <SideDrawer /> : ''}
                    <Link href="/" className="text-2xl font-bold">
                        Investment
                    </Link>
                </div>

                {/* Navbar */}
                <div className="flex gap-6 items-center">
                    <Navbar user={session?.user} />

                    {/* Login and logout button */}
                    {status === "authenticated" ?
                        <button
                            onClick={handleLogout}
                            className="bg-black rounded-md text-white cursor-pointer hover:bg-gray-800 px-4 py-2 transition"
                        >
                            Logout
                        </button>
                        :
                        <button
                            onClick={() => router.push('/auth/login')}
                            className="bg-black rounded-md text-white cursor-pointer hover:bg-gray-800 px-4 py-2 transition"
                        >
                            Login
                        </button>
                    }


                </div>
            </div>
        </header>
    );
}
