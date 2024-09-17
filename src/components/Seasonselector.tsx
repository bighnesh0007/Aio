import React from 'react'
import { Leaf, Sun, Cloud, Snowflake } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const seasons = [
  { name: 'Spring', icon: <Leaf className="w-6 h-6 text-green-400" /> },
  { name: 'Summer', icon: <Sun className="w-6 h-6 text-yellow-400" /> },
  { name: 'Autumn', icon: <Cloud className="w-6 h-6 text-orange-400" /> },
  { name: 'Winter', icon: <Snowflake className="w-6 h-6 text-blue-400" /> },
]

interface SeasonSelectorProps {
  selectedSeason: string
  onSeasonChange: (season: string) => void
}

export default function SeasonSelector({ selectedSeason, onSeasonChange }: SeasonSelectorProps) {
  return (
    <Accordion type="single" collapsible className="w-full mb-6">
      <AccordionItem value="seasons">
        <AccordionTrigger>Choose a Season</AccordionTrigger>
        <AccordionContent>
          <RadioGroup value={selectedSeason} onValueChange={onSeasonChange} className="grid grid-cols-2 gap-4">
            {seasons.map((season) => (
              <Label
                key={season.name}
                htmlFor={season.name}
                className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <RadioGroupItem value={season.name} id={season.name} />
                <div className="flex items-center space-x-2">
                  {season.icon}
                  <span>{season.name}</span>
                </div>
              </Label>
            ))}
          </RadioGroup>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}