"use client";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const logout = async () => {
            await signOut({ redirect: false })
        sessionStorage.clear(); // Clear session storage
        localStorage.clear(); // Clear local storage (if storing any auth data)

        router.replace("/auth/login"); 
        
    };

    return <button onClick={logout} className="bg-black rounded-md text-white cursor-pointer hover:bg-gray-800 px-4 py-2 transition">Logout</button>;
}
