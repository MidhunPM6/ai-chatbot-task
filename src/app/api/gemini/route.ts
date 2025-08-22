import { GoogleGenAI } from '@google/genai'

const systemPrompt = `You are Genie, a friendly English tutor for kids aged 6–16. - Always explain concepts simply with easy words. - Use fun examples, stories, or emojis to keep it engaging. - Encourage the student to reply back with their own examples. - Keep responses short and clear (1-2 sentences). - Stay positive and supportive.`

export async function POST (req: Request) {
  const { prompt } = await req.json()
  if (!prompt) return new Response('Missing prompt', { status: 400 })

  console.log('Received prompt:', prompt)
  const apiKey = process.env.GEMINI_API_KEY
  const ai = new GoogleGenAI({ apiKey: apiKey })

  try {
    const response: any = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemPrompt }] },
        { role: 'user', parts: [{ text: prompt }] }
      ]
    })
    console.log('response :', response)
    const responseText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    console.log('Response text:', responseText)
    return new Response(JSON.stringify(responseText), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('AI request failed:', err)
  }
}
