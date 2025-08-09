"use client"

import { Component, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-8">
          <Card className="max-w-md w-full p-8 bg-white/10 border-white/20 text-white text-center">
            <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
            <h2 className="text-2xl font-light mb-4">something went wrong</h2>
            <p className="text-white/80 mb-6 text-sm">
              the threshold encountered an unexpected error. this space is designed to be resilient—
              let's try to restore it.
            </p>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-white/60 hover:text-white/80 mb-2">
                  error details
                </summary>
                <pre className="text-xs bg-black/40 p-3 rounded overflow-auto max-h-32">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => {
                  this.setState({ hasError: false, error: undefined })
                  window.location.reload()
                }}
                className="bg-white/20 hover:bg-white/30"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                try again
              </Button>
              
              <Link href="/">
                <Button className="bg-white/20 hover:bg-white/30">
                  <Home className="h-4 w-4 mr-2" />
                  return home
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
