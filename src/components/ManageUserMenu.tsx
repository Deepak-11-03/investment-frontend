'use client';
import React, { Suspense } from 'react'
import Image from 'next/image'
import DeleteConfirmModal from './modals/DeleteConfirmModal'
import { useRouter } from 'next/navigation'
import ToolTip from './common/ToolTip';

const ManageUserMenu = ({user}:any) => {

const router = useRouter()

const handleNavigation =()=>{
  router.push(`/manage-user/${user?._id}`)
}

  return (
    <div className='flex flex-row justify-end gap-2'>
      <ToolTip text="View">
      <Image onClick={handleNavigation} src={'/edit.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />
      </ToolTip>
      <ToolTip text="Remove">
      <DeleteConfirmModal user={user} />
    </ToolTip>
    </div>


  )
}

export default ManageUserMenu