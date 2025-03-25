'use client'
import React from 'react'
import InputField from '../common/InputField'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { Button } from '../ui/button'
import { ContactFormProps } from '@/types/type'

const ContactUsForm = ({ handleSubmit }: ContactFormProps) => {
    return (
        <Card className='md:max-w-[25rem] w-full mx-auto'>

            <CardHeader>
                <CardTitle className='text-2xl'> Send Us a Message</CardTitle>
            </CardHeader>
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2> */}
            <CardContent className="grid gap-4">
                <Formik
                    initialValues={{ name: '', email: '', message: '' }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name is required'),
                        email: Yup.string().email('Invalid email address').required('Email is required'),
                        message: Yup.string().required('Message is required'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        handleSubmit(values)
                    }}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form className="flex flex-col gap-4">
                            <InputField type='text' name='name' label='Full Name' error={errors.name} placeholder="Enter your name" />
                            <InputField type='email' name='email' label='Email Address' error={errors.email} placeholder="Enter your email" />
                            <InputField type='textarea' name='message' label='Message' error={errors.message} placeholder="Type message" />
                            <Button type="submit" className=" cursor-pointer" >
                                Login
                            </Button>
                        </Form>
                    )}
                </Formik>


                {/* </form> */}
            </CardContent>
        </Card>
    )
}

export default ContactUsForm