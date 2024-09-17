"use client";
  
import { DashboardHeader } from '@/components/dashboard-header'
import { DronePatrol } from '@/components/drone-patrol'
import { WeatherForecast } from '@/components/weather-forecast'
import { CropHealth } from '@/components/crop-health'
import { PestControl } from '@/components/pest-control'
import { YieldPrediction } from '@/components/yield-prediction'
import { SoilHealth } from '@/components/soil-health'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <DashboardHeader />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <DronePatrol />
        <WeatherForecast />
        <CropHealth />
        <PestControl />
        <YieldPrediction />
        <SoilHealth />
      </div>
    </div>
  )
}