
import InputField from "@/components/common/InputField";

import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import { Button } from "../ui/button";
import { LoginFormProps } from "@/types/type";

const LoginForm = ({ handleSubmit }: LoginFormProps) => {
  return (
    <div className="flex flex-1 flex-col justify-center px-6 items-center lg:px-8">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={Yup.object({
          email: Yup.string().email('Invalid email address').required('Email is required'),
          password: Yup.string().required('Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message: "Password must be 8+ characters, with uppercase, lowercase, number, and special character."
          })
        })}
        onSubmit={async (values, { setSubmitting }) => {
          handleSubmit(values)
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-4 pt-8 sm:w-[24rem] w-full">
            <InputField type="email" name="email" label="Email address" error={errors.email} placeholder="Enter email" />
            
            <InputField type="password" name="password" label="Password" error={errors.password} placeholder="Enter password" />
            {/* {errors.password && <ErrorField message={errors.password}/> } */}
            <Button type="submit" className=" cursor-pointer" >
              Login
            </Button>


          </Form>
        )}
      </Formik>

    </div>
  )
}


export default LoginForm;