'use client'

import React, { useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { useDropzone } from 'react-dropzone'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, Camera, Image as ImageIcon } from "lucide-react"

const Photo: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    handleFileSelection(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleFileSelection = (selectedFile: File) => {
    setFile(selectedFile)
    const imageUrl = URL.createObjectURL(selectedFile)
    setPreviewUrl(imageUrl)
    setProcessedImageUrl(null)
    setError(null)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) return

    const formData = new FormData()
    formData.append('image', file)

    setIsLoading(true)
    setError(null)
    setProgress(0)

    try {
      const response = await axios.post('https://robofarmerserver.vercel.app/detect', formData, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1))
          setProgress(percentCompleted)
        },
      })

      if (response.data && response.data.byteLength > 0) {
        const blob = new Blob([response.data], { type: 'image/png' })
        const imageUrl = URL.createObjectURL(blob)
        setProcessedImageUrl(imageUrl)
      } else {
        throw new Error('No image data received from the server')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing the image')
      setProcessedImageUrl(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setFile(null)
    setPreviewUrl(null)
    setProcessedImageUrl(null)
    setError(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
      }
    } catch (err) {
      setError('Unable to access camera')
    }
  }

  const handleCameraSnapshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      canvas.getContext('2d')?.drawImage(videoRef.current, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], 'camera_snapshot.jpg', { type: 'image/jpeg' })
          handleFileSelection(file)
        }
      }, 'image/jpeg')
    }
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Image Detection</CardTitle>
            <div className="flex items-center space-x-2">
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="camera">Camera</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
                      isDragActive ? 'border-primary' : 'border-gray-300'
                    }`}
                  >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <p>Drop the image here ...</p>
                    ) : (
                      <p>Drag & drop an image here, or click to select one</p>
                    )}
                    <Upload className="mx-auto mt-2" />
                  </div>
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="flex space-x-2">
                    <Button type="submit" disabled={!file || isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Detecting...
                        </>
                      ) : (
                        'Detect'
                      )}
                    </Button>
                    <Button type="button" onClick={handleReset} variant="outline">
                      Reset
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="camera">
                <div className="space-y-4">
                  <video ref={videoRef} className="w-full rounded-lg" />
                  <div className="flex space-x-2">
                    <Button onClick={handleCameraCapture}>
                      <Camera className="mr-2 h-4 w-4" /> Start Camera
                    </Button>
                    <Button onClick={handleCameraSnapshot}>
                      <ImageIcon className="mr-2 h-4 w-4" /> Take Snapshot
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col items-start">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full"
                >
                  <Alert variant="destructive" className="mb-4">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>
            {isLoading && (
              <div className="w-full mb-4">
                <Progress value={progress} className="w-full" />
              </div>
            )}
            <AnimatePresence>
              {previewUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-4 w-full"
                >
                  <h2 className="text-xl font-semibold mb-2">Uploaded Image:</h2>
                  <img src={previewUrl} alt="Uploaded image" className="max-w-full h-auto rounded-lg shadow-lg" />
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {processedImageUrl && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="mb-4 w-full"
                >
                  <h2 className="text-xl font-semibold mb-2">Processed Image with Detections:</h2>
                  <img src={processedImageUrl} alt="Processed image" className="max-w-full h-auto rounded-lg shadow-lg" />
                </motion.div>
              )}
            </AnimatePresence>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default Photo
