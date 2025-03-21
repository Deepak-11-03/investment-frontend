import { navlinks } from '@/constants/constant'
import { NavLink } from '@/types/type'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <nav className='hidden md:block'>
            <ul className="flex space-x-4">
                {navlinks.map((link: NavLink) =>
                    <li key={link.path} className=" border-b-2 border-transparent py-1 hover:border-black transition">
                        <Link href={link.path} className=" py-2 px-2">
                            {link.name}
                        </Link>
                    </li>
                )}
                 <li className=" border-b-2 border-transparent py-1 hover:border-black transition">
                        <Link href={'/manage-user'} className=" py-2 px-2">
                            Manage user
                        </Link>
                    </li>
            </ul>
        </nav>
    )
}

export default Navbar