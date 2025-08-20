import FormData from 'form-data'
import fetch from 'node-fetch'
export const runtime = 'nodejs'

export async function POST (req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as Blob

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file uploaded' }), {
        status: 400
      })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    const nodeForm = new FormData()
    nodeForm.append('file', buffer, {
      filename: 'audio.webm',
      contentType: 'audio/webm'
    })
    nodeForm.append('model', 'whisper-1')

    // The free version of whisper is over so i am using a local python server to transcribe the audio
    // (This is the API url for the production https://api.openai.com/v1/audio/transcriptions)
    const response = await fetch('http://localhost:8000/transcribe', {
      method: 'POST',
      // headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },  This is API for the paid version
      body: nodeForm as any
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), { status: 200 })
  } catch (err: any) {
    console.error('Error in transcription:', err)
    return new Response(JSON.stringify({ error: err.message }), { status: 500 })
  }
}
