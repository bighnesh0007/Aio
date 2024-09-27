'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { FaCloudSunRain, FaSpinner, FaThermometerHalf, FaTint, FaWind, FaMapMarkerAlt, FaCrosshairs } from 'react-icons/fa'

const MotionCard = motion(Card)

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

interface WeatherAnalysisProps {
  setWeather: (weather: string) => void;
}

interface WeatherInfo {
  main: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
}

export default function WeatherAnalysis({ setWeather }: WeatherAnalysisProps) {
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [isLocating, setIsLocating] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const getLocation = () => {
    setIsLocating(true)
    setError(null)

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString())
          setLongitude(position.coords.longitude.toString())
          setIsLocating(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setError("Failed to get your location. Please enter manually.")
          setIsLocating(false)
        }
      )
    } else {
      setError("Geolocation is not supported by your browser. Please enter location manually.")
      setIsLocating(false)
    }
  }

  const analyzeWeather = async () => {
    if (!latitude || !longitude) {
      setError('Please enter both latitude and longitude or use automatic location.')
      return
    }

    setIsLoading(true)
    setError(null)
    closeModal()

    try {
      const response = await fetch(`/api/analyze-weather?lat=${latitude}&lon=${longitude}`)

      if (!response.ok) {
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()
      setWeatherInfo(data)
      setWeather(data.main) // Update the parent component with the main weather condition
    } catch (error) {
      console.error('Error analyzing weather:', error)
      setError('Failed to analyze weather. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <MotionCard className="w-full" variants={cardVariants} initial="hidden" animate="visible">
      <CardHeader>
        <CardTitle>Weather Analysis</CardTitle>
        <CardDescription>Check current weather conditions for optimal crop growth</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Click the button below to enter location or use your current location for weather analysis.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <Button className="w-full" onClick={openModal} disabled={isLoading}>
          {isLoading ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <FaMapMarkerAlt className="mr-2 h-4 w-4" /> Enter Location & Analyze Weather
            </>
          )}
        </Button>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-red-500"
          >
            {error}
          </motion.div>
        )}
        <AnimatePresence>
          {weatherInfo && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-2 w-full"
            >
              <Badge variant="outline" className="text-lg w-full justify-center">
                Current Weather: {weatherInfo.main}
              </Badge>
              <p className="text-sm text-gray-600 text-center">{weatherInfo.description}</p>
              <div className="flex justify-between w-full">
                <span className="flex items-center">
                  <FaThermometerHalf className="mr-1" /> {weatherInfo.temperature.toFixed(1)}°C
                </span>
                <span className="flex items-center">
                  <FaTint className="mr-1" /> {weatherInfo.humidity}%
                </span>
                <span className="flex items-center">
                  <FaWind className="mr-1" /> {weatherInfo.windSpeed} m/s
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Location</DialogTitle>
            <DialogDescription>
              Please enter the latitude and longitude for weather analysis or use your current location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Button onClick={getLocation} disabled={isLocating}>
              {isLocating ? (
                <>
                  <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Getting Location...
                </>
              ) : (
                <>
                  <FaCrosshairs className="mr-2 h-4 w-4" /> Use My Current Location
                </>
              )}
            </Button>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="latitude" className="text-right">
                Latitude
              </Label>
              <Input
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                placeholder="e.g., 44.34"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="longitude" className="text-right">
                Longitude
              </Label>
              <Input
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                placeholder="e.g., 10.99"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={closeModal} variant="outline">Cancel</Button>
            <Button onClick={analyzeWeather}>Analyze Weather</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MotionCard>
  )
}