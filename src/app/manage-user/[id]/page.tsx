'use client'
import Shimmer from '@/components/common/Shimmer';
import ToolTip from '@/components/common/ToolTip';
import { Button } from '@/components/ui/button';
import UserDetail from '@/components/UserDetail';
import { addTransaction, getUserById } from '@/services/user.service';
import { UserDetailTypes } from '@/types/type';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';


const page = () => {

    const { id }: { id: string } = useParams();
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<UserDetailTypes>()

    const fetchDetails = async (id: string) => {
        setLoading(true)
        const data = await getUserById(id);
        setLoading(false)
        return data; // Ensure the function returns data
    };


    const handleUpdate = async (data: any) => {
        const formData = { ...data, userId: user?._id }
        const response: any = await addTransaction(formData)

        if (response) {
            toast.success(response.message)
            setUser((prev: any) => ({
                ...prev, // Keep existing user properties
                transactions: [...prev.transactions, response.data] // Append new transaction
            }));
        }
    }

    useEffect(() => {
        if (!id) return
        fetchDetails(id).then(setUser); // Ensure state is updated with fetched data
    }, [id]);

    return (
        <div className='max-w-6xl mx-auto pt-12 sm:p-6'>
            <ToolTip text="Back">
                <Button variant={'ghost'} onClick={() => router.push('/manage-user')} className='px-2 pe-3'>
                    <Image src={'/back.svg'} height={18} width={18} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md ' />
                    Back
                </Button>
            </ToolTip>
            <h1 className='text-3xl mt-4'>User Details</h1>

            {loading ?
                <Shimmer classes="w-full h-12 my-3" length={5} />
                :
                <UserDetail user={user} handleUpdate={handleUpdate} />
            }
        </div>
    )
}

export default page