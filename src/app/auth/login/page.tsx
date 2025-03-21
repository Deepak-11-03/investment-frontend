'use client';
import LoginForm from '@/components/forms/LoginForm'
import { useGlobalState } from '@/context/GlobalContext';
import useLocation from '@/hooks/useLocation';
import { userLogin } from '@/services/user.service';
import { Login } from '@/types/type';
import React from 'react'
import { toast } from "sonner"


const LoginPage = () => {
  const {state,setState} = useGlobalState()
  const {navigate} = useLocation()

  const handleSubmit = async(val: Login) => {
    // try {
      const data :any = await userLogin(val)

      if(data.success){
        setState({token:data.token})
        toast.success(data.message)

      }
      else{
        toast.error(data.message)
      }
      console.log(data)
      // setState({user:{_id:'1',name:'John Doe',email:val.email}})
      // setState({isAdmin:true})
      // navigate('/')
    // } catch (error) {
    // }
  }


  return (
    <div className='h-screen pt-20'>
      <LoginForm handleSubmit={handleSubmit}/>
      </div>
  )
}

export default LoginPage