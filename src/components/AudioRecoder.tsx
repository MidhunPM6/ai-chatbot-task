'use client'

import Image from 'next/image'
import voice from '@/../../public/voice.png'
import stop from '@/../../public/stop.png'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'
import { useContextAPI } from '@/context/contextAPI'
import { useState } from 'react'
import homelogo from '@/../../public/home.png'
import Schoollogo from '@/../../public/school.png'
import storelogo from '@/../../public/store.png'

function AudioRecoder () {
  const { setScenario, setApiRes, setTranscription } = useContextAPI()
  const { started, startRecording, stopRecording } = useAudioRecorder()
  const [modelIsOpen, setModelIsOpen] = useState(false)

  const scenarios = [
    {
      id: 1,
      name: 'At Home',
      image: homelogo,
      width: 50,
      height: 50,
      role: 'home'
    },
    {
      id: 2,
      name: 'At School',
      image: Schoollogo,
      width: 50,
      height: 50,
      role: 'school'
    },
    {
      id: 3,
      name: 'At Store',
      image: storelogo,
      width: 40,
      height: 40,
      role: 'store'
    }
  ]

  const handleScenario = (e: any, role: string) => {
    e.preventDefault()
    setScenario(role)
    setModelIsOpen(false)
    setApiRes([])
    setTranscription([])
  }

  return (
    <>
      <section className='flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md mt-4  lg:min-w-xl lg:w-0 w-full border border-gray-300'>
        <figure>
          <div className=' flex'>
            {started ? (
              <Image
                src={stop}
                alt=''
                onClick={stopRecording}
                className='bg-red-600 animate-pulse rounded-full  transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer '
                width={45}
                height={45}
              ></Image>
            ) : (
              <Image
                src={voice}
                alt=''
                onClick={startRecording}
                className='bg-emerald-500 p-1 rounded-full scale-95 transition-all duration-300 ease-linear cursor-pointer'
                width={45}
                height={45}
              ></Image>
            )}
          </div>
        </figure>
        <p className='text-gray-600'>
          Turn this conversation into a scenario-based dialogue.
        </p>

        <button
          type='button'
          className='border border-gray-400  px-4 py-2 rounded'
          onClick={() => setModelIsOpen(true)}
        >
          Click here
        </button>

        {modelIsOpen && (
          <div className='fixed inset-0 flex items-center justify-center z-50'>
            <div
              className='absolute inset-0 bg-black opacity-50'
              onClick={() => setModelIsOpen(false)}
            ></div>

            <div className='flex flex-col justify-center items-center bg-white p-6 rounded-lg shadow-lg relative z-50 max-w-md w-full mx-4'>
              <h2 className='text-xl font-semibold mb-4'>
                Select a scenario to continue
              </h2>

              <div className='grid grid-cols-2 gap-8 w-full justify-center items-center mt-4'>
                {scenarios?.map(scenario => (
                  <div
                    key={scenario.id}
                    onClick={e => handleScenario(e, scenario.role)}
                    className='flex flex-col justify-center items-center gap-2 border border-green-600 p-10 rounded-md hover:shadow-md cursor-pointer transition-shadow duration-300 ease-in-out'
                  >
                    <Image
                      src={scenario.image}
                      alt=''
                      width={scenario.width}
                      height={scenario.width}
                    ></Image>
                    <h1>{scenario.name}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
export default AudioRecoder
