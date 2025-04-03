'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Shimmer from '@/components/common/Shimmer';
import ToolTip from '@/components/common/ToolTip';
import UserDetail from '@/components/UserDetail';
import useUserDetails from '@/hooks/useUserDetails';
import useTransaction from '@/hooks/useTransaction';

const UserPage = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { user, setUser, loading } = useUserDetails(id);
    const { transaction, setTransaction, processTransaction } = useTransaction(user, setUser);

    return (
        <div className='max-w-6xl mx-auto pt-12 sm:p-6'>
            <ToolTip text='Back'>
                <Button variant='ghost' onClick={() => router.push('/manage-user')} className='px-2 pe-3'>
                    <Image src='/back.svg' height={18} width={18} alt='edit' className='cursor-pointer hover:bg-gray-100 rounded-md' />
                    Back
                </Button>
            </ToolTip>

            {loading ? (
                <Shimmer classes='w-full h-12 my-3' length={5} />
            ) : (
                <UserDetail
                    user={user}
                    handleUpdate={processTransaction}
                    transaction={transaction}
                    selectedTransaction={setTransaction}
                />
            )}
        </div>
    );
};

export default UserPage;
