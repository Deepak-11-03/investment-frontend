'use client'
import { Formik } from "formik";
import * as Yup from "yup";
import { Field, Form } from "formik";
import InputField from "../common/InputField";
import { Button } from "../ui/button";



export const ForgotPasswordForm = ({ isOtpSent, handleSubmit, handleReset }: any) => {
    return (
        <Formik
            initialValues={{ email: '' }}
            validationSchema={Yup.object({
                email: Yup.string().email('Please enter valid email address').required('Email is required')
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    handleSubmit(values);
                    setSubmitting(false);
                }, 400);
            }}

        >
            {({ errors, touched, values, isSubmitting }) => (
                <Form className="d-flex flex-column gap-2">

                    <InputField type="email" name="email" label="Email" error={touched.email ? errors.email : ''}  placeholder="Enter email" />
                    {
                        isOtpSent
                            ?
                            <>
                                <button className="btn btn-link text-start p-0" onClick={handleReset}>
                                    Change email
                                </button>
                            </>
                            :
                            <Button type="submit" variant="default" disabled={!!errors.email?.length || !values.email || isSubmitting} className={`w-100`} >
                                Next
                            </Button>
                    }

                </Form>
            )}
        </Formik>
    )
}