'use client';
import React, { Suspense } from 'react'
import Image from 'next/image'
import DeleteConfirmModal from './modals/DeleteConfirmModal'
import { useRouter } from 'next/navigation'

const ManageUserMenu = ({user}:any) => {

const router = useRouter()

const handleNavigation =()=>{
  router.push(`/manage-user/${user?._id}`)
}

  return (
    <div className='flex flex-row justify-end gap-2'>
      <Image onClick={handleNavigation} src={'/edit.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />

      <Suspense fallback={<div>Loading...</div>}>
      <DeleteConfirmModal user={user} />
  </Suspense>

    </div>


  )
}

export default ManageUserMenu