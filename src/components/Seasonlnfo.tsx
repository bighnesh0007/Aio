import React from 'react'
import { Info } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface SeasonInfoProps {
  season: {
    name: string
    description: string
  } | undefined
}

export default function SeasonInfo({ season }: SeasonInfoProps) {
  if (!season) return null

  return (
    <Alert className="mb-6">
      <Info className="h-4 w-4" />
      <AlertTitle>Season Information</AlertTitle>
      <AlertDescription>{season.description}</AlertDescription>
    </Alert>
  )
}