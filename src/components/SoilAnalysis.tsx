'use client'

import { useState, useCallback } from 'react'
import { Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FaSeedling, FaCamera, FaSpinner } from 'react-icons/fa'

const MotionCard = motion(Card)

interface SoilAnalysisProps {
  setSoilQuality: (quality: string) => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function SoilAnalysis({ setSoilQuality }: SoilAnalysisProps) {
  const [soilQualityState, setSoilQualityState] = useState<string | null>(null)
  const [soilImage, setSoilImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target) {
        setSoilImage(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleImageUpload(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  })

  const analyzeSoilQuality = async () => {
    if (!soilImage) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch('/api/analyze-soils', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: soilImage }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze soil quality')
      }

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }

      setSoilQualityState(data.quality)
      setSoilQuality(data.quality)
    } catch (error) {
      console.error('Error analyzing soil quality:', error)
      setError('Failed to analyze soil quality. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <MotionCard className="w-full" variants={cardVariants} initial="hidden" animate="visible">
      <CardHeader>
        <CardTitle>Soil Analysis</CardTitle>
        <CardDescription>Upload a soil image for analysis using Gemini Flash</CardDescription>
      </CardHeader>
      <CardContent>
        <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:border-primary">
          <input {...getInputProps()} />
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
                handleImageUpload(e.target.files[0])
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
        <Button 
          className="w-full" 
          onClick={analyzeSoilQuality} 
          disabled={!soilImage || isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <FaSpinner className="mr-2 h-4 w-4 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <FaSeedling className="mr-2 h-4 w-4" /> Analyze Soil Quality
            </>
          )}
        </Button>
        {soilQualityState && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Badge variant="outline" className="mt-4">
              Soil Quality: {soilQualityState}
            </Badge>
          </motion.div>
        )}
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
      </CardFooter>
    </MotionCard>
  )
}