'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Droplet, Sprout, DollarSign } from 'lucide-react'

// This would typically come from a database or API
const cropData = {
  Tomatoes: { water: 1000, fertilizer: 50, cost: 1000 },
  Lettuce: { water: 800, fertilizer: 30, cost: 800 },
  Carrots: { water: 700, fertilizer: 40, cost: 900 },
  Peppers: { water: 900, fertilizer: 45, cost: 1100 },
  Cucumbers: { water: 850, fertilizer: 35, cost: 950 },
  Corn: { water: 1200, fertilizer: 60, cost: 1200 },
}

interface ResourceManagementProps {
  selectedCrops: string[]
  fieldSize: number
  soilType: string
  irrigationType: string
}

export default function ResourceManagement({
  selectedCrops,
  fieldSize,
  soilType,
  irrigationType
}: ResourceManagementProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const calculateResources = (crop: string) => {
    const baseData = cropData[crop as keyof typeof cropData] || { water: 0, fertilizer: 0, cost: 0 }
    const soilFactor = soilType === 'clay' ? 1.2 : soilType === 'sandy' ? 0.8 : 1
    const irrigationFactor = irrigationType === 'drip' ? 0.9 : irrigationType === 'sprinkler' ? 1.1 : 1

    return {
      water: Math.round(baseData.water * fieldSize * soilFactor * irrigationFactor),
      fertilizer: Math.round(baseData.fertilizer * fieldSize * soilFactor),
      cost: Math.round(baseData.cost * fieldSize)
    }
  }

  const resourceData = useMemo(() => {
    return selectedCrops.map(crop => ({
      name: crop,
      ...calculateResources(crop)
    }))
  }, [selectedCrops, fieldSize, soilType, irrigationType])

  const filteredAndSortedData = useMemo(() => {
    return resourceData
      .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (a[sortBy as keyof typeof a] < b[sortBy as keyof typeof b]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortBy as keyof typeof a] > b[sortBy as keyof typeof b]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [resourceData, searchTerm, sortBy, sortOrder])

  const totalResources = useMemo(() => {
    return resourceData.reduce((acc, item) => ({
      water: acc.water + item.water,
      fertilizer: acc.fertilizer + item.fertilizer,
      cost: acc.cost + item.cost
    }), { water: 0, fertilizer: 0, cost: 0 })
  }, [resourceData])

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Water Usage</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResources.water.toLocaleString()} L</div>
            <p className="text-xs text-muted-foreground">For the entire field</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fertilizer Needs</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResources.fertilizer.toLocaleString()} kg</div>
            <p className="text-xs text-muted-foreground">For the entire field</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Estimated Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalResources.cost.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Including seeds, fertilizer, and water</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="chart">Chart View</TabsTrigger>
        </TabsList>
        <TabsContent value="table" className="space-y-4">
          <div className="flex justify-between">
            <div className="w-1/3">
              <Label htmlFor="search">Search Crops</Label>
              <Input
                id="search"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-1/3">
              <Label htmlFor="sort">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Crop Name</SelectItem>
                  <SelectItem value="water">Water Usage</SelectItem>
                  <SelectItem value="fertilizer">Fertilizer Needs</SelectItem>
                  <SelectItem value="cost">Estimated Cost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>Crop Name</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('water')}>Water Usage (L)</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('fertilizer')}>Fertilizer Needs (kg)</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('cost')}>Estimated Cost ($)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.map((item) => (
                <TableRow key={item.name}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.water.toLocaleString()}</TableCell>
                  <TableCell>{item.fertilizer.toLocaleString()}</TableCell>
                  <TableCell>{item.cost.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="chart">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={filteredAndSortedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="water" fill="#8884d8" name="Water Usage (L)" />
              <Bar yAxisId="left" dataKey="fertilizer" fill="#82ca9d" name="Fertilizer Needs (kg)" />
              <Bar yAxisId="right" dataKey="cost" fill="#ffc658" name="Estimated Cost ($)" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}