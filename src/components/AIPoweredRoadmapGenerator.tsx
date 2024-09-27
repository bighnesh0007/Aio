'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'
import { FaRobot } from 'react-icons/fa'

const MotionCard = motion(CardHeader)

export default function AIPoweredRoadmapGenerator() {
  const [cropType, setCropType] = useState('')
  const [region, setRegion] = useState('')
  const [soilType, setSoilType] = useState('')
  const [season, setSeason] = useState('')
  const [sowingDate, setSowingDate] = useState('')
  const [harvestDate, setHarvestDate] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [roadmap, setRoadmap] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0])
    }
  }

  const generateRoadmap = async () => {
    setIsLoading(true)
    // Simulating AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock AI-generated roadmap
    const mockRoadmap = [
      "Soil Preparation: Prepare the soil with organic matter and ensure proper pH levels.",
      "Sowing: Plant seeds at the recommended depth and spacing for your crop type.",
      "Germination: Maintain optimal moisture and temperature for seed germination.",
      "Seedling Care: Provide adequate water and protect young plants from pests.",
      "Vegetative Growth: Apply fertilizers and monitor for any signs of disease or nutrient deficiencies.",
      "Flowering/Fruiting: Ensure proper pollination and continue pest management.",
      "Maturation: Monitor crop for signs of maturity and prepare for harvest.",
      "Harvest: Harvest the crop at peak maturity for best quality and yield."
    ]

    setRoadmap(mockRoadmap)
    setIsLoading(false)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <MotionCard
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardTitle className="text-2xl font-bold">AI-Powered Crop Roadmap Generator</CardTitle>
        <CardDescription>Enter crop details or upload a photo to generate a customized growth roadmap</CardDescription>
      </MotionCard>
      <CardContent className="p-6">
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cropType">Crop Type</Label>
              <Input id="cropType" value={cropType} onChange={(e) => setCropType(e.target.value)} placeholder="e.g., Tomato" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="region">Region/Location</Label>
              <Input id="region" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="e.g., Midwest USA" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Select value={soilType} onValueChange={setSoilType}>
                <SelectTrigger id="soilType">
                  <SelectValue placeholder="Select soil type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="loamy">Loamy</SelectItem>
                  <SelectItem value="clay">Clay</SelectItem>
                  <SelectItem value="sandy">Sandy</SelectItem>
                  <SelectItem value="silt">Silt</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="season">Season</Label>
              <Select value={season} onValueChange={setSeason}>
                <SelectTrigger id="season">
                  <SelectValue placeholder="Select season" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="spring">Spring</SelectItem>
                  <SelectItem value="summer">Summer</SelectItem>
                  <SelectItem value="fall">Fall</SelectItem>
                  <SelectItem value="winter">Winter</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="sowingDate">Sowing Date</Label>
              <Input id="sowingDate" type="date" value={sowingDate} onChange={(e) => setSowingDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="harvestDate">Expected Harvest Date</Label>
              <Input id="harvestDate" type="date" value={harvestDate} onChange={(e) => setHarvestDate(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="photo">Upload Crop Photo (Optional)</Label>
            <Input id="photo" type="file" accept="image/*" onChange={handlePhotoUpload} />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between p-6">
        <Button variant="outline" onClick={() => setRoadmap([])}>Clear</Button>
        <Button onClick={generateRoadmap} disabled={isLoading}>
          {isLoading ? (
            <>Generating... <FaRobot className="ml-2 animate-spin" /></>
          ) : (
            <>Generate Roadmap <FaRobot className="ml-2" /></>
          )}
        </Button>
      </CardFooter>
      {roadmap.length > 0 && (
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Generated Crop Roadmap</h3>
          <Timeline position="alternate">
            {roadmap.map((step, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary" />
                  {index < roadmap.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <p className="font-medium">{step}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      )}
    </div>
  )
}