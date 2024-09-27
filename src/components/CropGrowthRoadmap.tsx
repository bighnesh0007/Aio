'use client'

import { CardHeader, CardContent, CardTitle, CardDescription, Card } from "@/components/ui/card"
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from '@mui/lab'

export default function CropGrowthRoadmap() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Crop Growth Roadmap</CardTitle>
        <CardDescription>Track your crop&apos;s journey from seed to harvest</CardDescription>
      </CardHeader>
      <CardContent>
        <Timeline position="alternate">
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className="font-bold">Seed Germination</h3>
              <p>Day 1-7</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className="font-bold">Seedling Stage</h3>
              <p>Day 8-21</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className="font-bold">Vegetative Stage</h3>
              <p>Day 22-50</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className="font-bold">Flowering Stage</h3>
              <p>Day 51-80</p>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot color="primary" />
            </TimelineSeparator>
            <TimelineContent>
              <h3 className="font-bold">Harvest Stage</h3>
              <p>Day 81+</p>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </CardContent>
    </Card>
  )
}