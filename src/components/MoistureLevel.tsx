'use client'

import { CardHeader, CardContent, CardFooter, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FaTint } from 'react-icons/fa'

interface MoistureLevelProps {
  moisture: number;
  setMoisture: (value: number) => void;
  autoIrrigation: boolean;
  setAutoIrrigation: (value: boolean) => void;
}

export default function MoistureLevel({ moisture, setMoisture, autoIrrigation, setAutoIrrigation }: MoistureLevelProps) {
  return (
    <Card>
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
    </Card>
  )
}