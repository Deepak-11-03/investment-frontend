'use client';
import LoginForm from '@/components/forms/LoginForm';
import { Login } from '@/types/type';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from "sonner";


const LoginPage = () => {

  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)
  const handleSubmit = async (val: Login) => {
    setIsLoading(true)
    const result = await signIn("credentials", {
      email: val.email,
      password: val.password,
      redirect: false,
    });

    if (result?.ok === false) {
      setIsLoading(false)
      toast.error(result.error)
      
    }
    else {
      toast.success('Login successful')
      router.push('/')
      setIsLoading(false)
    }
  }


  return (
    <div className='h-screen pt-20'>
      <LoginForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  )
}

export default LoginPage