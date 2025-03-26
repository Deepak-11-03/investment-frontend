"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Navbar from "../Navbar";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";

export default function ClientHeader() {
    const { data: session, status } = useSession(); // ✅ Track session changes

    return (
        <div className="flex gap-6 items-center">
            <Navbar user={session} />
            {status === "loading" ? null : session?.user ? <LogoutButton /> : <LoginButton />}
        </div>
    );
}
