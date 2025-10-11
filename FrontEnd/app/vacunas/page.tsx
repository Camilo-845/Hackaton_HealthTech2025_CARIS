"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Syringe, AlertCircle, CheckCircle2, Calendar } from "lucide-react"
import { vacunasPrenatales } from "@/lib/data/vacunas-data"
import { obtenerFechaRecomendadaVacuna, diasHastaFecha, formatearFecha } from "@/lib/utils/date-utils"
import type { Vacuna, User } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function VacunasPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [vacunas, setVacunas] = useState<Vacuna[]>([])
  const [selectedVacuna, setSelectedVacuna] = useState<Vacuna | null>(null)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Load vaccines from localStorage or use default
    const savedVacunas = localStorage.getItem("vacunas")
    if (savedVacunas) {
      setVacunas(JSON.parse(savedVacunas))
    } else {
      setVacunas(vacunasPrenatales)
      localStorage.setItem("vacunas", JSON.stringify(vacunasPrenatales))
    }
  }, [router])

  const handleCheckVacuna = (vacunaId: string) => {
    const updatedVacunas = vacunas.map((v) => {
      if (v.id === vacunaId && !v.aplicada) {
        return {
          ...v,
          aplicada: true,
          fechaAplicacion: new Date().toISOString(),
        }
      }
      return v
    })

    setVacunas(updatedVacunas)
    localStorage.setItem("vacunas", JSON.stringify(updatedVacunas))

    toast({
      title: "Vacuna registrada",
      description: "La vacuna ha sido marcada como aplicada.",
      className: "bg-[#aeebb8] border-[#aeebb8]",
    })
  }

  const getVacunaStatus = (vacuna: Vacuna) => {
    if (vacuna.aplicada) {
      return { status: "aplicada", color: "bg-[#aeebb8]", icon: CheckCircle2 }
    }

    if (!user?.fum) {
      return { status: "pendiente", color: "bg-[#ffec61]", icon: AlertCircle }
    }

    const fechaRecomendada = obtenerFechaRecomendadaVacuna(user.fum, vacuna.semanaRecomendada)
    const dias = diasHastaFecha(fechaRecomendada)

    if (dias <= 7 && dias >= 0) {
      return { status: "próxima", color: "bg-[#ffb3a3]", icon: AlertCircle }
    }

    if (dias < 0) {
      return { status: "atrasada", color: "bg-[#fe7b8b]", icon: AlertCircle }
    }

    return { status: "pendiente", color: "bg-[#ffec61]", icon: Calendar }
  }

  const vacunasOrdenadas = [...vacunas].sort((a, b) => {
    if (a.aplicada && !b.aplicada) return 1
    if (!a.aplicada && b.aplicada) return -1
    return a.semanaRecomendada - b.semanaRecomendada
  })

  return (
    <div className="min-h-screen pb-24">
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Vacunas</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-2 bg-gradient-to-br from-[#bae4e2]/20 to-[#c0d0f1]/20">
          <CardContent className="p-4 flex gap-3">
            <Syringe className="w-6 h-6 text-[#bae4e2] flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Control de Vacunas Prenatales</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mantén tu calendario de vacunación al día. Recibirás alertas 7 días antes de cada fecha recomendada.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#aeebb8]">{vacunas.filter((v) => v.aplicada).length}</p>
              <p className="text-xs text-muted-foreground">Aplicadas</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-[#ffec61]">{vacunas.filter((v) => !v.aplicada).length}</p>
              <p className="text-xs text-muted-foreground">Pendientes</p>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{vacunas.length}</p>
              <p className="text-xs text-muted-foreground">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Vaccines List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Calendario de Vacunación</h2>
          {vacunasOrdenadas.map((vacuna) => {
            const { status, color, icon: StatusIcon } = getVacunaStatus(vacuna)
            const fechaRecomendada = user?.fum
              ? obtenerFechaRecomendadaVacuna(user.fum, vacuna.semanaRecomendada)
              : null
            const dias = fechaRecomendada ? diasHastaFecha(fechaRecomendada) : null

            return (
              <Dialog key={vacuna.id}>
                <DialogTrigger asChild>
                  <Card
                    className={`border-2 cursor-pointer hover:shadow-lg transition-all ${
                      vacuna.aplicada ? "opacity-60" : ""
                    }`}
                    onClick={() => setSelectedVacuna(vacuna)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-12 h-12 ${color}/20 rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <StatusIcon className={`w-6 h-6 text-${color.replace("bg-", "")}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-bold text-sm leading-tight">{vacuna.nombre}</h3>
                            <Badge
                              variant="secondary"
                              className={`${color} text-foreground border-0 text-xs flex-shrink-0`}
                            >
                              {status}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{vacuna.descripcion}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-muted-foreground">Semana {vacuna.semanaRecomendada}</p>
                            {vacuna.aplicada ? (
                              <p className="text-xs text-[#aeebb8] font-semibold">
                                ✓ Aplicada {vacuna.fechaAplicacion ? formatearFecha(vacuna.fechaAplicacion) : ""}
                              </p>
                            ) : dias !== null ? (
                              <p className="text-xs font-semibold">
                                {dias > 0 ? `En ${dias} días` : dias === 0 ? "Hoy" : `Hace ${Math.abs(dias)} días`}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{vacuna.nombre}</DialogTitle>
                    <DialogDescription>Información detallada de la vacuna</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Descripción</h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">{vacuna.descripcion}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Semana recomendada</p>
                        <p className="text-lg font-bold">Semana {vacuna.semanaRecomendada}</p>
                      </div>
                      {fechaRecomendada && (
                        <div className="space-y-1">
                          <p className="text-xs text-muted-foreground">Fecha recomendada</p>
                          <p className="text-sm font-semibold">{formatearFecha(fechaRecomendada.toISOString())}</p>
                        </div>
                      )}
                    </div>
                    {!vacuna.aplicada && (
                      <div className="flex items-center gap-3 p-4 bg-[#aeebb8]/10 rounded-xl">
                        <Checkbox
                          id={`check-${vacuna.id}`}
                          checked={vacuna.aplicada}
                          onCheckedChange={() => handleCheckVacuna(vacuna.id)}
                        />
                        <label htmlFor={`check-${vacuna.id}`} className="text-sm font-medium cursor-pointer">
                          Marcar como aplicada
                        </label>
                      </div>
                    )}
                    {vacuna.aplicada && (
                      <div className="p-4 bg-[#aeebb8]/20 rounded-xl text-center">
                        <CheckCircle2 className="w-8 h-8 text-[#aeebb8] mx-auto mb-2" />
                        <p className="text-sm font-semibold text-[#aeebb8]">Vacuna Aplicada</p>
                        {vacuna.fechaAplicacion && (
                          <p className="text-xs text-muted-foreground mt-1">{formatearFecha(vacuna.fechaAplicacion)}</p>
                        )}
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            )
          })}
        </div>
      </main>
    </div>
  )
}
