import Shimmer from '@/components/common/Shimmer'
import React from 'react'

const AccountShimmer = () => {
  return (
    <div className='flex flex-row justify-between'>
        <Shimmer classes='h-96 w-1/3 rounded-md shadow-ms'/>
        <div className='w-1/2 flex flex-col gap-6'>
        <Shimmer classes='h-12 rounded-md shadow-ms' />
        <Shimmer classes='h-18 rounded-md shadow-ms' length={8}/>
        </div>
    </div>
  )
}

export default AccountShimmer