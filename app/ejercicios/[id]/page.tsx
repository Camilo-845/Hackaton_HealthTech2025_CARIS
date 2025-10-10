"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Clock, AlertCircle, CheckCircle2 } from "lucide-react"
import { ejerciciosFisicos } from "@/lib/data/ejercicios-data"
import type { Ejercicio } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function EjercicioFisicoPage() {
  const params = useParams()
  const { toast } = useToast()
  const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null)
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const found = ejerciciosFisicos.find((e) => e.id === id)
    if (found) {
      setEjercicio(found)

      const savedCompletados = localStorage.getItem("ejercicios_completados")
      if (savedCompletados) {
        const completados = JSON.parse(savedCompletados)
        setCompletado(completados.includes(id))
      }
    }
  }, [params.id])

  const handleMarcarCompletado = () => {
    if (!ejercicio) return

    const savedCompletados = localStorage.getItem("ejercicios_completados")
    const completados = savedCompletados ? JSON.parse(savedCompletados) : []

    if (!completados.includes(ejercicio.id)) {
      completados.push(ejercicio.id)
      localStorage.setItem("ejercicios_completados", JSON.stringify(completados))
      setCompletado(true)

      toast({
        title: "Ejercicio completado",
        description: "Has registrado este ejercicio como completado",
        className: "bg-[#aeebb8] border-[#aeebb8]",
      })
    }
  }

  if (!ejercicio) {
    return null
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
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/ejercicios" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Ejercicio</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Title Card */}
        <Card className="border-2 bg-gradient-to-br from-[#d7e874]/20 to-[#ffec61]/20">
          <CardContent className="p-6 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-2xl font-bold">{ejercicio.nombre}</h2>
              {ejercicio.dificultad && (
                <Badge className={`${getDificultadColor(ejercicio.dificultad)} text-foreground`}>
                  {ejercicio.dificultad}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{ejercicio.descripcion}</p>
            <div className="flex items-center gap-4 text-sm flex-wrap">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#d7e874]" />
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
          </CardContent>
        </Card>
        
        {/* Instructions */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-bold">Instrucciones</h3>
            <ol className="space-y-3">
              {ejercicio.instrucciones.map((paso, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-[#d7e874]/20 rounded-full flex items-center justify-center text-sm font-semibold text-[#d7e874]">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed pt-0.5">{paso}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        {/* Precautions */}
        {ejercicio.precauciones && ejercicio.precauciones.length > 0 && (
          <Card className="border-2 border-[#ffb3a3] bg-[#ffb3a3]/10">
            <CardContent className="p-6 space-y-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#ffb3a3]" />
                <h3 className="text-lg font-bold">Precauciones</h3>
              </div>
              <ul className="space-y-2">
                {ejercicio.precauciones.map((precaucion, index) => (
                  <li key={index} className="text-sm text-foreground flex gap-2">
                    <span className="text-[#ffb3a3]">•</span>
                    <span>{precaucion}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Complete Button */}
        {completado ? (
          <Card className="border-2 bg-[#aeebb8]/10">
            <CardContent className="p-6 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#aeebb8] mx-auto" />
              <p className="font-semibold text-[#aeebb8]">Ejercicio Completado</p>
              <p className="text-sm text-muted-foreground">Has realizado este ejercicio exitosamente</p>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={handleMarcarCompletado}
            className="w-full rounded-full bg-[#d7e874] hover:bg-[#d7e874]/90 text-foreground py-6"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Marcar como Completado
          </Button>
        )}
      </main>
    </div>
  )
}
