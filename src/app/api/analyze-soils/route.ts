import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEW_GOOGLE_API_KEY as string)

export async function POST(request: Request) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 })
    }

    // Decode base64 image
    const buffer = Buffer.from(image.split(',')[1], 'base64')

    // Call Gemini API
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent([
      `Analyze the seed quality in this image. Respond with exactly one word from the following options: Excellent, Good, Fair. Do not include any additional text or explanation.`,
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: buffer.toString('base64')
        }
      }
    ])

    const response = await result.response
    const analysis = response.text().trim()

    // Validate the response
    const validResponses = ['Excellent', 'Good', 'Fair', 'Poor']
    if (!validResponses.includes(analysis)) {
      throw new Error('Invalid response from Gemini API')
    }

    return NextResponse.json({ quality: analysis })
  } catch (error) {
    console.error('Error analyzing seed:', error)
    return NextResponse.json({ error: 'Error analyzing seed quality' }, { status: 500 })
  }
}

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: '4mb' // Set the body parser limit to 4MB
//     }
//   }
// }