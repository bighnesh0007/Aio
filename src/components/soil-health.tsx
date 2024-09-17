import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet } from 'lucide-react'
import { motion } from 'framer-motion'

export function SoilHealth() {
  const soilData = [
    { metric: 'Moisture', value: '35%' },
    { metric: 'pH', value: '6.5' },
    { metric: 'Nitrogen', value: 'Optimal' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplet className="mr-2" /> Soil Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        {soilData.map((data, index) => (
          <motion.div
            key={data.metric}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-2"
          >
            <div className="flex justify-between items-center">
              <span>{data.metric}</span>
              <span className="font-bold">{data.value}</span>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}