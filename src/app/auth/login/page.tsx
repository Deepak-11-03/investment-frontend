'use client';
import LoginForm from '@/components/forms/LoginForm';
import { Login } from '@/types/type';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from "sonner";


const LoginPage = () => {

  const router = useRouter();


  useEffect(() => {
    
  },[])

  const handleSubmit = async (val: Login) => {
    const result = await signIn("credentials", {
      email: val.email,
      password: val.password,
      redirect: false,
    });

    if (result?.ok === false) {
      toast.error(result.error)

    }
    else {
      toast.success('Login successful')
      router.push('/')
    }
  }


  return (
    <div className='h-screen pt-20'>
      <LoginForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default LoginPage