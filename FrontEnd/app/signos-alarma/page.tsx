"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, AlertTriangle, Phone } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

interface SignoAlarma {
  sintoma: string
  intensidad: string
  descripcion: string
  fecha: string
}

const sintomasComunes = [
  "Sangrado vaginal",
  "Dolor abdominal intenso",
  "Contracciones regulares",
  "Fiebre alta",
  "Dolor de cabeza severo",
  "Visión borrosa",
  "Hinchazón repentina",
  "Disminución de movimientos fetales",
  "Pérdida de líquido",
  "Náuseas y vómitos severos",
]

const evaluarSintoma = (sintoma: string, intensidad: string) => {
  const sintomasGraves = [
    "Sangrado vaginal",
    "Dolor abdominal intenso",
    "Fiebre alta",
    "Dolor de cabeza severo",
    "Disminución de movimientos fetales",
    "Pérdida de líquido",
  ]

  const esGrave = sintomasGraves.includes(sintoma) || intensidad === "alta"

  if (esGrave) {
    return {
      nivel: "EMERGENCIA",
      color: "bg-[#fe7b8b]",
      recomendacion:
        "Este síntoma requiere atención médica inmediata. Contacta a tu médico o acude a urgencias ahora mismo.",
      accion: "Llamar a emergencias o acudir al hospital",
    }
  } else if (intensidad === "media") {
    return {
      nivel: "ATENCIÓN",
      color: "bg-[#ffec61]",
      recomendacion: "Este síntoma debe ser evaluado por tu médico. Programa una cita lo antes posible.",
      accion: "Contactar a tu médico en las próximas 24 horas",
    }
  } else {
    return {
      nivel: "MONITOREAR",
      color: "bg-[#c0d0f1]",
      recomendacion: "Monitorea este síntoma. Si empeora o persiste, consulta con tu médico.",
      accion: "Observar y registrar cambios",
    }
  }
}

export default function SignosAlarmaPage() {
  const { toast } = useToast()
  const [sintoma, setSintoma] = useState("")
  const [intensidad, setIntensidad] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [evaluacion, setEvaluacion] = useState<ReturnType<typeof evaluarSintoma> | null>(null)
  const [historial, setHistorial] = useState<SignoAlarma[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!sintoma || !intensidad) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      })
      return
    }

    const resultado = evaluarSintoma(sintoma, intensidad)
    setEvaluacion(resultado)

    // Save to history
    const nuevoRegistro: SignoAlarma = {
      sintoma,
      intensidad,
      descripcion,
      fecha: new Date().toISOString(),
    }

    const nuevoHistorial = [nuevoRegistro, ...historial]
    setHistorial(nuevoHistorial)
    localStorage.setItem("signos_alarma", JSON.stringify(nuevoHistorial))
  }

  const handleReset = () => {
    setSintoma("")
    setIntensidad("")
    setDescripcion("")
    setEvaluacion(null)
  }

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
          <h1 className="text-lg font-bold">Signos de Alarma</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Warning Banner */}
        <Card className="border-2 border-[#fe7b8b] bg-[#fe7b8b]/10">
          <CardContent className="p-4 flex gap-3">
            <AlertTriangle className="w-6 h-6 text-[#fe7b8b] flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Importante</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Esta herramienta es solo orientativa. Ante cualquier duda o síntoma preocupante, contacta inmediatamente
                a tu médico o acude a urgencias.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="border-2 bg-gradient-to-br from-[#fe7b8b]/20 to-[#ff95ac]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold mb-1">Línea de Emergencias</p>
                <p className="text-xs text-muted-foreground">Disponible 24/7</p>
              </div>
              <Button className="rounded-full bg-[#fe7b8b] hover:bg-[#fe7b8b]/90 text-white">
                <Phone className="w-4 h-4 mr-2" />
                911
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Form */}
        {!evaluacion ? (
          <Card className="border-2 shadow-lg">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sintoma">¿Qué síntoma estás experimentando?</Label>
                  <Select value={sintoma} onValueChange={setSintoma}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecciona un síntoma" />
                    </SelectTrigger>
                    <SelectContent>
                      {sintomasComunes.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="intensidad">Intensidad del síntoma</Label>
                  <Select value={intensidad} onValueChange={setIntensidad}>
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Selecciona la intensidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Leve - Molestia menor</SelectItem>
                      <SelectItem value="media">Moderada - Preocupante</SelectItem>
                      <SelectItem value="alta">Severa - Muy preocupante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descripcion">Descripción adicional (opcional)</Label>
                  <Textarea
                    id="descripcion"
                    placeholder="Describe con más detalle lo que sientes..."
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="rounded-xl min-h-24"
                  />
                </div>

                <Button type="submit" className="w-full rounded-full bg-[#fe7b8b] hover:bg-[#fe7b8b]/90 text-white">
                  Evaluar Síntoma
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Evaluation Result */}
            <Card className={`border-2 ${evaluacion.color}/20 border-${evaluacion.color.replace("bg-", "")}`}>
              <CardContent className="p-6 space-y-4">
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 ${evaluacion.color}/20 rounded-full mb-3`}
                  >
                    <AlertTriangle className={`w-8 h-8 text-${evaluacion.color.replace("bg-", "")}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Nivel: {evaluacion.nivel}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{evaluacion.recomendacion}</p>
                </div>

                <div className={`${evaluacion.color}/10 rounded-2xl p-4`}>
                  <p className="text-sm font-semibold mb-2">Acción recomendada:</p>
                  <p className="text-sm text-foreground">{evaluacion.accion}</p>
                </div>

                {evaluacion.nivel === "EMERGENCIA" && (
                  <Button className="w-full rounded-full bg-[#fe7b8b] hover:bg-[#fe7b8b]/90 text-white">
                    <Phone className="w-4 h-4 mr-2" />
                    Llamar a Emergencias
                  </Button>
                )}

                <Button variant="outline" className="w-full rounded-full bg-transparent" onClick={handleReset}>
                  Evaluar Otro Síntoma
                </Button>
              </CardContent>
            </Card>

            {/* Symptom Details */}
            <Card className="border-2">
              <CardContent className="p-6 space-y-3">
                <h4 className="font-semibold">Detalles del síntoma:</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Síntoma: </span>
                    <span className="font-medium">{sintoma}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Intensidad: </span>
                    <span className="font-medium capitalize">{intensidad}</span>
                  </div>
                  {descripcion && (
                    <div>
                      <span className="text-muted-foreground">Descripción: </span>
                      <p className="text-foreground mt-1">{descripcion}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
