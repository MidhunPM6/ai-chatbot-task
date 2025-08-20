'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import voice from '@/../../public/voice.png'
import stop from '@/../../public/stop.png'

function AudioRecoder () {
  const [recordedUrl, setRecordedUrl] = useState<string>('')
  const [started, setStarted] = useState<boolean>(false)
  const mediaStream = useRef<MediaStream | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)
  const chunks = useRef<Blob[]>([])

  console.log(recordedUrl)

  const uploadRecording = async (blob: Blob) => {
    const formData = new FormData()
    formData.append('file', blob, 'recording.webm')

    try {
      const res = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        throw new Error('Failed to upload audio')
      }

      const data = await res.json()
      console.log('API response:', data.text)
    } catch (err) {
      console.error(err)
    }
  }

  const startRecording = async () => {
    setStarted(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStream.current = stream
      mediaRecorder.current = new MediaRecorder(stream)
      mediaRecorder.current.ondataavailable = e => {
        if (e.data.size > 0) {
          chunks.current.push(e.data)
        }
      }
      mediaRecorder.current.onstop = () => {
        const recordedBlob = new Blob(chunks.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(recordedBlob)
        setRecordedUrl(url)
        chunks.current = []
        uploadRecording(recordedBlob)
      }
      mediaRecorder.current.start()
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }
  const stopRecording = async () => {
    setStarted(false)
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop() // triggers onstop
    }

    // Stop all microphone tracks
    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <>
      <section className='flex flex-col items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-md mt-4  lg:min-w-lg lg:w-0 w-full border border-gray-300'>
        <figure>
          <div className=' flex'>
            {started ? (
              <Image
                src={stop}
                alt=''
                onClick={stopRecording}
                className='bg-emerald-500 rounded-full scale-150 transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer '
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
        >
          Click here
        </button>
      </section>
    </>
  )
}
export default AudioRecoder
