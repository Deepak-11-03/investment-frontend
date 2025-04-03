import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { getUserById } from '@/services/user.service';
import { UserDetailTypes } from '@/types/type';

const useUserDetails = (id: string) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<UserDetailTypes | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const userData = await getUserById(id);
                setUser(userData);
            } catch (error) {
                toast.error("Failed to fetch user details.");
                console.error("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    return { user, setUser, loading };
};

export default useUserDetails;
