import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js'

const elevenlabs = new ElevenLabsClient({
  apiKey: process.env.ELEVEN_API_KEY
})

export async function POST (req: Request) {
  try {
    const { text } = await req.json()
    if (!text) return new Response('Missing text', { status: 400 })
    console.log('Received text:', text)

    const voiceId = 'XW70ikSsadUbinwLMZ5w'

    // Stream audio data from ElevenLabs and covert to a chuks of array
    const audioStream = await elevenlabs.textToSpeech.stream(voiceId, {
      text,
      modelId: 'eleven_multilingual_v2'
    })

    const reader = audioStream.getReader()
    const chunks: Uint8Array[] = []
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      chunks.push(value)
    }
    // convert the chunks into buffer and return
    const buffer = Buffer.concat(chunks.map(c => Buffer.from(c)))
    return new Response(buffer, {
      status: 200,
      headers: { 'Content-Type': 'audio/mpeg' }
    })
    
  } catch (err) {
    console.error(err)
    return new Response('Failed to generate audio', { status: 500 })
  }
}
