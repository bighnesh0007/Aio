'use client'

import React, { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { ArrowUpRight, ArrowDownRight, Minus, TrendingUp, TrendingDown, DollarSign, BarChart3 } from 'lucide-react'

// This would typically come from an API or database
const marketData = {
  Tomatoes: { currentPrice: 2.5, trend: 'up', forecast: 'positive', volatility: 'medium' },
  Lettuce: { currentPrice: 1.8, trend: 'down', forecast: 'negative', volatility: 'low' },
  Carrots: { currentPrice: 1.2, trend: 'stable', forecast: 'neutral', volatility: 'low' },
  Peppers: { currentPrice: 3.0, trend: 'up', forecast: 'positive', volatility: 'high' },
  Cucumbers: { currentPrice: 1.5, trend: 'down', forecast: 'neutral', volatility: 'medium' },
  Corn: { currentPrice: 0.8, trend: 'stable', forecast: 'positive', volatility: 'low' },
}

const generateHistoricalData = (crop: string) => {
  const basePrice = marketData[crop as keyof typeof marketData]?.currentPrice || 1
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2023, i, 1).toLocaleString('default', { month: 'short' }),
    price: +(basePrice * (1 + (Math.random() - 0.5) * 0.2)).toFixed(2)
  }))
}

interface MarketAnalysisProps {
  selectedCrops: string[]
}

export default function MarketAnalysis({ selectedCrops }: MarketAnalysisProps) {
  const [selectedCrop, setSelectedCrop] = useState(selectedCrops[0] || '')
  const [timeRange, setTimeRange] = useState('12')
  const [showForecast, setShowForecast] = useState(false)

  const historicalData = useMemo(() => generateHistoricalData(selectedCrop), [selectedCrop])

  const forecastData = useMemo(() => {
    const lastPrice = historicalData[historicalData.length - 1].price
    const trend = marketData[selectedCrop as keyof typeof marketData]?.trend || 'stable'
    const volatility = marketData[selectedCrop as keyof typeof marketData]?.volatility || 'medium'

    const trendFactor = trend === 'up' ? 1.02 : trend === 'down' ? 0.98 : 1
    const volatilityFactor = volatility === 'high' ? 0.1 : volatility === 'medium' ? 0.05 : 0.02

    return Array.from({ length: 6 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
      price: +(lastPrice * Math.pow(trendFactor, i + 1) * (1 + (Math.random() - 0.5) * volatilityFactor)).toFixed(2)
    }))
  }, [selectedCrop, historicalData])

  const chartData = useMemo(() => {
    const filteredHistorical = historicalData.slice(-parseInt(timeRange))
    return showForecast ? [...filteredHistorical, ...forecastData] : filteredHistorical
  }, [historicalData, forecastData, timeRange, showForecast])

  const currentPrice = marketData[selectedCrop as keyof typeof marketData]?.currentPrice || 0
  const trend = marketData[selectedCrop as keyof typeof marketData]?.trend || 'stable'
  const forecast = marketData[selectedCrop as keyof typeof marketData]?.forecast || 'neutral'

  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default:
        return <Minus className="h-4 w-4 text-yellow-500" />
    }
  }

  const renderForecastIcon = (forecast: string) => {
    switch (forecast) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Market Analysis</h2>
        <Select value={selectedCrop} onValueChange={setSelectedCrop}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a crop" />
          </SelectTrigger>
          <SelectContent>
            {selectedCrops.map((crop) => (
              <SelectItem key={crop} value={crop}>{crop}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Price</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${currentPrice.toFixed(2)}/kg</div>
            <p className="text-xs text-muted-foreground">Per kilogram</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Trend</CardTitle>
            {renderTrendIcon(trend)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{trend}</div>
            <p className="text-xs text-muted-foreground">Current market trend</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Price Forecast</CardTitle>
            {renderForecastIcon(forecast)}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{forecast}</div>
            <p className="text-xs text-muted-foreground">Expected price movement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="chart" className="space-y-4">
        <TabsList>
          <TabsTrigger value="chart">Price Chart</TabsTrigger>
          <TabsTrigger value="table">Price Table</TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <Label htmlFor="timeRange">Time Range</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger id="timeRange" className="w-[180px]">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 months</SelectItem>
                  <SelectItem value="6">6 months</SelectItem>
                  <SelectItem value="12">12 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="showForecast"
                checked={showForecast}
                onCheckedChange={setShowForecast}
              />
              <Label htmlFor="showForecast">Show Forecast</Label>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#8884d8" name="Price ($/kg)" />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Price ($/kg)</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chartData.map((data, index) => (
                <TableRow key={data.month}>
                  <TableCell>{data.month}</TableCell>
                  <TableCell>{data.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {index > 0 ? (
                      <Badge variant={data.price > chartData[index - 1].price ? "default" : "destructive"}>
                        {((data.price - chartData[index - 1].price) / chartData[index - 1].price * 100).toFixed(2)}%
                      </Badge>
                    ) : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Market Insights</CardTitle>
          <CardDescription>Key factors affecting {selectedCrop} prices</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            <li>Supply and demand fluctuations due to seasonal changes</li>
            <li>Weather conditions in major growing regions</li>
            <li>Changes in production costs (e.g., fuel, labor, fertilizer)</li>
            <li>Global trade policies and tariffs</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button variant="outline">Download Full Report</Button>
        </CardFooter>
      </Card>
    </div>
  )
}