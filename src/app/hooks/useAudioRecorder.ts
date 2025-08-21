import { use, useRef, useState } from 'react'
import { useTranscribe } from '../context/contextAPI'
import { useGemini } from '@/app/hooks/useGemini'

export const useAudioRecorder = () => {
  const [recordedUrl, setRecordedUrl] = useState<string>('')
  const [started, setStarted] = useState<boolean>(false)

  const mediaStream = useRef<MediaStream | null>(null)
  const mediaRecorder = useRef<MediaRecorder | null>(null)

  const chunks = useRef<Blob[]>([])

  const { setTranscription, transcription } = useTranscribe()
  const { handleGemini } = useGemini()

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
      setTranscription(prev => [...prev, data.text])
      const response = await handleGemini(data.text)
      console.log(response)
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
      mediaRecorder.current.stop()
    }

    if (mediaStream.current) {
      mediaStream.current.getTracks().forEach(track => track.stop())
    }
  }

  return {
    startRecording,
    stopRecording,
    recordedUrl,
    started,
    uploadRecording
  }
}
