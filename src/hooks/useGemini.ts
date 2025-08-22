import React, { useEffect } from 'react'

import { useState } from 'react'
import { useContextAPI } from '../context/contextAPI'
import { useEleven } from './useElevenTts'
import axios from 'axios'

export const useGemini = () => {
  const [error, setError] = useState('')
  const { setApiRes, scenario, conversation } = useContextAPI()
  const { handleEleven } = useEleven()

  // Calling Gemini API
  const handleGemini = async (prompt: string) => {
    try {
      const response: any = await axios.post('/api/gemini', {
        prompt: prompt,
        scenario: scenario,
        history: conversation.map(msg => ({
          user: msg.user,
          bot: msg.bot || ''
        }))
      })

      await handleEleven(response.data.text)
      setApiRes((prev: any) => [...prev, response.data.text])
    } catch (err) {
      setError('Failed to get response from AI. Please try again.')
    }
  }

  return {
    error,
    handleGemini
  }
}
