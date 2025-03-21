import { FieldArray, Form, Formik } from 'formik'
import React from 'react'
import * as Yup from 'yup'
import InputField from '../common/InputField'
import { Button } from '../ui/button'
import { numOnly } from '@/utils'
import Image from 'next/image'
import DatePicker from '../common/DatePicker'
import ErrorField from '../common/ErrorField'

const UserAddForm = ({ handleToggle, handleSubmit }: any) => {
    return (
        <div>
            <Formik
                initialValues={{ name: '', email: '', phone: '', investedDate: '', investedAmount: '' }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Name is required'),
                    email: Yup.string().email('Invalid email address').required('Email is required'),
                    phone: Yup.string().min(10, "Invalid Phone number").required('Phone number is required'),
                    investedDate: Yup.date(),
                    investedAmount: Yup.string()
                    // investments: Yup.array()
                    //     .of(
                    //         Yup.object({
                    //             amount: Yup.string().min(100, "Minimum investment is 100").required("Investment amount is required"),
                    //             date: Yup.string().required("Investment date is required"),
                    //         })
                    //     )
                    //     .min(1, "At least one investment is required"),
                })}
            
                onSubmit={async (values, { setSubmitting }) => {
                    handleSubmit(values)
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue, isValid, values }) => (
                    <Form className='flex flex-col gap-4'>
                        {/* <div > */}

                            <div className='flex flex-col gap-2   w-full'>
                                <InputField type="text" name="name" label="Name" error={touched.name ? errors.name:''} placeholder="Enter name" />
                                <InputField type="email" name="email" label="Email address" error={touched.email ? errors.email:''} placeholder="Enter email" />
                                <InputField type="text" name="phone" label="Phone" error={touched.phone ? errors.phone:''} placeholder="Enter phone" onKeyPress={numOnly} />
                                <InputField type="text" name={`investedAmount`} label="Investment Amount" error={
                                            touched.investedAmount &&
                                                typeof errors.investedAmount === 'object' && errors.investedAmount
                                                ? errors.investedAmount
                                                : undefined
                                        } placeholder="Enter phone" onKeyPress={numOnly} />
                                 <div className='w-full'>
                                        <label className="block text-sm/6 font-medium text-gray-900">Investment Date</label>
                                        <DatePicker
                                            date={values.investedDate}
                                            setDate={(date: any) => setFieldValue(`investedDate`, date)}
                                        />
                                        {errors?.investedDate && <ErrorField message={errors?.investedDate} />}
                                    </div>
                            </div>
                            {/* <div className='flex flex-col gap-4 pt-8 md:w-1/2 w-full'> */}
                                {/* <FieldArray name="investments">
                                    {({ push, remove }) => (
                                        <>
                                            {values.investments.map((investment, index) => (
                                                <div key={index} className="items-start flex sm:flex-row flex-col gap-4 ">
                                                    <div className='w-full'>
                                                        <InputField type="text" name={`investments[${index}].amount`} label="Investment Amount" error={
                                                            touched.investments?.[index].amount &&
                                                                typeof errors.investments?.[index] === 'object' && errors.investments?.[index]?.amount
                                                                ? errors.investments[index].amount
                                                                : undefined
                                                        } placeholder="Enter phone" onKeyPress={numOnly} />
                                                    </div>
                                                    <div className='w-full'>
                                                        <label className="block text-sm/6 font-medium text-gray-900">Investment Date</label>
                                                        <DatePicker
                                                            date={values.investments[index].date}
                                                            setDate={(date: any) => setFieldValue(`investments[${index}].date`, date)}
                                                        />
                                                        {errors?.investments[${index}]?.date && <ErrorField message={error?.investments}/> }
                                                    </div>

                                                    {index > 0 &&
                                                        <Image onClick={() => remove(index)} src={'/trash.svg'} height={26} width={26} alt="edit" className='cursor-pointer hover:bg-gray-100 rounded-md p-1' />
                                                    }
                                                </div>
                                            ))}
                                            <Button variant="secondary" onClick={() => push({ amount: "", date: "" })}>
                                                Add Investment
                                            </Button>
                                        </>
                                    )}
                                </FieldArray> */}
                            {/* </div> */}
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