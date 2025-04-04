'use client'
import React, { useState } from 'react'

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Form, Formik } from 'formik';
import InputField from '../common/InputField';
import { numOnly } from '@/utils';
import DatePicker from '../common/DatePicker';
import ErrorField from '../common/ErrorField';
import SelectField from '../common/SelectField';
import { TRANSACTION } from '@/constants/constant';

const TransactionModal = ({ open, setOpen, handleToggle, transaction, handleSubmit }:any) => {



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button >
                    Add
                </Button>
            </DialogTrigger>
            <DialogContent  className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle> {transaction?._id ? "Edit Transaction" :"Add Transaction"}</DialogTitle>
                </DialogHeader>
               <DialogDescription asChild>
                
                    <Formik
                        initialValues={{ type: transaction?.type || '', amount: transaction?.amount || '', date: transaction?.date || '' }}
                        //   validationSchema={validationSchema}

                        onSubmit={async (values, { setSubmitting }) => {
                            try {
                                setSubmitting(true);
                                const formData:any = { ...values };

                                if (transaction?._id) {
                                    formData.id = transaction._id;
                                }

                                await handleSubmit(formData);
                                handleToggle();
                            } catch (error) {
                                console.error("Submission error:", error);
                            } finally {
                                setSubmitting(false);
                            }
                        }}

                    >
                        {({ errors, touched, isSubmitting, setFieldValue, isValid, values }) => (
                            <Form className='flex flex-col gap-4'>
                                {/* <div > */}

                                <div className='flex flex-col gap-2   w-full'>
                                    <InputField type="text" name="amount" label="Amount" error={
                                        touched.amount && typeof errors.amount === 'string' ? errors.amount : undefined
                                    } placeholder="Enter amount" onKeyPress={numOnly} />

                                    <SelectField label='Type' options={TRANSACTION}
                                        value={values.type} 
                                        handleChange={(val) => setFieldValue('type', val)} 
                                        error={
                                            touched.type && typeof errors.type === 'string' ? errors.type : undefined
                                        }/>

                                    <div className='w-full'>
                                        <label className="block text-sm/6 font-medium text-gray-900">
                                            Date
                                        </label>
                                        <DatePicker
                                            date={values.date}
                                            error={touched.date ? errors.date : ''}
                                            setDate={(date: any) => setFieldValue(`date`, date)}
                                        />
                                        {touched.date && typeof errors.date === 'string' ? <ErrorField message={errors.date} /> : ''}
                                    </div>
                                </div>

                                <div className='flex gap-2 justify-end pt-4'>
                                    {/* <Button onClick={handleToggle} variant={'outline'} >Cancel</Button> */}
                                    <Button disabled={!isValid || isSubmitting} type='submit'>{transaction?._id? "Update":"Save"}</Button>
                                </div>
                                {/* </div> */}

                            </Form>
                        )}
                    </Formik>
            </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default TransactionModal