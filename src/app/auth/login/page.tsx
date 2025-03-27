// 'use client';
import authOptions from '@/authOptions';
import Loader from '@/components/common/Loader';
import LoginForm from '@/components/forms/LoginForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


const LoginPage = async () => {
  const session = await getServerSession(authOptions);

  

  if (session?.user) {
    redirect('/');
  }

  return (
    <div className='h-screen pt-20'>
      <LoginForm />
    </div>
  )
}

export default LoginPage