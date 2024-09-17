
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from 'lucide-react'
import { motion } from 'framer-motion'

export function DronePatrol() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plane className="mr-2" /> Drone Patrol
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-2">
            <p>Next scheduled patrol: 2 hours</p>
            <p>Last patrol coverage: 85%</p>
            <p>Anomalies detected: 3</p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}