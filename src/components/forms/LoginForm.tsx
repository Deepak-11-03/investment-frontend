'use client';
import InputField from "@/components/common/InputField";

import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button } from "../ui/button";
import { Login, LoginFormProps } from "@/types/type";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const LoginForm = () => {
const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (val: Login) => {
  const result = await signIn("credentials", {
    email: val.email,
    password: val.password,
    redirect: false,
  });

  if (result?.ok === false) {
    toast.error(result.error);
  } else {
    toast.success('Login successful');
    router.push('/');
  }
};


  const onSubmit = async (val: Login) => {
    setIsLoading(true);
    await handleSubmit(val);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center lg:px-8 px-6">
      <h2 className="text-2xl/9 text-center text-gray-900 font-bold mt-10 tracking-tight">
        Sign in to your account
      </h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').trim().required('Email is required'),
          password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, {
            message: "Password must be 8+ characters, with uppercase, lowercase, number, and special character."
          })
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await onSubmit(values)
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col w-full gap-4 pt-8 sm:w-[24rem]">
            <InputField type="email" name="email" label="Email address" error={errors.email} placeholder="Enter email" />
            
            <InputField type="password" name="password" label="Password" error={errors.password} placeholder="Enter password" />
            {/* {errors.password && <ErrorField message={errors.password}/> } */}
            <Button disabled={isLoading} type="submit" className="cursor-pointer" >
              {isLoading && <Loader2 className="animate-spin" />}
              Login
            </Button>


          </Form>
        )}
      </Formik>

    </div>
  )
}


export default LoginForm;