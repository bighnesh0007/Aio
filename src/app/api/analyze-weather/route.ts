import { NextResponse } from 'next/server'

const API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 })
  }

  try {
    const response = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch weather data')
    }

    const data = await response.json()

    // Extract relevant weather information
    const weatherInfo = {
      main: data.weather[0].main,
      description: data.weather[0].description,
      temperature: data.main.temp,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    }

    return NextResponse.json(weatherInfo)
  } catch (error) {
    console.error('Error fetching weather data:', error)
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 })
  }
}