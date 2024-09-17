import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Sun, CloudRain } from 'lucide-react'
import { motion } from 'framer-motion'

export function WeatherForecast() {
  const forecast = [
    { day: 'Mon', icon: Sun, temp: '25°C' },
    { day: 'Tue', icon: Cloud, temp: '22°C' },
    { day: 'Wed', icon: CloudRain, temp: '20°C' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {forecast.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <day.icon className="mx-auto mb-2" />
              <div>{day.day}</div>
              <div>{day.temp}</div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}