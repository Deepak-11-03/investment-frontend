'use client'
import { useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import Image from 'next/image'
import { deleteUserProfile } from '@/actions/userActions'

const DeleteConfirmModal = ({user}:any) => {

    const [isDeleting, setIsDeleting]= useState(false)
    const handleDelete= async()=>{
setIsDeleting(true)
const res = await deleteUserProfile(user?._id)
setIsDeleting(false)
}


  return (
      <AlertDialog>
          <AlertDialogTrigger asChild>
             <Image src={'/trash.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />
          </AlertDialogTrigger>
          <AlertDialogContent>
              <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to remove {user?.name} ?</AlertDialogTitle>
                  <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete user
                      account.
                  </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                  <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                  <AlertDialogAction disabled={isDeleting} onClick={()=>handleDelete()}>Delete</AlertDialogAction>
              </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
  )
}

export default DeleteConfirmModal