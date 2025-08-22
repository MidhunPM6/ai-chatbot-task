'use client'

import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import avatar from '@/../../public/avatar.png'
import { useContextAPI } from '@/context/contextAPI'
import Home from '@/components/scenario/Home'
import School from './scenario/School'
import Store from './scenario/Store'
import NormalChat from './scenario/NormalChat'
import loading from '@/../../public/loading.png'

const ChatWindow = () => {
  const { transcription, apiRes, scenario, isLoading, setConversation } =
    useContextAPI()


  // create a object for the conversation by the user and bot response
  const conversation = transcription.map((userMsg, index) => ({
    user: userMsg,
    bot: apiRes[index] || null
  }))

  // update the conversation state whenever transcription or apiRes changes
  useEffect(() => {
    const newConversation = transcription.map((userMsg, index) => ({
      user: userMsg,
      bot: apiRes[index] || null
    }))

    setConversation(newConversation)
  }, [transcription, apiRes, setConversation])


  //  Used to scroll at bottonm of the chat window 
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [conversation])


  // Render components based on the selected scenario
  const renderComponets = () => {
    switch (scenario) {
      case 'home':
        return <Home />
      case 'school':
        return <School />
      case 'store':
        return <Store />
      default:
        return <NormalChat />
    }
  }

  return (
    <section className='flex flex-col items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-md mt-4  min-h-[90vh] lg:min-h-[55vh] lg:min-w-xl lg:w-0 w-full border border-gray-300'>
      <div className='flex w-full justify-between items-center p-3'>
        <figure className=''>
          <Image src={avatar} alt='Genie AI' width={100} height={100} />
        </figure>
        <div>{renderComponets()}</div>
      </div>

      <div
        ref={chatContainerRef}
        className='w-full p-4 border  border-gray-300 rounded-lg bg-white shadow-sm lg:h-[40vh] h-[100vh]  text-sm overflow-y-auto'
      >
        {conversation.length > 0 ? (
          <div className='flex flex-col w-full gap-3'>
            {conversation.map((msg, index) => (
              <div key={index} className='flex flex-col gap-1'>
                <p className='self-end bg-gray-200 p-2 rounded-md text-gray-600 max-w-[75%]'>
                  {msg.user}
                </p>

                {msg.bot && (
                  <p className='self-start bg-green-200 p-2 rounded-md text-gray-600 max-w-[75%]'>
                    {msg.bot}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center  h-full w-full gap-3'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-16 h-16 text-green-500 mb-3'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 1.5a3 3 0 00-3 3v7a3 3 0 106 0v-7a3 3 0 00-3-3zM19.5 10.5v1.125a7.5 7.5 0 01-15 0V10.5M12 19.5v3m-4.5 0h9'
              />
            </svg>

            <p className='text-lg font-semibold'>Speak with me</p>
            <p className='text-sm text-gray-500'>
              to practice and improve your English
            </p>
          </div>
        )}
      </div>

      {isLoading && (
        <div>
          <Image
            src={loading}
            alt=''
            className='animate-spin'
            width={30}
            height={30}
          />
        </div>
      )}
    </section>
  )
}

export default ChatWindow
