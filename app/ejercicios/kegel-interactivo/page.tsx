"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Play, Pause, Repeat, Award } from "lucide-react"
import { cn } from "@/lib/utils"

// --- Exercise Parameters ---
const HOLD_DURATION = 5 // seconds
const RELAX_DURATION = 5 // seconds
const REPS_PER_SET = 10
const SETS_TOTAL = 3
const BREAK_DURATION = 15 // seconds

type GameState = "idle" | "playing" | "paused" | "break" | "finished"

export default function KegelGamePage() {
  const [gameState, setGameState] = useState<GameState>("idle")
  const [phase, setPhase] = useState<"contract" | "relax">("contract")
  const [reps, setReps] = useState(0)
  const [sets, setSets] = useState(0)
  const [timer, setTimer] = useState(HOLD_DURATION)

  useEffect(() => {
    if (gameState !== "playing" && gameState !== "break") return

    const interval = setInterval(() => {
      setTimer((t) => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState])

  const handleNextPhase = useCallback(() => {
    if (gameState === "break") {
      setGameState("playing")
      setPhase("contract")
      setTimer(HOLD_DURATION)
      return
    }

    if (phase === "contract") {
      setPhase("relax")
      setTimer(RELAX_DURATION)
    } else {
      // End of a rep
      if (reps + 1 < REPS_PER_SET) {
        setReps(reps + 1)
        setPhase("contract")
        setTimer(HOLD_DURATION)
      } else {
        // End of a set
        if (sets + 1 < SETS_TOTAL) {
          setSets(sets + 1)
          setReps(0)
          setGameState("break")
          setTimer(BREAK_DURATION)
        } else {
          setGameState("finished")
        }
      }
    }
  }, [reps, sets, phase, gameState])

  useEffect(() => {
    if (timer === 0) {
      handleNextPhase()
    }
  }, [timer, handleNextPhase])

  const resetGame = () => {
    setGameState("idle")
    setPhase("contract")
    setReps(0)
    setSets(0)
    setTimer(HOLD_DURATION)
  }

  const startGame = () => {
    resetGame()
    setGameState("playing")
  }

  const togglePause = () => {
    setGameState(gameState === "paused" ? "playing" : "paused")
  }

  const getPhaseImage = () => {
    if (gameState === "break") {
      return  "/kegel_relaja.png"
    }
    return phase === "contract"
      ? "/kegel_contrae.png"
      : "/kegel_relaja.png"
  }

  const renderContent = () => {
    switch (gameState) {
      case "finished":
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <Award className="w-24 h-24 text-[#d7e874]" />
            <h2 className="text-3xl font-bold mt-6">¡Felicidades!</h2>
            <p className="text-muted-foreground mt-2">Has completado la rutina de Kegel.</p>
            <Button onClick={resetGame} className="mt-8 rounded-full">
              <Repeat className="w-4 h-4 mr-2" />
              Hacer de nuevo
            </Button>
          </div>
        )
      case "idle":
        return (
          <div className="text-center flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold">Ejercicios de Kegel</h2>
            <p className="text-muted-foreground mt-2 mb-8 max-w-sm">
              Fortalece tu suelo pélvico con esta rutina guiada.
            </p>
            <p className="font-bold">{SETS_TOTAL} series • {REPS_PER_SET} repeticiones</p>
            <Button onClick={startGame} size="lg" className="mt-8 rounded-full">
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
                {gameState === "break" ? "Descanso" : phase === "contract" ? "Contrae" : "Relaja"}
              </p>
              <p className="text-8xl font-bold">{timer}</p>
            </div>

            <div className="relative w-full max-w-sm aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-100">
              <img
                key={phase + sets + reps} // Force re-render to restart animation
                src={getPhaseImage()}
                alt={`Fase actual: ${phase}`}
                className="w-full h-full object-cover animate-fade-in"
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
        <Card className="h-full border-2 shadow-xl">
          <CardContent className="h-full p-6">{renderContent()}</CardContent>
        </Card>
      </main>
    </div>
  )
}
