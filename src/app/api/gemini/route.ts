import { GoogleGenAI } from '@google/genai'

const systemPrompt = `You are a friendly English tutor for kids aged 6–16.
- Always explain concepts simply with easy words.
- Use fun examples, stories, or emojis to keep it engaging.
- Encourage the student to reply with their own examples.
- Keep responses short (1–2 sentences).
- Stay positive and supportive.`

export async function POST (req: Request) {
  const { prompt, scenario, history } = await req.json()
  if (!prompt) return new Response('Missing prompt', { status: 400 })
  
    // initializing API key of gmeini 
  const apiKey = process.env.GEMINI_API_KEY
  const ai = new GoogleGenAI({ apiKey })

  // Description for the scenario based prompts
  const scenarioDescriptions: Record<string, string> = {
    home: "You are a caring parent at home. Use warm and simple words, ask about daily life, and encourage sharing feelings. Example: 'Did you have fun today? 😊'",
    store:
      "You are a shopkeeper in a busy store. Be polite and helpful, ask what the student wants to buy, and use phrases like 'Would you like a bag?' or 'That will be five dollars.'",
    school:
      "You are a teacher in a classroom. Be respectful but encouraging, ask short learning questions, and praise effort. Example: 'Can you try saying that louder?' 📚"
  }

  // build main prompt
  let mainPrompt = systemPrompt
  if (scenario && scenarioDescriptions[scenario]) {
    mainPrompt += `\n\nScenario: ${scenarioDescriptions[scenario]}`
  }

  // build conversation history
 const contents: any[] = [
    { role: "model", parts: [{ text: mainPrompt }] } // system-level message
  ]

  history.forEach((msg: any) => {
    if (msg.user) contents.push({ role: 'user', parts: [{ text: msg.user }] })
    if (msg.bot) contents.push({ role: 'model', parts: [{ text: msg.bot }] })
  })

  contents.push({ role: 'user', parts: [{ text: prompt }] })


  // send request to Gemini API and get response
  try {
    const response: any = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents
    })

    const responseText =
      response?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Sorry, I didn't understand that. Can you try again?"

    return new Response(JSON.stringify({ text: responseText }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    console.error('AI request failed:', err)
    return new Response('AI request failed', { status: 500 })
  }
}
