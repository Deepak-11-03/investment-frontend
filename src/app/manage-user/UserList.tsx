import React from 'react'
import {
    Table,
    TableBody, TableCell,
    TableHead,
    TableHeader,
    TableRow
  } from "@/components/ui/table";
  import ManageUserMenu from '@/components/ManageUserMenu';
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
    //   console.log(data)
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
        <TableHead className="w-[100px]">Name</TableHead>
        <TableHead>Invested</TableHead>
        <TableHead>Date</TableHead>
        <TableHead className="text-right">Total Payout</TableHead>
        <TableHead className="text-right">Manage</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
        {allUsers?.map((user:any) => (
      <TableRow key={user?._id} className="hover:bg-transparent">
        <TableCell className="font-medium">{user?.name}</TableCell>
        <TableCell>0</TableCell>
        <TableCell>{user?.createdAt}</TableCell>
        <TableCell className="text-right">${user?.investments?.[0]?.investedAmount || 0}</TableCell>
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