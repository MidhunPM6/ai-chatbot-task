'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch
} from 'react'


interface Message {
  user: string;
  bot: string | null;
}
interface ContextType {
  transcription: string[]
  setTranscription: Dispatch<SetStateAction<string[]>>
  setApiRes: Dispatch<SetStateAction<string[]>>
  apiRes: string[]
  scenario: string
  setScenario: Dispatch<SetStateAction<string>>
  setIsLoading : Dispatch<SetStateAction<boolean>>
  isLoading : boolean
  conversation: Message[];   // ✅ Fix here
  setConversation: Dispatch<SetStateAction<Message[]>>;
}

const Context = createContext<ContextType | undefined>(
  undefined
)



export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const [transcription, setTranscription] = useState([] as string[])
  const [apiRes, setApiRes] = useState([] as string[])
  const [scenario, setScenario] = useState<string>('')
  const [isloading, setIsLoading] = useState<boolean>(false) 
  const [conversation,setConversation ] = useState<Message[]>([])

  const value = {
    transcription,
    setTranscription,
    apiRes,
    setApiRes,
    scenario,
    setScenario,
    setIsLoading,
    isLoading : isloading,
    conversation,
    setConversation
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export const useContextAPI = () => {
  const context = useContext(Context)
  if (!context)
    throw new Error('useTranscribe must be used within TranscribeProvider')
  return context
}
