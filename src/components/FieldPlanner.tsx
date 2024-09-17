import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FieldPlannerProps {
  fieldSize: number
  setFieldSize: (size: number) => void
  soilType: string
  setSoilType: (type: string) => void
  irrigationType: string
  setIrrigationType: (type: string) => void
}

export default function FieldPlanner({
  fieldSize,
  setFieldSize,
  soilType,
  setSoilType,
  irrigationType,
  setIrrigationType
}: FieldPlannerProps) {
  return (
    <div className="grid gap-4 mt-6">
      <h3 className="text-lg font-semibold">Field Planning</h3>
      <div className="grid gap-2">
        <Label htmlFor="fieldSize">Field Size (acres)</Label>
        <Input
          id="fieldSize"
          type="number"
          value={fieldSize}
          onChange={(e) => setFieldSize(Number(e.target.value))}
          min={0.1}
          step={0.1}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="soilType">Soil Type</Label>
        <Select value={soilType} onValueChange={setSoilType}>
          <SelectTrigger id="soilType">
            <SelectValue placeholder="Select soil type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sandy">Sandy</SelectItem>
            <SelectItem value="clay">Clay</SelectItem>
            <SelectItem value="loamy">Loamy</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="irrigationType">Irrigation Type</Label>
        <Select value={irrigationType} onValueChange={setIrrigationType}>
          <SelectTrigger id="irrigationType">
            <SelectValue placeholder="Select irrigation type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="drip">Drip</SelectItem>
            <SelectItem value="sprinkler">Sprinkler</SelectItem>
            <SelectItem value="traditional">Traditional</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}