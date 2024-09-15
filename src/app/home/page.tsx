'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sun, Cloud, Leaf, Snowflake, ChevronRight, Info, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const seasons = [
  {
    name: 'Spring',
    icon: <Leaf className="w-6 h-6 text-green-400" />,
    description: 'A time of new beginnings and growth.',
    crops: [
      { name: 'Lettuce', url: '/crops/lettuce', difficulty: 'Easy' },
      { name: 'Peas', url: '/crops/peas', difficulty: 'Medium' },
      { name: 'Carrots', url: '/crops/carrots', difficulty: 'Easy' },
      { name: 'Spinach', url: '/crops/spinach', difficulty: 'Easy' },
      { name: 'Radishes', url: '/crops/radishes', difficulty: 'Easy' },
      { name: 'Asparagus', url: '/crops/asparagus', difficulty: 'Hard' },
    ]
  },
  {
    name: 'Summer',
    icon: <Sun className="w-6 h-6 text-yellow-400" />,
    description: 'The peak growing season with long, warm days.',
    crops: [
      { name: 'Tomatoes', url: '/crops/tomatoes', difficulty: 'Medium' },
      { name: 'Peppers', url: '/crops/peppers', difficulty: 'Medium' },
      { name: 'Cucumbers', url: '/crops/cucumbers', difficulty: 'Easy' },
      { name: 'Corn', url: '/crops/corn', difficulty: 'Hard' },
      { name: 'Zucchini', url: '/crops/zucchini', difficulty: 'Easy' },
      { name: 'Eggplant', url: '/crops/eggplant', difficulty: 'Medium' },
    ]
  },
  {
    name: 'Autumn',
    icon: <Cloud className="w-6 h-6 text-orange-400" />,
    description: 'A season of harvest and preparation for winter.',
    crops: [
      { name: 'Pumpkins', url: '/crops/pumpkins', difficulty: 'Medium' },
      { name: 'Squash', url: '/crops/squash', difficulty: 'Easy' },
      { name: 'Apples', url: '/crops/apples', difficulty: 'Hard' },
      { name: 'Broccoli', url: '/crops/broccoli', difficulty: 'Medium' },
      { name: 'Brussels Sprouts', url: '/crops/brussels-sprouts', difficulty: 'Hard' },
      { name: 'Cauliflower', url: '/crops/cauliflower', difficulty: 'Medium' },
    ]
  },
  {
    name: 'Winter',
    icon: <Snowflake className="w-6 h-6 text-blue-400" />,
    description: 'A time for hardy crops and indoor gardening.',
    crops: [
      { name: 'Kale', url: '/crops/kale', difficulty: 'Easy' },
      { name: 'Winter Squash', url: '/crops/winter-squash', difficulty: 'Medium' },
      { name: 'Onions', url: '/crops/onions', difficulty: 'Easy' },
      { name: 'Garlic', url: '/crops/garlic', difficulty: 'Easy' },
      { name: 'Leeks', url: '/crops/leeks', difficulty: 'Medium' },
      { name: 'Microgreens', url: '/crops/microgreens', difficulty: 'Easy' },
    ]
  }
]

export default function EnhancedSeasonSelector() {
  const [selectedSeason, setSelectedSeason] = useState('Spring')
  const [selectedCrops, setSelectedCrops] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string>('all')
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Seasonal Crop Planner</CardTitle>
          <CardDescription className="text-center">Select a season and crops to plan your garden</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full mb-6">
            <AccordionItem value="seasons">
              <AccordionTrigger>Choose a Season</AccordionTrigger>
              <AccordionContent>
                <RadioGroup value={selectedSeason} onValueChange={handleSeasonChange} className="grid grid-cols-2 gap-4">
                  {seasons.map((season) => (
                    <Label
                      key={season.name}
                      htmlFor={season.name}
                      className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <RadioGroupItem value={season.name} id={season.name} />
                      <div className="flex items-center space-x-2">
                        {season.icon}
                        <span>{season.name}</span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <AnimatePresence>
            {selectedSeason && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert className="mb-6">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Season Information</AlertTitle>
                  <AlertDescription>
                    {seasons.find((s) => s.name === selectedSeason)?.description}
                  </AlertDescription>
                </Alert>

                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">{selectedSeason} Crops</h3>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Difficulties</SelectItem>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-[300px] rounded-md border p-4">
                  <div className="space-y-4">
                    {filteredCrops.map((crop) => (
                      <div key={crop.name} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Checkbox
                            id={crop.name}
                            checked={selectedCrops.includes(crop.name)}
                            onCheckedChange={() => handleCropToggle(crop.name)}
                          />
                          <label
                            htmlFor={crop.name}
                            className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {crop.name}
                          </label>
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant={crop.difficulty === 'Easy' ? 'secondary' : crop.difficulty === 'Medium' ? 'default' : 'destructive'}>
                                {crop.difficulty}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Difficulty level: {crop.difficulty}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {selectedCrops.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Selected Crops:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCrops.map((crop) => (
                        <Badge key={crop} variant="outline" className="py-1 px-2">
                          {crop}
                          <button
                            onClick={() => handleRemoveCrop(crop)}
                            className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            aria-label={`Remove ${crop}`}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Selected crops: {selectedCrops.length}
            </p>
          </div>
          {selectedCrops.length > 0 && (
            <Link href={seasons.find((s) => s.name === selectedSeason)?.crops.find(c => c.name === selectedCrops[0])?.url || '#'}>
              <Button>
                View First Selected Crop <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}