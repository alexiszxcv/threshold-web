"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock, Database, Zap } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  apiResponseTime: number
  dbConnectionTime: number
  memoryUsage: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    apiResponseTime: 0,
    dbConnectionTime: 0,
    memoryUsage: 0
  })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Measure page load time
    const loadTime = performance.now()
    
    // Test API response time
    const testApiResponse = async () => {
      const startTime = performance.now()
      try {
        await fetch('/api/health')
        const endTime = performance.now()
        return endTime - startTime
      } catch (error) {
        return -1
      }
    }

    // Get memory usage (if available)
    const getMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        return Math.round(memory.usedJSHeapSize / 1024 / 1024)
      }
      return 0
    }

    const gatherMetrics = async () => {
      const apiTime = await testApiResponse()
      
      setMetrics({
        loadTime: Math.round(loadTime),
        apiResponseTime: Math.round(apiTime),
        dbConnectionTime: apiTime > 0 ? Math.round(apiTime * 0.7) : -1, // Estimate
        memoryUsage: getMemoryUsage()
      })
    }

    gatherMetrics()

    // Show metrics in development or with special key combination
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        setIsVisible(!isVisible)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isVisible])

  if (!isVisible && process.env.NODE_ENV !== 'development') {
    return null
  }

  const getStatusColor = (value: number, thresholds: [number, number]) => {
    if (value < 0) return "bg-gray-600"
    if (value < thresholds[0]) return "bg-green-600"
    if (value < thresholds[1]) return "bg-yellow-600"
    return "bg-red-600"
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-4 bg-black/90 border-white/20 text-white min-w-[280px]">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-green-400" />
          <span className="text-sm font-medium">Performance Monitor</span>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-auto text-white/60 hover:text-white/80 text-xs"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-3 w-3" />
              <span>Page Load</span>
            </div>
            <Badge className={getStatusColor(metrics.loadTime, [1000, 3000])}>
              {metrics.loadTime}ms
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3" />
              <span>API Response</span>
            </div>
            <Badge className={getStatusColor(metrics.apiResponseTime, [200, 1000])}>
              {metrics.apiResponseTime < 0 ? 'Error' : `${metrics.apiResponseTime}ms`}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Database className="h-3 w-3" />
              <span>DB Connect</span>
            </div>
            <Badge className={getStatusColor(metrics.dbConnectionTime, [150, 800])}>
              {metrics.dbConnectionTime < 0 ? 'N/A' : `${metrics.dbConnectionTime}ms`}
            </Badge>
          </div>
          
          {metrics.memoryUsage > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3" />
                <span>Memory</span>
              </div>
              <Badge className={getStatusColor(metrics.memoryUsage, [50, 100])}>
                {metrics.memoryUsage}MB
              </Badge>
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-2 border-t border-white/20 text-[10px] text-white/60">
          Ctrl+Shift+P to toggle
        </div>
      </Card>
    </div>
  )
}

export default PerformanceMonitor
