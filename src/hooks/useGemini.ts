import React, { useEffect } from 'react'

import { useState } from 'react'
import { useTranscribe } from '../context/contextAPI'
import { useEleven } from './useElevenTts'
import axios from 'axios'
import { Prompt } from 'next/font/google'

export const useGemini = () => {
  const [error, setError] = useState('')
  const { setApiRes } = useTranscribe()
  const { handleEleven } = useEleven()

  const handleGemini = async (prompt: string) => {
    try {
      const response: any = await axios.post('/api/gemini', {
        prompt: prompt
      })

      console.log('Response from Gemini:', response.data)
      await handleEleven(response.data)
      setApiRes((prev: any) => [...prev, response.data])
    } catch (err) {
      console.error('AI request failed:', err)
      setError('Failed to get response from AI. Please try again.')
    }
  }

  return {
    error,
    handleGemini
  }
}
