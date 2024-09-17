import React from 'react'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface CropRedirectProps {
  selectedCrops: string
}

export default function CropRedirect({ selectedCrops }: CropRedirectProps) {
  return (
    <>
      {/* <div className='mr-100  z-100'> */}
        {selectedCrops && (
          <Link href={`/crops/${selectedCrops.toLowerCase()}`}>
            <Button className='fixed bottom-4 right-4'>
              View {selectedCrops} Crops <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      {/* </div> */}
    </>
  )
}