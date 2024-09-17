import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart } from 'lucide-react'
import { motion } from 'framer-motion'

export function YieldPrediction() {
  const predictions = [
    { crop: 'Wheat', yield: 5.2 },
    { crop: 'Corn', yield: 9.7 },
    { crop: 'Soybeans', yield: 3.1 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart className="mr-2" /> Yield Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        {predictions.map((pred, index) => (
          <motion.div
            key={pred.crop}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-2"
          >
            <div className="flex justify-between items-center">
              <span>{pred.crop}</span>
              <span>{pred.yield} tons/acre</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(pred.yield / 10) * 100}%` }}
              ></div>
            </div>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  )
}