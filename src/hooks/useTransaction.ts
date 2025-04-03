import { useState } from 'react';
import { toast } from 'sonner';
import { addTransaction, updateTransaction } from '@/services/user.service';
import { UserDetailTypes } from '@/types/type';

const useTransaction = (user: UserDetailTypes | null, setUser: (user: UserDetailTypes | null | any) => void) => {
    const [transaction, setTransaction] = useState(null);

    const processTransaction = async (data: any) => {
        if (!user) return;

        try {
            const formData = { ...data, userId: user._id };
            let response: any;

            if (data.id) {
                delete formData.id
                response = await updateTransaction(formData, data.id);
            } else {
                response = await addTransaction(formData);
            }

            if (response) {
                toast.success(response.message);

                const updatedTransactions = user?.transactions
                    ? user.transactions.some((item: any) => item._id === response.data._id)
                        ? user.transactions.map((item: any) =>
                            item._id === response.data._id ? response.data : item
                        ) // Update existing transaction
                        : [...user.transactions, response.data] // Add new transaction
                    : [response.data]; // Initialize array if empty

                setUser((prev: any) => prev
                    ? { ...prev, transactions: updatedTransactions }
                    : null
                );
            }
        } catch (error) {
            toast.error("Transaction failed. Please try again.");
            console.error("Transaction error:", error);
        }
    };

    return { transaction, setTransaction, processTransaction };
};

export default useTransaction;
