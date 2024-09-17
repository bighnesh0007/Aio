import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bug } from 'lucide-react'
import { motion } from 'framer-motion'

export function PestControl() {
  const pestAlerts = [
    { type: 'Aphids', location: 'Field A', severity: 'Medium' },
    { type: 'Locusts', location: 'Field C', severity: 'High' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bug className="mr-2" /> Pest Control
        </CardTitle>
      </CardHeader>
      <CardContent>
        {pestAlerts.map((alert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-2 p-2 bg-red-100 rounded"
          >
            <div className="font-bold">{alert.type}</div>
            <div>Location: {alert.location}</div>
            <div>Severity: {alert.severity}</div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}