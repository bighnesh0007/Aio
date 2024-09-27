'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { FaLeaf } from 'react-icons/fa'
import SeedQualityAnalysis from '@/components/SeedQualityAnalysis'
import SoilAnalysis from '@/components/SoilAnalysis'
import WeatherAnalysis from '@/components/WeatherAnalysis'
import EnvironmentTab from '@/components/EnvironmentTab'
import CropGrowthRoadmap from '@/components/CropGrowthRoadmap'
import AIPoweredRoadmapGenerator from '@/components/AIPoweredRoadmapGenerator'
import StartCropCycle from '@/components/StartCropCycle'

const MotionCard = motion(Card)

export default function EnhancedCropDetails() {
  const { cropId } = useParams()
  const [seedQuality, setSeedQuality] = useState<string | null>(null)
  const [soilQuality, setSoilQuality] = useState<string | null>(null)
  const [weather, setWeather] = useState<string | null>(null)
  const [isOptimalCondition, setIsOptimalCondition] = useState(false)

  useEffect(() => {
    setIsOptimalCondition(
      seedQuality !== null &&
      soilQuality !== null &&
      weather !== null &&
      seedQuality !== 'Poor' &&
      soilQuality !== 'Poor' &&
      weather !== 'Windy'
    )
  }, [seedQuality, soilQuality, weather])

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-8"
        >
          <h1 className="text-4xl font-bold">Crop Details for {cropId}</h1>
          <Avatar className="h-12 w-12">
            <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={`Crop ${cropId}`} />
            <AvatarFallback>{cropId}</AvatarFallback>
          </Avatar>
        </motion.div>

        <Alert className="mb-8">
          <FaLeaf className="h-4 w-4" />
          <AlertTitle>Crop Monitoring Active</AlertTitle>
          <AlertDescription>
            Your crop is being monitored 24/7. We&apos;ll notify you of any significant changes.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="analysis" className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          </TabsList>
          <TabsContent value="analysis">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SeedQualityAnalysis setSeedQuality={setSeedQuality} />
              <SoilAnalysis setSoilQuality={setSoilQuality} />
              <WeatherAnalysis setWeather={setWeather} />
            </div>
          </TabsContent>
          <TabsContent value="environment">
            <EnvironmentTab />
          </TabsContent>
          <TabsContent value="roadmap">
            <CropGrowthRoadmap />
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <AIPoweredRoadmapGenerator />
          <StartCropCycle isOptimalCondition={isOptimalCondition} />
        </div>
      </div>
    </div>
  )
}