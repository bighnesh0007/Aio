'use client'

import { CardHeader, CardContent, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FaSun } from 'react-icons/fa'

interface SunlightProps {
  sunlight: number;
  setSunlight: (value: number) => void;
}

export default function Sunlight({ sunlight, setSunlight }: SunlightProps) {
  return (
    <Card>
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
    </Card>
  )
}