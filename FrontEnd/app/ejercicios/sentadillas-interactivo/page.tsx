"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, Repeat, Award } from "lucide-react"

// --- Exercise Parameters ---
const REPS_PER_SET = 12
const SETS_TOTAL = 3
const POSE_DURATION = 3 // seconds per position (down and up)
const SET_BREAK_DURATION = 20 // seconds

type GameState = "idle" | "playing" | "paused" | "break" | "finished"
type Position = "down" | "up"

export default function SentadillasGamePage() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [position, setPosition] = useState<Position>("down")
  const [reps, setReps] = useState(0)
  const [sets, setSets] = useState(0)
  const [timer, setTimer] = useState(POSE_DURATION)

  const handleNextPhase = useCallback(() => {
    if (gameState === "break") {
      setGameState("playing")
      setPosition("down")
      setTimer(POSE_DURATION)
      return
    }

    if (position === "down") {
      setPosition("up")
      setTimer(POSE_DURATION)
    } else {
      // End of a rep
      if (reps + 1 < REPS_PER_SET) {
        setReps(reps + 1)
        setPosition("down")
        setTimer(POSE_DURATION)
      } else {
        // End of a set
        if (sets + 1 < SETS_TOTAL) {
          setSets(sets + 1)
          setReps(0)
          setGameState("break")
          setTimer(SET_BREAK_DURATION)
        } else {
          setGameState("finished")
        }
      }
    }
  }, [reps, sets, position, gameState])

  useEffect(() => {
    if (gameState !== "playing" && gameState !== "break") return

    const interval = setInterval(() => {
      setTimer((t) => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState])

  useEffect(() => {
    if (timer <= 0) {
      handleNextPhase()
    }
  }, [timer, handleNextPhase])

  const resetGame = () => {
    setGameState("idle")
    setPosition("down")
    setReps(0)
    setSets(0)
    setTimer(POSE_DURATION)
  }

  const startGame = () => {
    resetGame()
    setGameState("playing")
  }

  const togglePause = () => {
    setGameState(gameState === "paused" ? (timer > 0 ? gameState : "playing") : "paused")
  }

  const getPhaseImage = () => {
    return position === "down"
      ? "/sentadilla_agachada.png"
      : "/sentadilla_de_pie.png"
  }

  const renderContent = () => {
    switch (gameState) {
      case "finished":
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <Award className="w-24 h-24 text-[#ffb3a3]" />
            <h2 className="text-3xl font-bold mt-6">¡Rutina completada!</h2>
            <p className="text-muted-foreground mt-2">Has completado las sentadillas prenatales.</p>
            <Button onClick={resetGame} className="mt-8 rounded-full">
              <Repeat className="w-4 h-4 mr-2" />
              Repetir
            </Button>
          </div>
        )
      case "idle":
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold">Sentadillas Prenatales</h2>
            <p className="text-muted-foreground mt-2 mb-8 max-w-sm">
              Fortalece tus piernas y prepárate para el parto con esta rutina guiada.
            </p>
            <p className="font-bold">{SETS_TOTAL} series • {REPS_PER_SET} repeticiones</p>
            <Button onClick={startGame} size="lg" className="mt-8 rounded-full bg-[#ffb3a3] hover:bg-[#ffb3a3]/90">
              <Play className="w-5 h-5 mr-2" />
              Comenzar
            </Button>
          </div>
        )
      default:
        // playing, paused, break
        return (
          <div className="flex flex-col items-center justify-between h-full">
            <div className="text-center">
              <p className="text-lg font-semibold text-muted-foreground">
                {gameState === "break"
                  ? "Descanso entre series"
                  : position === "down"
                    ? "Baja Lentamente"
                    : "Sube Lentamente"}
              </p>
              <p className="text-8xl font-bold">{timer}</p>
            </div>

            <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <img
                key={position + sets + reps}
                src={getPhaseImage()}
                alt={`Posición actual: ${position}`}
                className="w-full h-full object-contain animate-fade-in"
              />
            </div>

            <div className="w-full text-center">
              <p className="font-semibold">
                Serie {sets + 1} / {SETS_TOTAL} • Repetición {reps + 1} / {REPS_PER_SET}
              </p>
              <div className="mt-6">
                <Button onClick={togglePause} size="lg" variant="outline" className="rounded-full">
                  {gameState === "paused" ? <Play className="w-5 h-5 mr-2" /> : <Pause className="w-5 h-5 mr-2" />}
                  {gameState === "paused" ? "Reanudar" : "Pausar"}
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen pb-8">
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
