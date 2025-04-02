"use client";

import { useGlobalState } from "@/context/GlobalContext";
import { userLogout } from "@/services/user.service";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
const {setState}= useGlobalState()

    const logout = async () => {
        const result: any = await userLogout()
        if (result.success) {
            setState({ user:null  })
            router.replace('/');
            sessionStorage.clear(); // Clear session storage
            localStorage.clear(); // Clear local storage (if storing any auth data)
        }
        
        
    };

    return <button onClick={logout} className="bg-black rounded-md text-white cursor-pointer hover:bg-gray-800 px-4 py-2 transition">Logout</button>;
}
