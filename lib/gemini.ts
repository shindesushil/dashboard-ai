import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function getTasksFromTranscript(transcript: string) {
    // const models = await genAI.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
You are an AI assistant. Extract actionable tasks from the meeting transcript below.
Each task should be in the following JSON format:

{
  "name": string,
  "description": string,
  "status": "pending" | "in progress" | "completed",
  "category": "DEV" | "QA" | "REVIEW"
}

Transcript:
"""${transcript}"""

Return only a valid JSON array of tasks. No markdown, no commentary.
`

    const result = await model.generateContent(prompt)
    const response = await result.response
    let text = response.text().trim()

    if (text.startsWith('```')) {
        text = text.replace(/```json|```/g, '').trim()
    }

    try {
        const tasks = JSON.parse(text)
        return tasks
    } catch (err) {
        console.error('Failed to parse Gemini response:', text)
        throw new Error('Gemini response is not valid JSON.')
    }
}
