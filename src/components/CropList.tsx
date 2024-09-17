import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface CropListProps {
  crops: Array<{ name: string; difficulty: string }>
  selectedCrops: string[]
  onCropToggle: (cropName: string) => void
  difficulty: string
  onDifficultyChange: (difficulty: string) => void
}

export default function CropList({ crops, selectedCrops, onCropToggle, difficulty, onDifficultyChange }: CropListProps) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Seasonal Crops</h3>
        <Select value={difficulty} onValueChange={onDifficultyChange}>
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
          {crops.map((crop) => (
            <div key={crop.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id={crop.name}
                  checked={selectedCrops.includes(crop.name)}
                  onCheckedChange={() => onCropToggle(crop.name)}
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
    </>
  )
}