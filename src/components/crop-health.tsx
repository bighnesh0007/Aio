import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plane } from 'lucide-react'
import { motion } from 'framer-motion'

export function CropHealth() {
  const crops = [
    { name: 'Wheat', health: 85 },
    { name: 'Corn', health: 92 },
    { name: 'Soybeans', health: 78 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Plane className="mr-2" /> Crop Health
        </CardTitle>
      </CardHeader>
      <CardContent>
        {crops.map((crop, index) => (
          <motion.div
            key={crop.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-2"
          >
            <div className="flex justify-between items-center">
              <span>{crop.name}</span>
              <span>{crop.health}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-600 h-2.5 rounded-full"
                style={{ width: `${crop.health}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}