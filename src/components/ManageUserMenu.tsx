import React from 'react'

import Image from 'next/image'


const ManageUserMenu = () => {
  return (

    <div className='flex flex-row justify-end gap-4'>
      <Image src={'/edit.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />
      <Image src={'/trash.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />

    </div>


  )
}

export default ManageUserMenu