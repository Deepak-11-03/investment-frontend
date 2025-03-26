"use client"
import { navlinks } from '@/constants/constant'
import { useGlobalState } from '@/context/GlobalContext'
import { NavLink, NavProps } from '@/types/type'
import Link from 'next/link'
import React from 'react'



const Navbar = ({user}:any) => {

    const {state} = useGlobalState()
    return (
        <nav className='hidden md:block'>
            <ul className="flex space-x-4">
                {navlinks.map((link: NavLink) =>
                    <li key={link.path} className="border-b-2 border-transparent hover:border-black py-1 transition">
                        <Link href={link.path} className="px-2 py-2">
                            {link.name}
                        </Link>
                    </li>
                )}
                 { user?.isAdmin ? 
                 <li className="border-b-2 border-transparent hover:border-black py-1 transition">
                        <Link href={'/manage-user'} className="px-2 py-2">
                            Manage user
                        </Link>
                    </li>
                    : 
                    <li className="border-b-2 border-transparent hover:border-black py-1 transition">
                        <Link href={'/account'} className="px-2 py-2">
                            My Account
                        </Link>
                    </li>
                    }
            </ul>
        </nav>
    )
}

export default Navbar