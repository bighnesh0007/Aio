'use client'

import { CardHeader, CardContent, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { FaWind } from 'react-icons/fa'

interface WindSpeedProps {
  windSpeed: number;
  setWindSpeed: (value: number) => void;
}

export default function WindSpeed({ windSpeed, setWindSpeed }: WindSpeedProps) {
  return (
    <Card>
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
    </Card>
  )
}