import Image from 'next/image'
import React from 'react'
import avatar from '@/../../public/avatar.png'

const ChatWindow = () => {
  return (
    <section className='flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md mt-4 min-h-[55vh] lg:min-w-lg lg:w-0 w-full border border-gray-300'>
      <figure>
        <Image src={avatar} alt='Genie AI' width={100} height={100} />
      </figure>
      <div className='w-full p-4'>
        <div className='flex w-full  gap-2'>
          <p className='text-left bg-green-200 p-2 rounded-md'>
            Hello, How are you?
          </p>
        </div>
        <div className='flex w-full  justify-end'>
          <p className=' bg-gray-200 p-2 rounded-md'>iam fine</p>
        </div>
      </div>
    </section>
  )
}

export default ChatWindow
