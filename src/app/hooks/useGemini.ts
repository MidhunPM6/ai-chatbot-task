import React from 'react'
import { GoogleGenAI } from '@google/genai'
import { useState } from 'react'
import { useTranscribe } from '@/app/context/contextAPI'

export const useGemini = () => {
  const [isProcessing, setIsProcessing] = useState(false)

  const [error, setError] = useState('')
  const { setApiRes } = useTranscribe()

  const apiKey = 'AIzaSyBsPPN0Z9i7Jw5bqlyAA5GnO5iQ4WYUd_c'
  const ai = new GoogleGenAI({ apiKey: apiKey })

  const handleGemini = async (prompt: string) => {
    setIsProcessing(true)
    setError('')

    try {
      const response: any = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      })
      console.log('response :', response)
      const responseText =
        response?.candidates?.[0]?.content?.parts?.[0]?.text || ''
      setApiRes(prev => [...prev, responseText])
    } catch (err) {
      console.error('AI request failed:', err)
      setError('Failed to get response from AI. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }
  return {
    isProcessing,
    error,
    handleGemini
  }
}
