import React from 'react'
import { X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface SelectedCropsProps {
  selectedCrops: string[]
  onRemoveCrop: (cropName: string) => void
}

export default function SelectedCrops({ selectedCrops, onRemoveCrop }: SelectedCropsProps) {
  if (selectedCrops.length === 0) return null

  return (
    <div className="mt-6">
      <h4 className="text-lg font-semibold mb-2">Selected Crops:</h4>
      <div className="flex flex-wrap gap-2">
        {selectedCrops.map((crop) => (
          <Badge key={crop} variant="outline" className="py-1 px-2">
            {crop}
            <button
              onClick={() => onRemoveCrop(crop)}
              className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-label={`Remove ${crop}`}
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  )
}