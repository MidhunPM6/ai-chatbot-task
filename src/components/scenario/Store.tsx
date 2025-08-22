import React from 'react'
import Image from 'next/image'
import storelogo from '@/../../public/store.png'
const School = () => {
  return (
    <>
      <div className='flex items-center gap-2'>
        <h1 className='text-gray-600 rounded-full p-2 bg-gray-100'>
          Store scenario <span className='text-green-600'>activated</span>
        </h1>
        <Image src={storelogo} alt='home logo' width={40} height={40} />
      </div>
    </>
  )
}

export default School
