import React from 'react'
import Image from 'next/image'
import homelogo from '@/../../public/home.png'
const Home = () => {
  return (
  <>
<div className='flex items-center gap-2'>
  <h1 className='text-gray-600 rounded-full p-2 bg-gray-100'>Home scenario <span className='text-green-600'>activated</span></h1>
  <Image src={homelogo} alt='home logo' width={50} height={50}/>
</div>

  </>
  )
}

export default Home
