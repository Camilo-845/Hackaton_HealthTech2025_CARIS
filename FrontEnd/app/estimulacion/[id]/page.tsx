"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle2 } from "lucide-react"
import { ejerciciosEstimulacion } from "@/lib/data/ejercicios-data"
import type { Ejercicio } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function EjercicioEstimulacionPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [ejercicio, setEjercicio] = useState<Ejercicio | null>(null)
  const [completado, setCompletado] = useState(false)

  useEffect(() => {
    const id = params.id as string
    const found = ejerciciosEstimulacion.find((e) => e.id === id)
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

  return (
    <div className="min-h-screen pb-24">
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/estimulacion" className="gap-2">
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
        <Card className="border-2 bg-gradient-to-br from-[#aeebb8]/20 to-[#d7e874]/20">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-2xl font-bold">{ejercicio.nombre}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{ejercicio.descripcion}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#aeebb8]" />
                <span>{ejercicio.duracion}</span>
              </div>
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
                  <span className="flex-shrink-0 w-6 h-6 bg-[#aeebb8]/20 rounded-full flex items-center justify-center text-sm font-semibold text-[#aeebb8]">
                    {index + 1}
                  </span>
                  <span className="text-sm text-foreground leading-relaxed pt-0.5">{paso}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

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
            className="w-full rounded-full bg-[#aeebb8] hover:bg-[#aeebb8]/90 text-foreground py-6"
          >
            <CheckCircle2 className="w-5 h-5 mr-2" />
            Marcar como Completado
          </Button>
        )}
      </main>
    </div>
  )
}
