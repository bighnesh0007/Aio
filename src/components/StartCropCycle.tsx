'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa'

const MotionCard = motion(CardHeader)

export default function StartCropCycle({ isOptimalCondition }: { isOptimalCondition: boolean }) {
  const [cycleStarted, setCycleStarted] = useState(false)

  const startCropCycle = () => {
    setCycleStarted(true)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <MotionCard
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardTitle className="text-2xl font-bold">Start Crop Cycle</CardTitle>
        <CardDescription>Begin the crop cycle when conditions are optimal</CardDescription>
      </MotionCard>
      <CardContent className="p-6">
        {cycleStarted ? (
          <Alert>
            <FaCheck className="h-4 w-4" />
            <AlertTitle>Crop Cycle Started</AlertTitle>
            <AlertDescription>
              Your crop cycle has begun. Monitor your crops regularly for best results.
            </AlertDescription>
          </Alert>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            {isOptimalCondition
              ? "Conditions are optimal to start the crop cycle!"
              : "Waiting for optimal conditions..."}
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center p-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="w-full max-w-xs">
                <Button
                  onClick={startCropCycle}
                  disabled={!isOptimalCondition || cycleStarted}
                  className="w-full"
                >
                  {cycleStarted ? (
                    <>Cycle Started</>
                  ) : (
                    <>
                      <FaCheck className="mr-2 h-4 w-4" /> Start Crop Cycle
                    </>
                  )}
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {isOptimalCondition
                ? cycleStarted
                  ? "Crop cycle has already started"
                  : "Click to start the crop cycle"
                : "Optimal conditions required: Seed and Soil quality should not be Poor, and Weather should not be Windy"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
      {!isOptimalCondition && !cycleStarted && (
        <CardContent className="p-6">
          <Alert variant="destructive">
            <FaExclamationTriangle className="h-4 w-4" />
            <AlertTitle>Non-Optimal Conditions</AlertTitle>
            <AlertDescription>
              Current conditions are not optimal for starting the crop cycle. Please check seed quality, soil quality, and weather conditions.
            </AlertDescription>
          </Alert>
        </CardContent>
      )}
      {cycleStarted && (
        <CardContent className="p-6">
          <Link href="/VegetativeStage" className="text-primary hover:underline">
            Go to Vegetative Stage
          </Link>
        </CardContent>
      )}
    </div>
  )
}