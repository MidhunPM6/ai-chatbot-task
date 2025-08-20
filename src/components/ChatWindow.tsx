'use client'

import Image from 'next/image'
import React, { use } from 'react'
import avatar from '@/../../public/avatar.png'
import { useTranscribe } from '@/app/context/contextAPI'


const ChatWindow = () => {
  const {transcription} = useTranscribe()
  return (
    <section className='flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md mt-4 min-h-[55vh] lg:min-w-lg lg:w-0 w-full border border-gray-300'>
      <figure>
        <Image src={avatar} alt='Genie AI' width={100} height={100} />
      </figure>
      <div className='w-full p-4 border border-gray-300 rounded-lg bg-white shadow-sm min-h-[35vh]'>
        <div className='flex w-full  gap-2'>
          <p className='text-left bg-green-200 p-2 rounded-md'>
            Hello, How are you?
          </p>
        </div>
        <div className='flex w-full  justify-end'>
          <p className=' bg-gray-200 p-2 rounded-md'>{transcription }</p>
        </div>
      </div>
    </section>
  )
}

export default ChatWindow
