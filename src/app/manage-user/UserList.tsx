import React from 'react'
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";
  import ManageUserMenu from '@/components/ManageUserMenu';
import calculateTotalAmount from '@/utils/calculateTotalAmount';
import moment from 'moment';
// import { getAllUsers } from '@/services/user.service';


export const getAllUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        cache: "no-store", // Ensure fresh data
        credentials: "include", // Include cookies for authentication
      });
      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  };
  


const UserList = async() => {
    const allUsers  = await getAllUsers() || [];
  return (
    <Table className="">
    {/* <TableCaption>A list of your recent .</TableCaption> */}
    <TableHeader>
      <TableRow>
        <TableHead className="w-[150px]">Name</TableHead>
        <TableHead className="w-[250px] text-right ">Invested</TableHead>
        <TableHead className='w-[400px] text-center'>Date</TableHead>
        <TableHead className="text-right w-[100px]">Total Payout</TableHead>
        <TableHead className="text-right">Manage</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        {allUsers?.map((user:any) => (
      <TableRow key={user?._id} className="hover:bg-transparent">
        <TableCell className="font-medium">{user?.name}</TableCell>
            <TableCell className='text-right'>${calculateTotalAmount(user,"credit")}</TableCell>
        <TableCell className='text-center'>{moment(user?.createdAt).format("MMM DD yyyy hh:mm A")}</TableCell>
            <TableCell className="text-right">${calculateTotalAmount(user, "debit")}</TableCell>
        <TableCell className="text-right" >
          <ManageUserMenu />
        </TableCell>
      </TableRow>
        ))}

    </TableBody>
  </Table>
  )
}

export default UserList