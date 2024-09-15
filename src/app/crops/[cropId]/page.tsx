'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect, useCallback, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {  FaRobot } from 'react-icons/fa'
import { FaCloudUploadAlt, FaSeedling, FaCloudSunRain, FaTint, FaThermometerHalf, FaWind, FaSun, FaLeaf, FaCheck, FaInfoCircle, FaCalendarAlt, FaCamera } from 'react-icons/fa'
import { useDropzone } from 'react-dropzone'
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'

const MotionCard = motion(Card)

export default function EnhancedCropDetails() {
  const { cropId } = useParams()
  const [seedImage, setSeedImage] = useState<string | null>(null)
  const [soilImage, setSoilImage] = useState<string | null>(null)
  const [seedQuality, setSeedQuality] = useState<string | null>(null)
  const [soilQuality, setSoilQuality] = useState<string | null>(null)
  const [weather, setWeather] = useState<string | null>(null)
  const [moisture, setMoisture] = useState(50)
  const [temperature, setTemperature] = useState(20)
  const [windSpeed, setWindSpeed] = useState(5)
  const [sunlight, setSunlight] = useState(70)
  const [autoIrrigation, setAutoIrrigation] = useState(false)
  const [isOptimalCondition, setIsOptimalCondition] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [growthStage, setGrowthStage] = useState('Seedling')
  const [cropType, setCropType] = useState('')
  const [region, setRegion] = useState('')
  const [soilType, setSoilType] = useState('')
  const [season, setSeason] = useState('')
  const [sowingDate, setSowingDate] = useState('')
  const [harvestDate, setHarvestDate] = useState('')
  const [photo, setPhoto] = useState<File | null>(null)
  const [roadmap, setRoadmap] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleImageUpload = (setState: (value: string | null) => void) => (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        setState(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const onDrop = useCallback((acceptedFiles: File[], setState: (value: string | null) => void) => {
    if (acceptedFiles.length > 0) {
      handleImageUpload(setState)(acceptedFiles[0])
    }
  }, [])

  const { getRootProps: getSeedRootProps, getInputProps: getSeedInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, setSeedImage),
    accept: { 'image/*': [] },
  })

  const { getRootProps: getSoilRootProps, getInputProps: getSoilInputProps } = useDropzone({
    onDrop: (files) => onDrop(files, setSoilImage),
    accept: { 'image/*': [] },
  })

  const analyzeSeedQuality = () => {
    const mockQualities = ['Excellent', 'Good', 'Fair', 'Poor']
    setSeedQuality(mockQualities[Math.floor(Math.random() * mockQualities.length)])
  }

  const analyzeSoilQuality = () => {
    const mockQualities = ['Rich', 'Balanced', 'Needs Fertilizer', 'Poor']
    setSoilQuality(mockQualities[Math.floor(Math.random() * mockQualities.length)])
  }

  const analyzeWeather = () => {
    const mockWeather = ['Sunny', 'Rainy', 'Cloudy', 'Windy']
    setWeather(mockWeather[Math.floor(Math.random() * mockWeather.length)])
  }

  const startCropCycle = () => {
    alert("Starting crop cycle with optimal conditions!")
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setPhoto(event.target.files[0])
    }
  }

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
          <AnimatePresence mode="wait">
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <MotionCard className="w-full" variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Seed Quality Analysis</CardTitle>
                    <CardDescription>Upload a seed image for analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div {...getSeedRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-primary">
                      <input {...getSeedInputProps()} />
                      <p>Drag & drop a seed image here, or click to select one</p>
                      <Button className="mt-2" onClick={() => document.getElementById('seedCamera')?.click()}>
                        <FaCamera className="mr-2" /> Use Camera
                      </Button>
                      <input
                        id="seedCamera"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(setSeedImage)(e.target.files[0])
                          }
                        }}
                      />
                    </div>
                    {seedImage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <img src={seedImage} alt="Uploaded seed" className="w-full h-48 object-cover rounded-md" />
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-center">
                    <Button className="w-full" onClick={analyzeSeedQuality} disabled={!seedImage}>
                      <FaCloudUploadAlt className="mr-2 h-4 w-4" /> Analyze Seed Quality
                    </Button>
                    {seedQuality && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge variant="outline" className="mt-4">
                          Seed Quality: {seedQuality}
                        </Badge>
                      </motion.div>
                    )}
                  </CardFooter>
                </MotionCard>

                <MotionCard className="w-full" variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Soil Analysis</CardTitle>
                    <CardDescription>Upload a soil image for analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div {...getSoilRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-primary">
                      <input {...getSoilInputProps()} />
                      <p>Drag & drop a soil image here, or click to select one</p>
                      <Button className="mt-2" onClick={() => document.getElementById('soilCamera')?.click()}>
                        <FaCamera className="mr-2" /> Use Camera
                      </Button>
                      <input
                        id="soilCamera"
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleImageUpload(setSoilImage)(e.target.files[0])
                          }
                        }}
                      />
                    </div>
                    {soilImage && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4"
                      >
                        <img src={soilImage} alt="Uploaded soil" className="w-full h-48 object-cover rounded-md" />
                      </motion.div>
                    )}
                  </CardContent>
                  <CardFooter className="flex flex-col items-center">
                    <Button className="w-full" onClick={analyzeSoilQuality} disabled={!soilImage}>
                      <FaSeedling className="mr-2 h-4 w-4" /> Analyze Soil Quality
                    </Button>
                    {soilQuality && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge variant="outline" className="mt-4">
                          Soil Quality: {soilQuality}
                        </Badge>
                      </motion.div>
                    )}
                  </CardFooter>
                </MotionCard>

                <MotionCard className="w-full" variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Weather Analysis</CardTitle>
                    <CardDescription>Check current weather conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-500 dark:text-gray-400">Click the button below to fetch current weather data for optimal crop growth.</p>
                  </CardContent>
                  <CardFooter className="flex flex-col items-center">
                    <Button className="w-full" onClick={analyzeWeather}>
                      <FaCloudSunRain className="mr-2 h-4 w-4" /> Analyze Weather
                    </Button>
                    {weather && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Badge variant="outline" className="mt-4">
                          Current Weather: {weather}
                        </Badge>
                      </motion.div>
                    )}
                  </CardFooter>
                </MotionCard>
              </div>
            </TabsContent>
            <TabsContent value="environment">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <MotionCard variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Moisture Level</CardTitle>
                    <CardDescription>Current soil moisture</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <FaTint className="text-blue-500" />
                      <Progress value={moisture} className="w-[60%]" />
                      <span>{moisture}%</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="auto-irrigation"
                              checked={autoIrrigation}
                              onCheckedChange={setAutoIrrigation}
                            />
                            <Label htmlFor="auto-irrigation">Auto Irrigation</Label>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enable automatic irrigation based on moisture levels</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardFooter>
                </MotionCard>

                <MotionCard variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Temperature</CardTitle>
                    <CardDescription>Current temperature</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <FaThermometerHalf className="text-red-500" />
                      <Slider
                        value={[temperature]}
                        max={50}
                        step={1}
                        className="w-[60%]"
                        onValueChange={(value) => setTemperature(value[0])}
                      />
                      <span>{temperature}°C</span>
                    </div>
                  </CardContent>
                </MotionCard>

                <MotionCard variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Wind Speed</CardTitle>
                    <CardDescription>Current wind conditions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <FaWind className="text-gray-500" />
                      <Slider
                        value={[windSpeed]}
                        max={30}
                        step={1}
                        className="w-[60%]"
                        onValueChange={(value) => setWindSpeed(value[0])}
                      />
                      <span>{windSpeed} km/h</span>
                    </div>
                  </CardContent>
                </MotionCard>

                <MotionCard variants={cardVariants} initial="hidden" animate="visible">
                  <CardHeader>
                    <CardTitle>Sunlight</CardTitle>
                    <CardDescription>Current sunlight intensity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-2">
                      <FaSun className="text-yellow-500" />
                      <Progress value={sunlight} className="w-[60%]" />
                      <span>{sunlight}%</span>
                    </div>
                  </CardContent>
                </MotionCard>
              </div>
            </TabsContent>
            <TabsContent value="roadmap">
              <MotionCard variants={cardVariants} initial="hidden" animate="visible">
                <CardHeader>
                  <CardTitle>Crop Growth Roadmap</CardTitle>
                  <CardDescription>Track your crop&apos;s journey from seed to harvest</CardDescription>
                </CardHeader>
                <CardContent>
                  <Timeline position="alternate">
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3 className="font-bold">Seed Germination</h3>
                        <p>Day 1-7</p>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3 className="font-bold">Seedling Stage</h3>
                        <p>Day 8-21</p>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3 className="font-bold">Vegetative Stage</h3>
                        <p>Day 22-50</p>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3 className="font-bold">Flowering Stage</h3>
                        <p>Day 51-80</p>
                      </TimelineContent>
                    </TimelineItem>
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot color="primary" />
                      </TimelineSeparator>
                      <TimelineContent>
                        <h3 className="font-bold">Harvest Stage</h3>
                        <p>Day 81+</p>
                      </TimelineContent>
                    </TimelineItem>
                  </Timeline>
                </CardContent>
              </MotionCard>
            </TabsContent>
          </AnimatePresence>
        </Tabs>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <MotionCard
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
            }}
            initial="hidden"
            animate="visible"
          >
            <CardHeader>
              <CardTitle>AI-Powered Crop Roadmap Generator</CardTitle>
              <CardDescription>Enter crop details or upload a photo to generate a customized growth roadmap</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cropType">Crop Type</Label>
                    <Input id="cropType" value={cropType} onChange={(e) => setCropType(e.target.value)} placeholder="e.g., Tomato" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="region">Region/Location</Label>
                    <Input id="region" value={region} onChange={(e) => setRegion(e.target.value)} placeholder="e.g., Midwest USA" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="soilType">Soil Type</Label>
                    <Select value={soilType} onValueChange={setSoilType}>
                      <SelectTrigger>
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
                      <SelectTrigger>
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
                </div>
                <div className="grid grid-cols-2 gap-4">
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
            <CardFooter className="flex justify-between">
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
              <CardContent>
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
          </MotionCard>

          <MotionCard variants={cardVariants} initial="hidden" animate="visible">
            <CardHeader>
              <CardTitle>Start Crop Cycle</CardTitle>
              <CardDescription>Begin the crop cycle when conditions are optimal</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 dark:text-gray-400">
                {isOptimalCondition
                  ? "Conditions are optimal to start the crop cycle!"
                  : "Waiting for optimal conditions..."}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={'/VegetativeStage'}>
                      <Button
                        onClick={startCropCycle}
                        disabled={!isOptimalCondition}
                        className="w-full max-w-xs"
                      >
                        <FaCheck className="mr-2 h-4 w-4" /> Start Crop Cycle
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    {isOptimalCondition
                      ? "Click to start the crop cycle"
                      : "Optimal conditions required: Seed and Soil quality should not be Poor, and Weather should not be Windy"}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </MotionCard>
        </div>
      </div>
    </div>
  )
}