import { ErrorFieldProps } from '@/types/type'
import React from 'react'

const ErrorField = ({message, classes=''}:ErrorFieldProps) => {
  return (
    <span className={` text-red-700 font-light text-[12px]  ${classes}`}>
        {message}
    </span>
  )
}

export default ErrorField