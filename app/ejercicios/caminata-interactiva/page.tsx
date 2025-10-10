"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, Repeat, Award, CheckCircle } from "lucide-react"

// --- Exercise Parameters ---
const TOTAL_DURATION_MINUTES = 20
const TOTAL_DURATION_SECONDS = TOTAL_DURATION_MINUTES * 60
const MILESTONES = [
  { time: TOTAL_DURATION_SECONDS - 5 * 60, label: "5 min" },
  { time: TOTAL_DURATION_SECONDS - 10 * 60, label: "10 min" },
  { time: TOTAL_DURATION_SECONDS - 15 * 60, label: "15 min" },
]

type GameState = "idle" | "playing" | "paused" | "finished"

export default function CaminataGamePage() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [timeRemaining, setTimeRemaining] = useState(TOTAL_DURATION_SECONDS)
  const [reachedMilestones, setReachedMilestones] = useState<string[]>([])

  useEffect(() => {
    if (gameState !== "playing") return

    const interval = setInterval(() => {
      setTimeRemaining((t) => {
        if (t > 1) {
          const reached = MILESTONES.find((m) => m.time === t - 1)
          if (reached && !reachedMilestones.includes(reached.label)) {
            setReachedMilestones([...reachedMilestones, reached.label])
          }
          return t - 1
        } else {
          setGameState("finished")
          return 0
        }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState, reachedMilestones])

  const resetGame = () => {
    setGameState("idle")
    setTimeRemaining(TOTAL_DURATION_SECONDS)
    setReachedMilestones([])
  }

  const startGame = () => {
    resetGame()
    setGameState("playing")
  }

  const togglePause = () => {
    setGameState(gameState === "paused" ? "playing" : "paused")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0")
    const secs = (seconds % 60).toString().padStart(2, "0")
    return `${mins}:${secs}`
  }

  const renderContent = () => {
    switch (gameState) {
      case "finished":
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <Award className="w-24 h-24 text-green-400" />
            <h2 className="text-3xl font-bold mt-6">¡Caminata completada!</h2>
            <p className="text-muted-foreground mt-2">¡Excelente trabajo! Has completado {TOTAL_DURATION_MINUTES} minutos de ejercicio.</p>
            <Button onClick={resetGame} className="mt-8 rounded-full">
              <Repeat className="w-4 h-4 mr-2" />
              Comenzar de nuevo
            </Button>
          </div>
        )
      case "idle":
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold">Caminata Prenatal</h2>
            <p className="text-muted-foreground mt-2 mb-8 max-w-sm">
              Una sesión de caminata de {TOTAL_DURATION_MINUTES} minutos para mantenerte activa.
            </p>
            <Button onClick={startGame} size="lg" className="mt-8 rounded-full bg-green-400 hover:bg-green-400/90">
              <Play className="w-5 h-5 mr-2" />
              Comenzar Caminata
            </Button>
          </div>
        )
      default:
        // playing, paused
        return (
          <div className="flex flex-col items-center justify-between h-full">
            <div className="text-center">
              <p className="text-lg font-semibold text-muted-foreground">Tiempo Restante</p>
              <p className="text-8xl font-bold font-mono">{formatTime(timeRemaining)}</p>
            </div>

            <div className="w-full max-w-md">
                <p className="text-center font-semibold mb-4">Hitos</p>
                <div className="flex justify-between items-center">
                    {MILESTONES.map(m => (
                        <div key={m.label} className="flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${reachedMilestones.includes(m.label) ? 'bg-green-400' : 'bg-gray-200'}`}>
                                <CheckCircle className={`w-5 h-5 ${reachedMilestones.includes(m.label) ? 'text-white' : 'text-gray-400'}`} />
                            </div>
                            <span className="text-sm font-semibold">{m.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6">
              <Button onClick={togglePause} size="lg" variant="outline" className="rounded-full">
                {gameState === "paused" ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                {gameState === "paused" ? "Reanudar" : "Pausar"}
              </Button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen pb-8 bg-green-50/50">
      <header className="bg-transparent absolute top-0 left-0 w-full z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/ejercicios" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
        </div>
      </header>

      <main className="px-4 py-16 h-screen">
        <Card className="h-full border-2 shadow-xl bg-white">
          <CardContent className="h-full p-6">{renderContent()}</CardContent>
        </Card>
      </main>
    </div>
  )
}
