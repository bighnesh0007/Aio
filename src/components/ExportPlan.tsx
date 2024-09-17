import React from 'react'
import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ExportPlanProps {
  selectedSeason: string
  selectedCrops: string[]
  fieldSize: number
  soilType: string
  irrigationType: string
  visualPlan: Record<string, string>
}

export default function ExportPlan({
  selectedSeason,
  selectedCrops,
  fieldSize,
  soilType,
  irrigationType,
  visualPlan
}: ExportPlanProps) {
  const handleExport = () => {
    const planData = {
      season: selectedSeason,
      crops: selectedCrops,
      fieldSize,
      soilType,
      irrigationType,
      visualPlan
    }

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(planData))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "crop_plan.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  return (
    <Button onClick={handleExport} disabled={selectedCrops.length === 0}>
      <Download className="mr-2 h-4 w-4" /> Export Plan
    </Button>
  )
}