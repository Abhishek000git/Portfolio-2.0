"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Play, Square, Copy, Check, RotateCcw, Maximize2, Minimize2, Wifi, WifiOff, AlertCircle } from "lucide-react"

interface CodeExecutorProps {
  language: string
  initialCode: string
  title: string
  description: string
  color: string
}

// Updated language mappings for Judge0 CE API
const LANGUAGE_CONFIG = {
  javascript: { id: 63, name: "JavaScript (Node.js 12.14.0)" },
  python: { id: 71, name: "Python (3.8.1)" },
  cpp: { id: 54, name: "C++ (GCC 9.2.0)" },
  c: { id: 50, name: "C (GCC 9.2.0)" },
  java: { id: 62, name: "Java (OpenJDK 13.0.1)" },
  go: { id: 60, name: "Go (1.13.5)" },
  rust: { id: 73, name: "Rust (1.40.0)" },
  php: { id: 68, name: "PHP (7.4.1)" },
  ruby: { id: 72, name: "Ruby (2.7.0)" },
  csharp: { id: 51, name: "C# (Mono 6.6.0.161)" },
}

interface ExecutionResult {
  success: boolean
  output: string
  error?: string
  time?: string
  memory?: string
  status?: string
}

export function CodeExecutor({ language, initialCode, title, description, color }: CodeExecutorProps) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [executionStats, setExecutionStats] = useState<{ time?: string; memory?: string; status?: string }>({})
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    setCode(initialCode)
    setOutput("")
    setExecutionStats({})
    setApiError(null)
  }, [initialCode])

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Execute JavaScript locally in the browser
  const executeJavaScriptLocally = (code: string): ExecutionResult => {
    const logs: string[] = []
    const errors: string[] = []
    const startTime = performance.now()

    const customConsole = {
      log: (...args: any[]) => {
        logs.push(
          args
            .map((arg) => {
              if (typeof arg === "object" && arg !== null) {
                try {
                  return JSON.stringify(arg, null, 2)
                } catch {
                  return String(arg)
                }
              }
              return String(arg)
            })
            .join(" "),
        )
      },
      error: (...args: any[]) => {
        errors.push("❌ " + args.map((arg) => String(arg)).join(" "))
      },
      warn: (...args: any[]) => {
        logs.push("⚠️ " + args.map((arg) => String(arg)).join(" "))
      },
      info: (...args: any[]) => {
        logs.push("ℹ️ " + args.map((arg) => String(arg)).join(" "))
      },
    }

    try {
      const safeGlobals = {
        console: customConsole,
        Math,
        Date,
        JSON,
        parseInt,
        parseFloat,
        isNaN,
        isFinite,
        encodeURIComponent,
        decodeURIComponent,
        setTimeout: (fn: Function, delay: number) => {
          if (delay > 5000) throw new Error("Timeout too long (max 5 seconds)")
          return setTimeout(fn, delay)
        },
        clearTimeout,
      }

      const executeCode = new Function(
        ...Object.keys(safeGlobals),
        `
        "use strict";
        ${code}
        `,
      )

      executeCode(...Object.values(safeGlobals))

      const endTime = performance.now()
      const executionTime = `${(endTime - startTime).toFixed(2)}ms`

      if (errors.length > 0) {
        return {
          success: false,
          output: errors.join("\n"),
          error: "Runtime errors occurred",
          time: executionTime,
          status: "Runtime Error",
        }
      }

      return {
        success: true,
        output: logs.length > 0 ? logs.join("\n") : "✅ Code executed successfully (no console output)",
        time: executionTime,
        status: "Completed",
      }
    } catch (error) {
      const endTime = performance.now()
      const executionTime = `${(endTime - startTime).toFixed(2)}ms`

      return {
        success: false,
        output: `❌ ${error instanceof Error ? error.message : String(error)}`,
        error: "Execution failed",
        time: executionTime,
        status: "Error",
      }
    }
  }

  // Execute code using Judge0 API with improved error handling
  const executeWithJudge0 = async (code: string, languageId: number): Promise<ExecutionResult> => {
    const apiKey = process.env.NEXT_PUBLIC_JUDGE0_API_KEY

    if (!apiKey || apiKey === "demo-key") {
      return {
        success: false,
        output: "❌ API Configuration Error\nJudge0 API key not configured properly.",
        error: "API key missing",
        status: "Configuration Error",
      }
    }

    try {
      // Submit code for execution
      const submitResponse = await fetch("https://judge0-ce.p.rapidapi.com/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify({
          language_id: languageId,
          source_code: code,
          stdin: "",
        }),
      })

      if (!submitResponse.ok) {
        const errorText = await submitResponse.text()
        throw new Error(`API Error ${submitResponse.status}: ${errorText}`)
      }

      const submitResult = await submitResponse.json()
      const token = submitResult.token

      if (!token) {
        throw new Error("No execution token received from API")
      }

      // Poll for results with timeout
      let attempts = 0
      const maxAttempts = 30 // 30 seconds timeout

      while (attempts < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait 1 second
        attempts++

        const resultResponse = await fetch(`https://judge0-ce.p.rapidapi.com/submissions/${token}`, {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": apiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        })

        if (!resultResponse.ok) {
          throw new Error(`Result fetch error: ${resultResponse.status}`)
        }

        const result = await resultResponse.json()

        // Check if execution is complete
        if (result.status && result.status.id > 2) {
          const statusId = result.status.id
          const statusDescription = result.status.description

          // Status codes: 1=In Queue, 2=Processing, 3=Accepted, 4=Wrong Answer, 5=Time Limit Exceeded, 6=Compilation Error, etc.

          if (statusId === 3) {
            // Accepted - successful execution
            return {
              success: true,
              output: result.stdout || "✅ Code executed successfully (no output)",
              time: result.time ? `${(Number.parseFloat(result.time) * 1000).toFixed(2)}ms` : undefined,
              memory: result.memory ? `${result.memory} KB` : undefined,
              status: statusDescription,
            }
          } else if (statusId === 6) {
            // Compilation Error
            return {
              success: false,
              output: `❌ Compilation Error:\n${result.compile_output || "Unknown compilation error"}`,
              error: "Compilation failed",
              status: statusDescription,
            }
          } else if (statusId === 5) {
            // Time Limit Exceeded
            return {
              success: false,
              output: "❌ Time Limit Exceeded\nYour code took too long to execute (max 10 seconds).",
              error: "Timeout",
              status: statusDescription,
            }
          } else if (statusId === 4) {
            // Runtime Error
            return {
              success: false,
              output: `❌ Runtime Error:\n${result.stderr || "Unknown runtime error"}`,
              error: "Runtime error",
              status: statusDescription,
            }
          } else if (statusId === 7) {
            // Memory Limit Exceeded
            return {
              success: false,
              output: "❌ Memory Limit Exceeded\nYour code used too much memory.",
              error: "Memory limit exceeded",
              status: statusDescription,
            }
          } else if (statusId === 8) {
            // Output Limit Exceeded
            return {
              success: false,
              output: "❌ Output Limit Exceeded\nYour code produced too much output.",
              error: "Output limit exceeded",
              status: statusDescription,
            }
          } else {
            // Other errors
            return {
              success: false,
              output: `❌ Execution Error (${statusDescription}):\n${result.stderr || result.compile_output || "Unknown error"}`,
              error: "Execution failed",
              status: statusDescription,
            }
          }
        }
      }

      // Timeout waiting for results
      return {
        success: false,
        output: "❌ Execution Timeout\nThe code execution service took too long to respond.",
        error: "Service timeout",
        status: "Timeout",
      }
    } catch (error) {
      console.error("Judge0 API Error:", error)

      let errorMessage = "Failed to execute code"
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch")) {
          errorMessage = "Network error - please check your internet connection"
        } else if (error.message.includes("API Error 429")) {
          errorMessage = "Rate limit exceeded - please wait a moment and try again"
        } else if (error.message.includes("API Error 401")) {
          errorMessage = "API authentication failed - please contact support"
        } else {
          errorMessage = error.message
        }
      }

      return {
        success: false,
        output: `❌ API Error:\n${errorMessage}`,
        error: "API connection failed",
        status: "API Error",
      }
    }
  }

  // Enhanced fallback simulation
  const simulateExecution = (code: string, language: string): ExecutionResult => {
    const lang = language.toLowerCase()

    if (lang === "python") {
      const lines = code.split("\n").filter((line) => line.trim())
      const outputs: string[] = []

      for (const line of lines) {
        const trimmedLine = line.trim()

        // Handle print statements
        const printMatch = trimmedLine.match(/print\s*$$\s*(.+?)\s*$$/)
        if (printMatch) {
          let content = printMatch[1]

          // Handle f-strings
          if (content.startsWith('f"') || content.startsWith("f'")) {
            content = content.slice(2, -1)
            outputs.push(content.replace(/\{[^}]*\}/g, "[expression]"))
          } else if (content.startsWith('"') || content.startsWith("'")) {
            content = content.slice(1, -1)
            outputs.push(content)
          } else {
            outputs.push(content)
          }
        }
      }

      return {
        success: true,
        output:
          outputs.length > 0
            ? `🐍 Python Simulation:\n${outputs.join("\n")}\n\n⚠️ Limited simulation - connect to internet for full execution`
            : "🐍 Python code simulated (no print statements found)\n⚠️ Connect to internet for full execution capabilities",
        status: "Simulated",
      }
    } else if (lang === "cpp" || lang === "c++") {
      const lines = code.split("\n").filter((line) => line.trim())
      const outputs: string[] = []

      for (const line of lines) {
        const trimmedLine = line.trim()

        // Handle cout statements
        const coutMatch = trimmedLine.match(/std::cout\s*<<\s*(.+?)\s*;/)
        if (coutMatch) {
          const content = coutMatch[1]

          if (content.includes('"')) {
            const stringMatches = content.match(/"([^"]*)"/g)
            if (stringMatches) {
              stringMatches.forEach((str) => {
                outputs.push(str.slice(1, -1))
              })
            }
          }
        }
      }

      return {
        success: true,
        output:
          outputs.length > 0
            ? `⚡ C++ Simulation:\n${outputs.join("\n")}\n\n⚠️ Limited simulation - connect to internet for full compilation and execution`
            : "⚡ C++ code simulated (no cout statements found)\n⚠️ Connect to internet for full compilation capabilities",
        status: "Simulated",
      }
    }

    return {
      success: true,
      output: `✅ ${language} simulation (limited functionality)\n⚠️ Connect to internet for full execution capabilities`,
      status: "Simulated",
    }
  }

  const executeCode = async () => {
    setIsRunning(true)
    setOutput("🚀 Executing code...")
    setExecutionStats({})
    setApiError(null)

    try {
      let result: ExecutionResult
      const lang = language.toLowerCase()

      if (lang === "javascript") {
        // Execute JavaScript locally
        result = executeJavaScriptLocally(code)
      } else if (isOnline && LANGUAGE_CONFIG[lang as keyof typeof LANGUAGE_CONFIG]) {
        // Use Judge0 API for other languages
        const languageConfig = LANGUAGE_CONFIG[lang as keyof typeof LANGUAGE_CONFIG]
        result = await executeWithJudge0(code, languageConfig.id)

        if (!result.success && result.error === "API connection failed") {
          setApiError("API connection failed - falling back to simulation")
          result = simulateExecution(code, language)
        }
      } else {
        // Fallback to simulation
        result = simulateExecution(code, language)
      }

      setOutput(result.output)
      setExecutionStats({
        time: result.time,
        memory: result.memory,
        status: result.status,
      })
    } catch (error) {
      setOutput(`❌ Unexpected Error:\n${error instanceof Error ? error.message : "Unknown error occurred"}`)
      setExecutionStats({ status: "Error" })
    } finally {
      setIsRunning(false)
    }
  }

  const stopExecution = () => {
    setIsRunning(false)
    setOutput("⏹️ Execution stopped by user")
    setExecutionStats({ status: "Stopped" })
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy code:", error)
    }
  }

  const resetCode = () => {
    setCode(initialCode)
    setOutput("")
    setExecutionStats({})
    setApiError(null)
  }

  const currentLanguageConfig = LANGUAGE_CONFIG[language.toLowerCase() as keyof typeof LANGUAGE_CONFIG]

  return (
    <Card
      className={`bg-gradient-to-br from-background to-background/50 border-cyan-500/20 ${
        isExpanded ? "fixed inset-2 sm:inset-4 z-50 max-h-screen overflow-hidden" : ""
      }`}
    >
      <CardHeader className="border-b border-cyan-500/20 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="min-w-0 flex-1">
            <CardTitle className="flex flex-wrap items-center gap-2 text-sm sm:text-base">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
              <span className="truncate">{title}</span>
              <Badge variant="secondary" className="bg-cyan-500/10 text-cyan-500 text-xs">
                {currentLanguageConfig ? currentLanguageConfig.name : language}
              </Badge>
              {language.toLowerCase() === "javascript" ? (
                <Badge variant="outline" className="text-green-500 border-green-500/50 text-xs">
                  Local
                </Badge>
              ) : isOnline ? (
                <Badge variant="outline" className="text-blue-500 border-blue-500/50 text-xs hidden sm:inline-flex">
                  <Wifi className="h-3 w-3 mr-1" />
                  Judge0 API
                </Badge>
              ) : (
                <Badge variant="outline" className="text-yellow-500 border-yellow-500/50 text-xs hidden sm:inline-flex">
                  <WifiOff className="h-3 w-3 mr-1" />
                  Offline
                </Badge>
              )}
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={copyCode}
              className="border-cyan-500/50 h-8 w-8 p-0 sm:w-auto sm:px-3"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span className="hidden sm:inline ml-2">Copy</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={resetCode}
              className="border-cyan-500/50 h-8 w-8 p-0 sm:w-auto sm:px-3"
            >
              <RotateCcw className="h-3 w-3" />
              <span className="hidden sm:inline ml-2">Reset</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="border-cyan-500/50 h-8 w-8 p-0 sm:w-auto sm:px-3"
            >
              {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
              <span className="hidden sm:inline ml-2">{isExpanded ? "Minimize" : "Expand"}</span>
            </Button>
            {isRunning ? (
              <Button onClick={stopExecution} variant="destructive" size="sm" className="h-8">
                <Square className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Stop</span>
              </Button>
            ) : (
              <Button onClick={executeCode} className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-8" size="sm">
                <Play className="h-3 w-3 mr-1" />
                <span className="hidden sm:inline">Run</span>
              </Button>
            )}
          </div>
        </div>

        {/* Execution Stats */}
        {(executionStats.time || executionStats.memory || executionStats.status) && (
          <div className="flex flex-wrap gap-2 sm:gap-4 text-xs text-muted-foreground mt-2">
            {executionStats.status && (
              <span
                className={`${
                  executionStats.status === "Completed"
                    ? "text-green-500"
                    : executionStats.status === "Error"
                      ? "text-red-500"
                      : "text-yellow-500"
                }`}
              >
                📊 Status: {executionStats.status}
              </span>
            )}
            {executionStats.time && <span>⏱️ Time: {executionStats.time}</span>}
            {executionStats.memory && <span>💾 Memory: {executionStats.memory}</span>}
          </div>
        )}

        {/* API Error Alert */}
        {apiError && (
          <Alert className="mt-3 border-yellow-500/20 bg-yellow-500/10">
            <AlertCircle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-700 dark:text-yellow-400 text-sm">{apiError}</AlertDescription>
          </Alert>
        )}

        {/* Offline Alert */}
        {!isOnline && language.toLowerCase() !== "javascript" && (
          <Alert className="mt-3 border-yellow-500/20 bg-yellow-500/10">
            <WifiOff className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-700 dark:text-yellow-400 text-sm">
              Limited functionality: Connect to internet for full {language} execution capabilities.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>

      <CardContent className="p-0">
        <div className={`${isExpanded ? "flex flex-col h-[calc(100vh-200px)]" : "grid grid-cols-1 lg:grid-cols-2"}`}>
          {/* Code Editor */}
          <div className={`relative ${isExpanded ? "flex-1 min-h-0" : ""}`}>
            <div className="bg-slate-900 text-slate-100 p-3 sm:p-4 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                <div className="flex gap-1">
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="hidden sm:inline">Live Code Editor</span>
                <div className="ml-auto flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? "bg-green-400" : "bg-yellow-400"}`}></div>
                  <span className="hidden sm:inline">{isOnline ? "Online" : "Offline"}</span>
                </div>
              </div>
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className={`bg-transparent border-none text-slate-100 font-mono text-xs sm:text-sm resize-none focus:ring-0 focus:outline-none flex-1 ${
                  isExpanded ? "min-h-0" : "min-h-[200px] sm:min-h-[300px]"
                }`}
                placeholder="Write your code here..."
                style={{ fontFamily: "Consolas, Monaco, 'Courier New', monospace" }}
              />
            </div>
          </div>

          {/* Output Console */}
          <div
            className={`border-t lg:border-t-0 lg:border-l border-cyan-500/20 ${isExpanded ? "flex-1 min-h-0" : ""}`}
          >
            <div className="bg-slate-800 text-green-400 p-3 sm:p-4 h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3 text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="hidden sm:inline">Console Output</span>
                {language.toLowerCase() === "javascript" && (
                  <Badge variant="outline" className="text-green-400 border-green-400/50 text-xs hidden sm:inline-flex">
                    Real Execution
                  </Badge>
                )}
                {currentLanguageConfig && language.toLowerCase() !== "javascript" && isOnline && (
                  <Badge variant="outline" className="text-blue-400 border-blue-400/50 text-xs hidden sm:inline-flex">
                    Judge0 API
                  </Badge>
                )}
              </div>
              <div
                className={`font-mono text-xs sm:text-sm whitespace-pre-wrap overflow-auto flex-1 ${
                  isExpanded ? "min-h-0" : "min-h-[200px] sm:min-h-[300px]"
                }`}
              >
                {isRunning ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                    Executing code...
                  </div>
                ) : output ? (
                  output
                ) : (
                  <span className="text-slate-500">Click 'Run' to execute your code...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
