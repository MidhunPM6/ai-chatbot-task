'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import voice from '@/../../public/voice.png'
import stop from '@/../../public/stop.png'

function AudioRecoder () {
  return (
    <>
      <section className='flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md mt-4  lg:min-w-lg lg:w-0 w-full border border-gray-300'>
        <figure>
          <div className=' flex'>
            <Image
              src={stop}
              alt=''
              className='bg-emerald-500 rounded-full scale-150 transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer '
              width={45}
              height={45}
            ></Image>
            <Image
              src={voice}
              alt=''
              className='bg-emerald-500 p-1 rounded-full scale-95 transition-all duration-300 ease-linear cursor-pointer'
              width={45}
              height={45}
            ></Image>
          </div>
        </figure>
        <p className='text-gray-600'>
          Turn this conversation into a scenario-based dialogue.
        </p>

        <button
          type='button'
          className='border border-gray-400  px-4 py-2 rounded'
        >
          Click here
        </button>
      </section>
    </>
  )
}
export default AudioRecoder
