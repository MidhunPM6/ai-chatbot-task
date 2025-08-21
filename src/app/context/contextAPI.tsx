'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch
} from 'react'

interface TranscribeContextType {
  transcription: string[]
  setTranscription: Dispatch<SetStateAction<string[]>>
  setApiRes: Dispatch<SetStateAction<string[]>>
 apiRes: string[]
}

const TranscribeContext = createContext<TranscribeContextType | undefined>(
  undefined
)

export const TranscribeProvider = ({ children }: { children: ReactNode }) => {
  const [transcription, setTranscription] = useState([] as string[])
  const [apiRes, setApiRes] = useState([] as string[])

  const value = {
    transcription,
    setTranscription,
    apiRes,
    setApiRes,
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
