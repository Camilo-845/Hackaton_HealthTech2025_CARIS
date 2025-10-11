"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Activity, Clock, AlertCircle, Play, ArrowDownUp, Timer } from "lucide-react"
import { ejerciciosFisicos } from "@/lib/data/ejercicios-data"
import type { Ejercicio, User } from "@/lib/types"

export default function EjerciciosFisicosPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
  }, [router])

  const ejerciciosOrdenados = [...ejerciciosFisicos].sort((a, b) => a.semanaRecomendada - b.semanaRecomendada)

  const isRecomendado = (ejercicio: Ejercicio) => {
    if (!user) return false
    return user.semanaGestacion >= ejercicio.semanaRecomendada
  }

  const getDificultadColor = (dificultad?: string) => {
    switch (dificultad) {
      case "baja":
        return "bg-[#aeebb8]"
      case "media":
        return "bg-[#ffec61]"
      case "alta":
        return "bg-[#ffb3a3]"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Ejercicios Físicos</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-2 bg-gradient-to-br from-[#d7e874]/20 to-[#ffec61]/20">
          <CardContent className="p-4 flex gap-3">
            <Activity className="w-6 h-6 text-[#d7e874] flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Mantente activa y saludable</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ejercicios seguros diseñados para cada etapa del embarazo. Consulta con tu médico antes de comenzar.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Warning Card */}
        <Card className="border-2 border-[#ffb3a3] bg-[#ffb3a3]/10">
          <CardContent className="p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#ffb3a3] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Importante</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Detén cualquier ejercicio si sientes dolor, mareos, sangrado o contracciones. Consulta a tu médico
                inmediatamente.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">Sesiones Interactivas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/ejercicios/kegel-interactivo">
              <Card className="border-2 border-dashed border-[#d7e874] bg-gradient-to-br from-[#d7e874]/10 to-[#ffec61]/10 cursor-pointer hover:shadow-xl transition-all h-full">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#d7e874]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Play className="w-8 h-8 text-[#d7e874]" />
                  </div>
                  <h3 className="font-bold text-lg mt-3">Kegel Interactivo</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sesión guiada para fortalecer tu suelo pélvico.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/ejercicios/sentadillas-interactivo">
              <Card className="border-2 border-dashed border-[#ffb3a3] bg-gradient-to-br from-[#ffb3a3]/10 to-[#ffec61]/10 cursor-pointer hover:shadow-xl transition-all h-full">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-[#ffb3a3]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ArrowDownUp className="w-8 h-8 text-[#ffb3a3]" />
                  </div>
                  <h3 className="font-bold text-lg mt-3">Sentadillas Interactivas</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Fortalece tus piernas con esta rutina de series y repeticiones.
                  </p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/ejercicios/caminata-interactiva">
              <Card className="border-2 border-dashed border-green-300 bg-gradient-to-br from-green-300/10 to-lime-300/10 cursor-pointer hover:shadow-xl transition-all h-full">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-green-300/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Timer className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="font-bold text-lg mt-3">Caminata Prenatal</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Una sesión de 20 minutos con hitos para mantenerte motivada.
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Rutinas de Ejercicio</h2>
          {ejerciciosOrdenados.map((ejercicio) => {
            const recomendado = isRecomendado(ejercicio)

            return (
              <Link key={ejercicio.id} href={`/ejercicios/${ejercicio.id}`}>
                <Card
                  className={`border-2 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] ${
                    !recomendado ? "opacity-60" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 ${getDificultadColor(
                          ejercicio.dificultad,
                        )}/20 rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        <Activity
                          className={`w-6 h-6 text-${getDificultadColor(ejercicio.dificultad).replace("bg-", "")}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-sm leading-tight overflow-hidden text-ellipsis whitespace-nowrap">{ejercicio.nombre}</h3>
                          <div className="flex gap-1 flex-shrink-0">
                            {recomendado && (
                              <Badge variant="secondary" className="bg-[#aeebb8]/20 text-foreground text-xs">
                                Recomendado
                              </Badge>
                            )}
                            {ejercicio.dificultad && (
                              <Badge
                                variant="secondary"
                                className={`${getDificultadColor(ejercicio.dificultad)}/20 text-foreground text-xs`}
                              >
                                {ejercicio.dificultad}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{ejercicio.descripcion}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{ejercicio.duracion}</span>
                          </div>
                          {ejercicio.repeticiones && (
                            <>
                              <span>•</span>
                              <span>{ejercicio.repeticiones}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>Semana {ejercicio.semanaRecomendada}+</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
