'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UserAddForm from "@/components/forms/UserAddForm";
import { createUser } from '@/services/user.service';
import handleApiRequest from '@/helpers/handleRequest';

const AddUserModal = () => {

    const [open, setOpen] = useState(false)
    const [createdUser, setCreatedUser] = useState(null)
    const handleToggle = () => {
        setOpen(!open)
    }

    const onSubmit = async (data: any) => {

        handleApiRequest(createUser, data, (res: any) => {
            handleToggle()
          console.log(res)
        })
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