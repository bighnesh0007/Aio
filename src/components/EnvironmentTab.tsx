'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import MoistureLevel from './MoistureLevel'
import Temperature from './Temperature'
import WindSpeed from './WindSpeed'
import Sunlight from './Sunlight'

const MotionCard = motion(Card)

export default function EnvironmentTab() {
  const [moisture, setMoisture] = useState(50)
  const [temperature, setTemperature] = useState(20)
  const [windSpeed, setWindSpeed] = useState(5)
  const [sunlight, setSunlight] = useState(70)
  const [autoIrrigation, setAutoIrrigation] = useState(false)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <MoistureLevel moisture={moisture} setMoisture={setMoisture} autoIrrigation={autoIrrigation} setAutoIrrigation={setAutoIrrigation} />
      <Temperature temperature={temperature} setTemperature={setTemperature} />
      <WindSpeed windSpeed={windSpeed} setWindSpeed={setWindSpeed} />
      <Sunlight sunlight={sunlight} setSunlight={setSunlight} />
    </div>
  )
}