import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useGlobalState } from '@/context/GlobalContext';

// Auth Guard HOC
const authGuard = (WrappedComponent: any) => {
  return (props: any) => {
    const router = useRouter();
    const {state} = useGlobalState()
    const token = typeof window !== 'undefined' ? state.user?._id : null;

    useEffect(() => {
      if (!token) {
        router.push('/auth/login'); // Redirect to login if not authenticated
      }
    }, [token, router]);

    if (!token) return null; // Prevent rendering while redirecting

    return <WrappedComponent {...props} />;
  };
};

export default authGuard;
