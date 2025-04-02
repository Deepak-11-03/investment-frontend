
import React from 'react'
import Image from 'next/image'
import DeleteConfirmModal from './modals/DeleteConfirmModal'

const ManageUserMenu = ({user}:any) => {

  return (
    <div className='flex flex-row justify-end gap-2'>
      <Image src={'/edit.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />
      <DeleteConfirmModal user={user} />

    </div>


  )
}

export default ManageUserMenu