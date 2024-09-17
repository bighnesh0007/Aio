import React from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from "@/hooks/use-toast"


interface NotificationsProps {
  selectedCrops: string[]
}

export default function Notifications({ selectedCrops }: NotificationsProps) {
  const { toast } = useToast()

  const handleSetNotifications = () => {
    // In a real application, this would set up actual notifications
    toast({
      title: 'Notifications Set',
      description: `You will receive notifications for ${selectedCrops.join(', ')}`,
    })
  }

  return (
    <Button onClick={handleSetNotifications} disabled={selectedCrops.length === 0}>
      <Bell className="mr-2 h-4 w-4" /> Set Notifications
    </Button>
  )
}