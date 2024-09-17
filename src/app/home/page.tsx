'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { seasons } from '@/data/seasons'
import SeasonSelector from '@/components/Seasonselector'
import SeasonInfo from '@/components/Seasonlnfo'
import CropList from '@/components/CropList'
import SelectedCrops from '@/components/SelectedCrops'
import FieldPlanner from '@/components/FieldPlanner'
import VisualPlanner from '@/components/VisualPlanner'
import ResourceManagement from '@/components/ResourceManagement'
import MarketAnalysis from '@/components/MarketAnalysis'
import Notifications from '@/components/Notifications'
import { ChevronRight } from 'lucide-react'
import ExportPlan from '@/components/ExportPlan'
import AIRecommendations from '@/components/AIRecommendations'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function EnhancedSeasonalCropPlanner() {
  const [selectedSeason, setSelectedSeason] = useState('Spring')
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string>('all')
  const [fieldSize, setFieldSize] = useState<number>(1)
  const [soilType, setSoilType] = useState<string>('loamy')
  const [irrigationType, setIrrigationType] = useState<string>('drip')
  const [visualPlan, setVisualPlan] = useState<Record<string, string>>({})
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season)
    setSelectedCrops([])
    setDifficulty('all')
  }

  const handleCropToggle = (cropName: string) => {
    setSelectedCrops((prev) =>
      prev.includes(cropName) ? prev.filter((c) => c !== cropName) : [...prev, cropName]
    )
  }

  const handleRemoveCrop = (cropName: string) => {
    setSelectedCrops((prev) => prev.filter((c) => c !== cropName))
  }

  const filteredCrops = seasons
    .find((s) => s.name === selectedSeason)
    ?.crops.filter((crop) => difficulty === 'all' || crop.difficulty === difficulty) || []

  if (!isMounted) {
    return null
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Enhanced Seasonal Crop Planner</CardTitle>
          <CardDescription className="text-center">Plan your crops, manage resources, and analyze market trends</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="planner" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="planner">Planner</TabsTrigger>
              <TabsTrigger value="visual">Visual Planner</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="market">Market Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="planner">
              <SeasonSelector selectedSeason={selectedSeason} onSeasonChange={handleSeasonChange} />
              <AnimatePresence>
                {selectedSeason && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SeasonInfo season={seasons.find((s) => s.name === selectedSeason)} />
                    <CropList
                      crops={filteredCrops}
                      selectedCrops={selectedCrops}
                      onCropToggle={handleCropToggle}
                      difficulty={difficulty}
                      onDifficultyChange={setDifficulty}
                    />
                    <SelectedCrops
                      selectedCrops={selectedCrops}
                      onRemoveCrop={handleRemoveCrop}
                    />
                    <FieldPlanner
                      fieldSize={fieldSize}
                      setFieldSize={setFieldSize}
                      soilType={soilType}
                      setSoilType={setSoilType}
                      irrigationType={irrigationType}
                      setIrrigationType={setIrrigationType}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
            <TabsContent value="visual">
              <VisualPlanner
                selectedCrops={selectedCrops}
                fieldSize={fieldSize}
                visualPlan={visualPlan}
                setVisualPlan={setVisualPlan}
              />
            </TabsContent>
            <TabsContent value="resources">
              <ResourceManagement
                selectedCrops={selectedCrops}
                fieldSize={fieldSize}
                soilType={soilType}
                irrigationType={irrigationType}
              />
            </TabsContent>
            <TabsContent value="market">
              <MarketAnalysis selectedCrops={selectedCrops} />
            </TabsContent>
          </Tabs>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <Notifications selectedCrops={selectedCrops} />
          <ExportPlan
            selectedSeason={selectedSeason}
            selectedCrops={selectedCrops}
            fieldSize={fieldSize}
            soilType={soilType}
            irrigationType={irrigationType}
            visualPlan={visualPlan}
          />
        </CardFooter>
      </Card>
      <Link href={`/crops/${selectedCrops}`}>
        <Button className='fixed bottom-4 right-4'>
          View {selectedCrops} Crops <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    </div>
  )
}