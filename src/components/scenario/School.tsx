import React from 'react'
import Image from 'next/image'
import schoollogo from '@/../../public/school.png'
const Store = () => {
  return (
  <>
<div className='flex items-center gap-2'>
  <h1 className='text-gray-600 rounded-full p-2 bg-gray-100'>School scenario <span className='text-green-600'>activated</span></h1>
  <Image src={schoollogo} alt='home logo' width={50} height={50}/>
</div>

  </>
  )
}

export default Store
