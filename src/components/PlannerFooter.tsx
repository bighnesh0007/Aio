import React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { seasons } from '@/data/seasons'

interface PlannerFooterProps {
  selectedCrops: string[]
  selectedSeason: string
}

export default function PlannerFooter({ selectedCrops, selectedSeason }: PlannerFooterProps) {
  const firstSelectedCropUrl = seasons
    .find((s) => s.name === selectedSeason)
    ?.crops.find(c => c.name === selectedCrops[0])?.url || '#'

  return (
    <>
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Selected crops: {selectedCrops.length}
        </p>
      </div>
      {selectedCrops.length > 0 && (
        <Link href={firstSelectedCropUrl}>
          <Button>
            View First Selected Crop <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      )}
    </>
  )
}