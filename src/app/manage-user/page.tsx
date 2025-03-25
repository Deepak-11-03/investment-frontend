// 'use client';


import AddUserModal from "@/components/modals/AddUserModal";
import UserList from "./UserList";

const ManageUser = async() => {





  return (
    <div className='flex flex-col p-1 gap-8 max-w-6xl mx-auto pt-12 sm:p-6'>
      {/* {open ? 
            
            : */}
      <>
        <div className="flex flex-row justify-between items-center">
          <h1 className='text-3xl'>Manage User</h1>
          {/* <Button onClick={handleToggle} className="cursor-pointer">Add User</Button> */}

          <AddUserModal />
     

        </div>
       <UserList/>
      </>

      {/* } */}

    </div>
  )
}

export default ManageUser