'use client'
import { useRouter } from 'next/navigation';
import React from 'react'

const LoginButton = () => {
    const router = useRouter();
    return (
        <button
            onClick={() => router.push('/auth/login')}
            className="bg-black rounded-md text-white cursor-pointer hover:bg-gray-800 px-4 py-2 transition"
        >
            Login
        </button>
    )
}

export default LoginButton