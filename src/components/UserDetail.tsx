import { useGlobalState } from '@/context/GlobalContext';
import { UserDetailTypes } from '@/types/type';
import React from 'react'
import { Button } from './ui/button';
import Transaction from './Transaction';
import TransactionModal from './modals/TransactionModal';


interface Props{
    user?: UserDetailTypes
    handleUpdate?:(data:any)=>void 
}
const UserDetail = ({ user, handleUpdate }:Props) => {

    if(!user){
        return <p>no details</p>
    }

  return (
      <div className='flex flex-row justify-between'>
          <div className='w-1/2'>
              <p><strong>Name:</strong> {user?.name}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
          </div>
          <div className='w-1/2'>
              <div className='flex flex-row justify-between items-center'>
                  <h2 className='text-2xl'>Investment Details</h2>
                    
                  <TransactionModal handleUpdate={handleUpdate}/>

                </div>
              <Transaction transactions={user.transactions}/>
          </div>
      </div>
  )
}

export default UserDetail