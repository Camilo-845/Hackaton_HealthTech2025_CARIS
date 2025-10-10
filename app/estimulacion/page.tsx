"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Baby, Clock, CheckCircle2 } from "lucide-react"
import { ejerciciosEstimulacion } from "@/lib/data/ejercicios-data"
import type { Ejercicio, User } from "@/lib/types"

export default function EstimulacionPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [completados, setCompletados] = useState<string[]>([])

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    const savedCompletados = localStorage.getItem("ejercicios_completados")
    if (savedCompletados) {
      setCompletados(JSON.parse(savedCompletados))
    }
  }, [router])

  const ejerciciosOrdenados = [...ejerciciosEstimulacion].sort((a, b) => a.semanaRecomendada - b.semanaRecomendada)

  const isRecomendado = (ejercicio: Ejercicio) => {
    if (!user) return false
    return user.semanaGestacion >= ejercicio.semanaRecomendada
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
          <h1 className="text-lg font-bold">Estimulación Prenatal</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-2 bg-gradient-to-br from-[#aeebb8]/20 to-[#d7e874]/20">
          <CardContent className="p-4 flex gap-3">
            <Baby className="w-6 h-6 text-[#aeebb8] flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Conecta con tu bebé</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Ejercicios de estimulación prenatal para fortalecer el vínculo con tu bebé y apoyar su desarrollo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Progress Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#aeebb8]">{completados.length}</p>
              <p className="text-xs text-muted-foreground">Completados</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{ejerciciosEstimulacion.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Ejercicios de Estimulación</h2>
          {ejerciciosOrdenados.map((ejercicio) => {
            const recomendado = isRecomendado(ejercicio)
            const completado = completados.includes(ejercicio.id)

            return (
              <Link key={ejercicio.id} href={`/estimulacion/${ejercicio.id}`}>
                <Card
                  className={`border-2 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] ${
                    !recomendado ? "opacity-60" : ""
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-12 h-12 ${
                          completado ? "bg-[#aeebb8]" : "bg-[#d7e874]"
                        }/20 rounded-xl flex items-center justify-center flex-shrink-0`}
                      >
                        {completado ? (
                          <CheckCircle2 className="w-6 h-6 text-[#aeebb8]" />
                        ) : (
                          <Baby className="w-6 h-6 text-[#d7e874]" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-bold text-sm leading-tight">{ejercicio.nombre}</h3>
                          {recomendado && (
                            <Badge
                              variant="secondary"
                              className="bg-[#aeebb8]/20 text-foreground text-xs flex-shrink-0"
                            >
                              Recomendado
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{ejercicio.descripcion}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{ejercicio.duracion}</span>
                          </div>
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
