// 'use client';


import AddUserModal from "@/components/modals/AddUserModal";
import UserList from "./UserList";
import { Suspense } from "react";
import Shimmer from "@/components/common/Shimmer";

const ManageUser = async () => {

  return (
    <div className='flex flex-col p-1 gap-8 max-w-6xl mx-auto pt-12 sm:p-6'>
      <>
        <div className="flex flex-row justify-between items-center">
          <h1 className='text-3xl'>Manage User</h1>
          {/* <Button onClick={handleToggle} className="cursor-pointer">Add User</Button> */}

          <AddUserModal />

        </div>
        <Suspense fallback={<Shimmer classes="w-full h-12" length={5} />}>
          <UserList />
        </Suspense>
      </>

      {/* } */}

    </div>
  )
}

export default ManageUser