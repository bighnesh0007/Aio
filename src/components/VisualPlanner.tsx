'use client'

import React, { useState, useRef, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Grid, Box, Rotate3D } from 'lucide-react'

interface VisualPlannerProps {
  selectedCrops: string[]
  fieldSize: number
  visualPlan: Record<string, string>
  setVisualPlan: (plan: Record<string, string>) => void
}

const cropColors: Record<string, string> = {
  Tomatoes: '#ff6347',
  Lettuce: '#90ee90',
  Carrots: '#ffa500',
  Peppers: '#ff4500',
  Cucumbers: '#32cd32',
  Corn: '#ffd700',
}

function CropPlot({ position, crop }: { position: [number, number, number]; crop: string }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.9, 0.9, 0.1]} />
      <meshStandardMaterial color={cropColors[crop] || '#cccccc'} />
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.3}
        color="black"
        anchorX="center"
        anchorY="middle"
      >
        {crop}
      </Text>
    </mesh>
  )
}

function Field({ visualPlan, gridSize }: { visualPlan: Record<string, string>; gridSize: number }) {
  const { camera } = useThree()
  const fieldRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (fieldRef.current) {
      const box = new THREE.Box3().setFromObject(fieldRef.current)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())

      const maxDim = Math.max(size.x, size.z)
      const fov = (camera as THREE.PerspectiveCamera).fov * (Math.PI / 180)
      let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2))

      cameraZ *= 1.5 // Zoom out a bit

      camera.position.set(center.x, cameraZ, center.z)
      camera.lookAt(center)
      camera.updateProjectionMatrix()
    }
  }, [camera, visualPlan, gridSize])

  return (
    <group ref={fieldRef}>
      {Object.entries(visualPlan).map(([cellId, crop]) => {
        const [, cellIndex] = cellId.split('-')
        const index = parseInt(cellIndex)
        const x = (index % gridSize) - gridSize / 2 + 0.5
        const z = Math.floor(index / gridSize) - gridSize / 2 + 0.5
        return <CropPlot key={cellId} position={[x, 0, z]} crop={crop} />
      })}
      <gridHelper args={[gridSize, gridSize]} />
    </group>
  )
}

function AnimatedOrbitControls({ autoRotate }: { autoRotate: boolean }) {
  const { camera } = useThree()
  const controlsRef = useRef<any>()

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.update()
    }
  })

  return <OrbitControls ref={controlsRef} args={[camera]} autoRotate={autoRotate} />
}

export default function VisualPlanner({
  selectedCrops,
  fieldSize,
  visualPlan,
  setVisualPlan
}: VisualPlannerProps) {
  const [view, setView] = useState<'2d' | '3d'>('2d')
  const [gridSize, setGridSize] = useState(Math.ceil(Math.sqrt(fieldSize * 10)))
  const [autoRotate, setAutoRotate] = useState(false)

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const newPlan = { ...visualPlan }
    delete newPlan[result.draggableId]
    newPlan[result.destination.droppableId] = result.draggableId

    setVisualPlan(newPlan)
  }

  useEffect(() => {
    setGridSize(Math.ceil(Math.sqrt(fieldSize * 10)))
  }, [fieldSize])

  return (
    <div className="grid gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Visual Field Planner</h3>
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle">3D View</Label>
          <Switch
            id="view-toggle"
            checked={view === '3d'}
            onCheckedChange={(checked) => setView(checked ? '3d' : '2d')}
          />
        </div>
      </div>
      <Tabs defaultValue="planner" className="w-full">
        <TabsList>
          <TabsTrigger value="planner">Planner</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
        </TabsList>
        <TabsContent value="planner">
          <div className="flex gap-4">
            <div className="w-1/4">
              <h4 className="text-md font-semibold mb-2">Crops</h4>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="cropList">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                      {selectedCrops.map((crop, index) => (
                        <Draggable key={crop} draggableId={crop} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Badge
                                variant="outline"
                                className="w-full justify-center"
                                style={{ backgroundColor: cropColors[crop] }}
                              >
                                {crop}
                              </Badge>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
            <div className="w-3/4">
              <h4 className="text-md font-semibold mb-2">Field Grid</h4>
              {view === '2d' ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <div
                    className="grid gap-1"
                    style={{
                      gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: gridSize * gridSize }).map((_, index) => (
                      <Droppable key={index} droppableId={`cell-${index}`}>
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className="aspect-square border border-gray-300 flex items-center justify-center text-xs"
                          >
                            {visualPlan[`cell-${index}`] && (
                              <Badge
                                variant="secondary"
                                style={{ backgroundColor: cropColors[visualPlan[`cell-${index}`]] }}
                              >
                                {visualPlan[`cell-${index}`]}
                              </Badge>
                            )}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    ))}
                  </div>
                </DragDropContext>
              ) : (
                <div className="w-full aspect-square">
                  <Canvas>
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-10, -10, -10]} />
                    <Field visualPlan={visualPlan} gridSize={gridSize} />
                    <AnimatedOrbitControls autoRotate={autoRotate} />
                  </Canvas>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="controls">
          <div className="space-y-4">
            <div>
              <Label htmlFor="grid-size">Grid Size</Label>
              <Slider
                id="grid-size"
                min={5}
                max={20}
                step={1}
                value={[gridSize]}
                onValueChange={(value) => setGridSize(value[0])}
              />
            </div>
            {view === '3d' && (
              <div className="flex items-center space-x-2">
                <Rotate3D className="h-4 w-4" />
                <Label htmlFor="auto-rotate">Auto Rotate</Label>
                <Switch
                  id="auto-rotate"
                  checked={autoRotate}
                  onCheckedChange={setAutoRotate}
                />
              </div>
            )}
            <Button onClick={() => setVisualPlan({})}>Clear Field</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}