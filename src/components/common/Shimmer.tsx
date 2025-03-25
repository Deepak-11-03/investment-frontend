import React from 'react'
import { Skeleton } from '../ui/skeleton'

interface Props {
  classes?: string;
    length?: number;
}

const Shimmer = ({classes,length}:Props) => {
  return (
      <>
    {[...Array(length)].map((_, index) => (
        <Skeleton key={index} className={`h-96 w-96 rounded-md ${classes}`}/>
    ))}
        </>
  )
}

export default Shimmer