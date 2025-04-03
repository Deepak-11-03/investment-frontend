'use client'
import { UserDetailTypes } from '@/types/type';
import TransactionModal from './modals/TransactionModal';
import TransactionList from './TransactionList';
import { useState } from 'react';
import { useGlobalState } from '@/context/GlobalContext';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { getTitleCase } from '@/utils';


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
        <div className='flex flex-row justify-between pt-4 gap-12'>
            <div className='w-1/2 lg:pe-24'>
                <h2 className='text-2xl '>User Details</h2>
                
                    <Card className='p-3 mt-4 '>
                        <CardContent className='flex flex-row gap-4 items-center'>
                            <Avatar className='w-20 h-20'>
                                <AvatarImage src={`https://eu.ui-avatars.com/api/?name=${user?.name}&size=350`} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                              <p className='font-bold'>{getTitleCase(user?.name)}</p>
                              <p>{user?.email}</p>
                              <p>{user?.phone}</p>
                            </div>
                        </CardContent>
                        <CardContent  className='flex flex-row justify-between'>
                            <div  className='flex flex-col gap-1'>
                                <h4>Total Investment</h4>
                                <div className='text-xl font-bold'>₹ {user?.totalCredit}</div>
                            </div>
                            <div  className='flex flex-col gap-1'>
                                <h4>Remaining Amount</h4>
                                <div className='text-xl font-bold'>₹ {user?.remainingAmount}</div>
                            </div>
                        </CardContent>
                    </Card>
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