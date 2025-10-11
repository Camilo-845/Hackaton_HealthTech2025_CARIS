"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, CheckCircle2, BookOpen, Lightbulb } from "lucide-react"
import { ejerciciosEstimulacion } from "@/lib/data/ejercicios-data"
import type { Ejercicio } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Component for rendering interactive content
const InteractiveContent = ({ ejercicio }: { ejercicio: Ejercicio }) => {
  const [selectedStory, setSelectedStory] = useState<{ titulo: string; texto: string } | null>(null)
  const [selectedSong, setSelectedSong] = useState<{ titulo: string; url: string } | null>(null)

  if (!ejercicio.recursoInteractivo) {
    return (
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
    )
  }

  switch (ejercicio.recursoInteractivo.tipo) {
    case "musica":
      const songs = ejercicio.recursoInteractivo.contenido as { titulo: string; url: string }[]
      if (selectedSong) {
        return (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSong(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a la lista de canciones
            </Button>
            <h4 className="text-lg font-bold">{selectedSong.titulo}</h4>
            <div className="rounded-lg overflow-hidden">
              <audio controls autoPlay loop className="w-full">
                <source src={selectedSong.url} type="audio/mpeg" />
                Tu navegador no soporta el elemento de audio.
              </audio>
            </div>
          </div>
        )
      }
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Elige una de las canciones para escuchar con tu bebé.
          </p>
          <div className="space-y-3">
            {songs.map((song, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md" onClick={() => setSelectedSong(song)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-[#aeebb8]" />
                  <h4 className="font-semibold">{song.titulo}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    case "video":
      return (
        <div className="space-y-4">
          <div className="max-w-md mx-auto">
            <div className="w-full aspect-video rounded-lg overflow-hidden">
              <iframe
                className="w-full h-full"
                src={ejercicio.recursoInteractivo.contenido as string}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
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
        </div>
      )
    case "texto":
      const stories = ejercicio.recursoInteractivo.contenido as { titulo: string; texto: string }[]
      if (selectedStory) {
        return (
          <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedStory(null)} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a los cuentos
            </Button>
            <h4 className="text-lg font-bold">{selectedStory.titulo}</h4>
            <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{selectedStory.texto}</p>
          </div>
        )
      }
      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Elige uno de los cuentos para leerle a tu bebé.
          </p>
          <div className="space-y-3">
            {stories.map((story, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md" onClick={() => setSelectedStory(story)}>
                <CardContent className="p-4 flex items-center gap-4">
                  <BookOpen className="w-5 h-5 text-[#aeebb8]" />
                  <h4 className="font-semibold">{story.titulo}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )
    case "animacion":
      return (
        <div className="space-y-4">
          <div className="max-w-sm mx-auto">
            <div className="w-full aspect-square bg-slate-900 rounded-lg flex items-center justify-center">
              <div className="w-24 h-24 bg-yellow-200 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Esta es una simple animación de luz. Mueve tu teléfono sobre tu vientre para que tu bebé pueda percibir la luz.
          </p>
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
        </div>
      )
    default:
      return (
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
      )
  }
}


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

  const getTitle = () => {
    if (!ejercicio.recursoInteractivo) return "Instrucciones"
    switch (ejercicio.recursoInteractivo.tipo) {
      case "musica":
        return "Música para tu bebé"
      case "video":
        return "Video demostrativo"
      case "texto":
        return "Cuentos para tu bebé"
      case "animacion":
        return "Animación de luz"
      default:
        return "Instrucciones"
    }
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

        {/* Instructions / Interactive Content */}
        <Card className="border-2">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-bold">{getTitle()}</h3>
            <InteractiveContent ejercicio={ejercicio} />
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