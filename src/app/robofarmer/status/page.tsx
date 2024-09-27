"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Photo from '@/components/photo';
import VideoFrameExtractor from '@/components/VideoFrameExtractor';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Camera, Video, Sun, Moon } from "lucide-react";

function Monitoring() {
  const [activeTab, setActiveTab] = useState<string>('photo');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isAlertVisible, setIsAlertVisible] = useState<boolean>(true);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const dismissAlert = () => {
    setIsAlertVisible(false);
  };

  return (
    <div className={`min-h-screen rounded-md ${isDarkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-6xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-3xl font-bold">Monitoring Dashboard</CardTitle>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="dark-mode"
                        checked={isDarkMode}
                        onCheckedChange={toggleDarkMode}
                      />
                      <Label htmlFor="dark-mode">{isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {isDarkMode ? 'Light' : 'Dark'} Mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <CardDescription>Monitor and analyze images and videos</CardDescription>
          </CardHeader>
          <CardContent>
            <AnimatePresence>
              {isAlertVisible && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Welcome to the Monitoring Dashboard</AlertTitle>
                    <AlertDescription>
                      Use the tabs below to switch between Photo and Video Frame analysis.
                    </AlertDescription>
                    <Button variant="outline" size="sm" onClick={dismissAlert} className="mt-2">
                      Dismiss
                    </Button>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <Tabs defaultValue="photo" className="w-full" onValueChange={handleTabChange}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="photo">
                  <Camera className="mr-2 h-4 w-4" />
                  Photo Analysis
                </TabsTrigger>
                <TabsTrigger value="video">
                  <Video className="mr-2 h-4 w-4" />
                  Video Frame Analysis
                </TabsTrigger>
              </TabsList>
              <TabsContent value="photo">
                <Card>
                  <CardHeader>
                    <CardTitle>Photo Analysis</CardTitle>
                    <CardDescription>Upload and analyze images</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <Photo />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="video">
                <Card>
                  <CardHeader>
                    <CardTitle>Video Frame Analysis</CardTitle>
                    <CardDescription>Extract and analyze video frames</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[600px]">
                      <VideoFrameExtractor />
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Badge variant="outline">
              Active Module: {activeTab === 'photo' ? 'Photo Analysis' : 'Video Frame Analysis'}
            </Badge>
            <Button variant="link">View Documentation</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Monitoring;