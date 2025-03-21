'use client';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGlobalState } from '@/context/GlobalContext';
import ManageUserMenu from '@/components/ManageUserMenu';
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserAddForm from "@/components/forms/UserAddForm";
import generatePassword from "@/utils/generatePassword";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createUser } from "@/services/user.service";
import { toast } from "sonner";
import handleApiRequest from "@/helpers/handleRequest";

const ManageUser = () => {
  const [open, setOpen] = useState(false)
  const [createdUser, setCreatedUser] = useState(null)
  const handleToggle = () => {
    setOpen(!open)
  }

  const onSubmit = async (data: any) => {

    handleApiRequest(createUser, data, (res: any) => {
      console.log(res)
    })
    //     const res = await createUser(data)
    //    if(res?.data){
    //        setCreatedUser(res?.data);
    //    }
    //    else{
    //         toast.error(res?.message)
    //    }
  };



  return (
    <div className='pt-12 sm:p-6 p-1 max-w-6xl mx-auto flex flex-col gap-8'>
      {/* {open ? 
            
            : */}
      <>
        <div className="flex flex-row justify-between items-center">
          <h1 className='text-3xl'>Manage User</h1>
          {/* <Button onClick={handleToggle} className="cursor-pointer">Add User</Button> */}

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

        </div>
        <Table className="">
          {/* <TableCaption>A list of your recent .</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Invested</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Total Payout</TableHead>
              <TableHead className="text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-transparent">
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
              <TableCell className="text-right" >
                <ManageUserMenu />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </>

      {/* } */}

    </div>
  )
}

export default ManageUser