"use client";

import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Upload, Play, Pause, RotateCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Prediction {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
}

interface ApiResponse {
  frame: number;
  data: {
    predictions: Prediction[];
    image: {
      width: number;
      height: number;
    };
  };
}

export default function VideoFrameExtractor() {
  const [frames, setFrames] = useState<string[]>([]);
  const [apiResponses, setApiResponses] = useState<ApiResponse[]>([]);
  const [labeledFrames, setLabeledFrames] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [frameCount, setFrameCount] = useState(10);
  const [autoExtract, setAutoExtract] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith("video/")) {
      const video = videoRef.current;
      if (video) {
        video.src = URL.createObjectURL(file);
        video.onloadeddata = () => {
          setIsVideoLoaded(true);
          if (autoExtract) {
            extractFrames();
          }
        };
      }
    } else {
      setError("Please upload a valid video file.");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const extractFrames = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setIsProcessing(true);
    setFrames([]);
    setApiResponses([]);
    setLabeledFrames([]);
    setError(null);
    setProgress(0);

    const context = canvas.getContext("2d");
    if (!context) {
      setError("Unable to get canvas context");
      setIsProcessing(false);
      return;
    }

    const extractedFrames: string[] = [];

    const captureFrame = (currentFrame: number) => {
      return new Promise<void>((resolve) => {
        video.currentTime = (video.duration / frameCount) * currentFrame;
        video.onseeked = () => {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          extractedFrames.push(canvas.toDataURL("image/jpeg"));
          setProgress((currentFrame + 1) * (100 / frameCount));
          resolve();
        };
      });
    };

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      for (let i = 0; i < frameCount; i++) {
        await captureFrame(i);
      }

      setFrames(extractedFrames);
      await processFrames(extractedFrames);
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  const processFrames = async (frames: string[]) => {
    try {
      const responses = await Promise.all(
        frames.map((frame, index) =>
          axios.post("http://localhost:3001/process-frame", { frame, index })
        )
      );
      setApiResponses(responses.map((res) => res.data));
    } catch (err) {
      setError("Error processing frames");
    }
  };

  const renderPredictions = (frame: string, predictions: Prediction[], imageWidth: number, imageHeight: number): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        ctx!.strokeStyle = 'red';
        ctx!.lineWidth = 2;
        ctx!.font = '14px Arial';
        ctx!.fillStyle = 'red';

        predictions.forEach((pred) => {
          const x = (pred.x * img.width) / imageWidth;
          const y = (pred.y * img.height) / imageHeight;
          const width = (pred.width * img.width) / imageWidth;
          const height = (pred.height * img.height) / imageHeight;

          ctx?.strokeRect(x - width / 2, y - height / 2, width, height);
          ctx?.fillText(`${pred.class} (${(pred.confidence * 100).toFixed(2)}%)`, x - width / 2, y - height / 2 - 5);
        });

        resolve(canvas.toDataURL('image/jpeg'));
      };

      img.src = frame;
    });
  };

  useEffect(() => {
    const labelFrames = async () => {
      if (frames.length > 0 && apiResponses.length > 0) {
        const labeledFramesPromises = frames.map((frame, index) => {
          const response = apiResponses[index];
          if (response && response.data.predictions) {
            return renderPredictions(frame, response.data.predictions, response.data.image.width, response.data.image.height);
          }
          return Promise.resolve(frame);
        });

        const labeledFramesResult = await Promise.all(labeledFramesPromises);
        setLabeledFrames(labeledFramesResult);
      }
    };

    labelFrames();
  }, [frames, apiResponses]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && labeledFrames.length > 0) {
      interval = setInterval(() => {
        setCurrentFrame((prev) => (prev + 1) % labeledFrames.length);
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, labeledFrames]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Video Frame Extractor</CardTitle>
          <CardDescription>Upload a video and extract frames for analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div {...getRootProps()} className="mb-4">
            <input {...getInputProps()} />
            <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}>
              {isDragActive ? (
                <p>Drop the video file here ...</p>
              ) : (
                <p>Drag &apos;n&apos; drop a video file here, or click to select a file</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <Switch
              id="auto-extract"
              checked={autoExtract}
              onCheckedChange={setAutoExtract}
            />
            <Label htmlFor="auto-extract">Auto-extract frames on upload</Label>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <Label htmlFor="frame-count">Frame Count:</Label>
            <Slider
              id="frame-count"
              min={5}
              max={30}
              step={1}
              value={[frameCount]}
              onValueChange={(value) => setFrameCount(value[0])}
              className="w-[200px]"
            />
            <span>{frameCount}</span>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={extractFrames}
                  disabled={isProcessing || !isVideoLoaded}
                  className="w-full"
                >
                  {isProcessing ? <RotateCw className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                  {isProcessing ? "Processing..." : "Extract Frames"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Extract {frameCount} frames from the video</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {isProcessing && (
            <Progress value={progress} className="mt-4" />
          )}
        </CardContent>
      </Card>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <video ref={videoRef} className="hidden" />
      <canvas ref={canvasRef} className="hidden" />
      
      <AnimatePresence>
        {labeledFrames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Extracted Frames with Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="grid" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="grid">Grid View</TabsTrigger>
                    <TabsTrigger value="slideshow">Slideshow</TabsTrigger>
                  </TabsList>
                  <TabsContent value="grid">
                    <ScrollArea className="h-[600px]">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                        {labeledFrames.map((frame, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                          >
                            <Card>
                              <CardContent className="p-2">
                                <img
                                  src={frame}
                                  alt={`Frame ${index + 1}`}
                                  className="w-full h-auto rounded"
                                />
                                <p className="text-center mt-2 font-semibold">Frame {index + 1}</p>
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" className="w-full mt-2">View Predictions</Button>
                                  </DialogTrigger>
                                  <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                      <DialogTitle>Predictions for Frame {index + 1}</DialogTitle>
                                      <DialogDescription>Detailed analysis results</DialogDescription>
                                    </DialogHeader>
                                    <div className="mt-2 text-sm">
                                      <ScrollArea className="h-[200px]">
                                        <ul className="list-disc pl-5">
                                          {apiResponses[index]?.data.predictions.map((pred, predIndex) => (
                                            <li key={predIndex}>
                                              {pred.class}: {(pred.confidence * 100).toFixed(2)}%
                                            </li>
                                          ))}
                                        </ul>
                                      </ScrollArea>
                                    </div>
                                  </DialogContent>
                                </Dialog>
                              </CardContent>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  <TabsContent value="slideshow">
                    <div className="flex flex-col items-center">
                      <img
                        src={labeledFrames[currentFrame]}
                        alt={`Frame ${currentFrame + 1}`}
                        className="w-full max-w-xl h-auto rounded mb-4"
                      />
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Slider
                          min={0}
                          max={labeledFrames.length - 1}
                          step={1}
                          value={[currentFrame]}
                          onValueChange={(value) => setCurrentFrame(value[0])}
                          className="w-[200px]"
                        />
                        <span>{currentFrame + 1} / {labeledFrames.length}</span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
