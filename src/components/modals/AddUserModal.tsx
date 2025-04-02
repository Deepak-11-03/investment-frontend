'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAddForm from "@/components/forms/UserAddForm";

import { addUserAndRevalidate } from '@/actions/userActions';

const AddUserModal = () => {

    const [open, setOpen] = useState(false)
    interface User {
        email: string;
        password: string
        // Add other properties as needed
    }

    const [user, setUser] = useState<User | null>(null)
    const handleToggle = () => {
        setOpen(!open)
    }

    const onSubmit = async (data: any) => {

        const res = await addUserAndRevalidate(data); // Call server actions
        if (res) {
            setUser(res)
        }

        // handleToggle();
    };


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{user ? "User Details" : "Add User"}</DialogTitle>
                </DialogHeader>
                {user ?
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-row justify-between'>
                            <div>Email</div>
                            <div>{user?.email}</div>
                        </div>
                        {/* <div> */}
                        <div className='flex flex-row justify-between'>
                            <div>Password</div>
                            <div>{user?.password}</div>
                        </div>
                    </div>
                    :
                    <UserAddForm handleToggle={handleToggle} handleSubmit={onSubmit} />
                }
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal