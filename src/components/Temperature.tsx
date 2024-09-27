'use client'

import { CardHeader, CardContent, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { FaThermometerHalf } from 'react-icons/fa'

interface TemperatureProps {
  temperature: number;
  setTemperature: (value: number) => void;
}

export default function Temperature({ temperature, setTemperature }: TemperatureProps) {
  return (
    <Card>
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
    </Card>
  )
}