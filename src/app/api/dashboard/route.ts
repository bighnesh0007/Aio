import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function POST(request: NextRequest) {
   try {
      const { cropData } = await request.json();

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


      const prompt = `You are an agricultural expert AI with extensive knowledge in crop cultivation, market trends, and sustainable practices. Your expertise allows you to provide detailed insights into various crops, helping farmers and agricultural enthusiasts make informed decisions. 

Your task is to provide detailed information about the following crop: ${cropData}. Include the following information in your response, using the exact headers provided:

1. Best Conditions for Crop:
   - Describe ideal soil, temperature, and humidity conditions.
   - in points

2. Current Price in Market:
   - Provide the latest average market price per unit (specify the unit).

3. Best Weather:
   - Describe the optimal weather conditions for growing this crop.

4. pH Level:
   - Specify the ideal soil pH range for this crop.

5. Tips to Protect:
   - List 3-5 key tips to protect the crop from common pests and diseases.
   - in points

6. Water Consumption:
   - Provide average water requirements in liters per day or week.
   - Include data for a bar chart showing water consumption across different growth stages.
   - in points

7. Electric Consumption:
   - If applicable, estimate the electric consumption for various farming operations.
   - Include data for a pie chart showing the distribution of electricity usage.
   - in points

8. Best Places to Grow in India:
   - List the top 3-5 regions in India known for cultivating this crop.

9. AI Generated Tips:
   - Provide 3-5 innovative tips for improving yield or sustainability.

10. Top Consumers:
    - List the top 5 countries or regions that consume this crop.
    - in points

11. Percentage of Risk:
    - Estimate the overall risk percentage for cultivating this crop, considering factors like market volatility, weather dependence, and pest susceptibility.

12. Blog Cards:
    - Generate 3 blog post ideas related to this crop, each with a title and a brief 2-3 sentence description.
    - in points

Please format your response clearly, using markdown for headers and lists where appropriate. Ensure that the information provided is accurate, relevant, and up-to-date.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return NextResponse.json({ recommendation: text });
   } catch (error) {
      console.error("Error generating crop data:", error);
      return NextResponse.json({ error: "Failed to generate crop data" }, { status: 500 });
   }
}