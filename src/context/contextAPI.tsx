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
  scenario: string
  setScenario: Dispatch<SetStateAction<string>>
  setIsLoading : Dispatch<SetStateAction<boolean>>
  isLoading : boolean
}

const TranscribeContext = createContext<TranscribeContextType | undefined>(
  undefined
)

export const TranscribeProvider = ({ children }: { children: ReactNode }) => {
  const [transcription, setTranscription] = useState([] as string[])
  const [apiRes, setApiRes] = useState([] as string[])
  const [scenario, setScenario] = useState<string>('')
  const [isloading, setIsLoading] = useState<boolean>(false)

  const value = {
    transcription,
    setTranscription,
    apiRes,
    setApiRes,
    scenario,
    setScenario,
    setIsLoading,
    isLoading : isloading
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
