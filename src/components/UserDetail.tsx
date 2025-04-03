'use client'
import { UserDetailTypes } from '@/types/type';
import TransactionModal from './modals/TransactionModal';
import TransactionList from './TransactionList';
import { useState } from 'react';
import { useGlobalState } from '@/context/GlobalContext';


interface Props {
    user?: UserDetailTypes | null
    transaction?: any
    handleUpdate?: (data: any) => void
    selectedTransaction?: (data: any) => void
}
const UserDetail = ({ user, handleUpdate, transaction, selectedTransaction }: Props) => {

    if (!user) {
        return <p>no details</p>
    }

    const { state } = useGlobalState()
    const [open, setOpen] = useState(false)
    const handleToggle = () => {
        setOpen(!open)
        // if(open){
        //     selectedTransaction(null)
        // }
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

                    {state.user?.isAdmin ?
                        <TransactionModal open={open} setOpen={handleToggle} handleToggle={handleToggle} transaction={transaction} handleSubmit={handleUpdate} />
                        : ''
                    }
                </div>
                <TransactionList transactions={user.transactions} handleToggle={handleToggle} />
            </div>
        </div>
    )
}

export default UserDetail