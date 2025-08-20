'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface TranscribeContextType {
  transcription: string
  setTranscription: (text: string) => void
}

const TranscribeContext = createContext<TranscribeContextType | undefined>(
  undefined
)

export const TranscribeProvider = ({ children }: { children: ReactNode }) => {
  const [transcription, setTranscription] = useState('')

  const value = {
    transcription,
    setTranscription
  }

  return (
    <TranscribeContext.Provider value={value}>
      {children}
    </TranscribeContext.Provider>
  )
}

export const useTranscribe = () => {
  const context = useContext(TranscribeContext)
  if (!context)
    throw new Error('useTranscribe must be used within TranscribeProvider')
  return context
}
