import { Field, FieldArray, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import InputField from '../common/InputField'
import { Button } from '../ui/button'
import { numOnly } from '@/utils'
import Image from 'next/image'
import DatePicker from '../common/DatePicker'
import ErrorField from '../common/ErrorField'
import SelectField from '../common/SelectField'


const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phone: Yup.string().min(10, "Invalid Phone number").required('Phone is required'),
    date: Yup.date().required('Date is required'),
    amount: Yup.string().required("Amount is required"),
})


const UserAddForm = ({ handleToggle, handleSubmit }: any) => {
    return (
        <div>
            <Formik
                initialValues={{ name: '', email: '', phone: '', amount: '', date: '' }}
                validationSchema={validationSchema}

                onSubmit={async (values, { setSubmitting }) => {
                    handleSubmit(values)
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue, isValid, values }) => (
                    <Form className='flex flex-col gap-4'>
                        {/* <div > */}

                        <div className='flex flex-col gap-2   w-full'>
                            <InputField type="text" name="name" label="Name" error={touched.name ? errors.name : ''}  placeholder="Enter name" />
                            <InputField type="email" name="email" label="Email address" error={touched.email ? errors.email : ''} placeholder="Enter email" />
                            <InputField type="text" name="phone" label="Phone" error={touched.phone ? errors.phone : ''}  placeholder="Enter phone" onKeyPress={numOnly} />
                            
                            <InputField type="text" name="amount" label="Amount" error={
                                touched.amount ? errors.amount:''
                            } placeholder="Enter amount" onKeyPress={numOnly} />
                            <div className='w-full'>
                                <label className="block text-sm/6 font-medium text-gray-900">
                                    Date
                                </label>
                                <DatePicker 
                                    date={values.date}
                                    error={touched.date ? errors.date : ''}    
                                    setDate={(date: any) => setFieldValue(`date`, date)}
                                />
                                {touched.date && errors?.date ?  <ErrorField message={errors.date} /> : ''}
                            </div>
                        </div>

                        <div className='flex gap-2 justify-end pt-4'>
                            <Button onClick={handleToggle} variant={'outline'} >Cancel</Button>
                            <Button disabled={!isValid} type='submit'>Save</Button>
                        </div>
                        {/* </div> */}

                    </Form>
                )}
            </Formik>
        </div>

    )
}

export default UserAddForm