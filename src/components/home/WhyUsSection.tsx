import { WHY_CHOOSE_US } from '@/constants/constant'
import Image from 'next/image'
import React from 'react'

const WhyUsSection = () => {
  return (
    <div className=' gap-4 p-4 py-12 max-w-7xl mx-auto flex md:flex-row flex-col'>
      <div className='md:w-2/3  p-4 md:px-12 '>
        <div className='flex flex-col gap-4'>
          <h2 className='text-4xl '>
            We Help Our Clients Build a Sustainable Future
          </h2>
          <h6>
            Integer consequat erossed tempor aliquetaesente in minibh consecter anulla alacinia consequate sonese magliquam vulputate seronse.
          </h6>
        </div>

        <ul className='flex  pt-8'>
          {WHY_CHOOSE_US.slice(0, 2).map((item) =>
            <li key={item.title} className="w-1/2">
              <h3 className="text-2xl font-normal ">
                {item.title}
              </h3>
              <h6>
                {item.description}
              </h6>
            </li>
          )}
        </ul>
      </div>
      <Image src="/we-help.jpg" loading="lazy" height={400} width={600} alt="we help " />
    </div>
  )
}

export default WhyUsSection