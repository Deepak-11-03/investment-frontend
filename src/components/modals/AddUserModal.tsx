'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAddForm from "@/components/forms/UserAddForm";

import { addUserAndRevalidate } from '@/actions/userActions';

const AddUserModal = () => {

    const [open, setOpen] = useState(false)
    const handleToggle = () => {
        setOpen(!open)
    }

    const onSubmit = async (data: any) => {

        await addUserAndRevalidate(data); // Call server action
        handleToggle();
      };
    

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>
                <UserAddForm handleToggle={handleToggle} handleSubmit={onSubmit} />
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal