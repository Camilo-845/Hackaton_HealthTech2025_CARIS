"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Camera, Star } from "lucide-react"
import type { CalificacionPlato, User } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"

export default function CalificacionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [calificaciones, setCalificaciones] = useState<CalificacionPlato[]>([])
  const [rating, setRating] = useState(0)
  const [descripcion, setDescripcion] = useState("")
  const [imagenPreview, setImagenPreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    const savedCalificaciones = localStorage.getItem("calificaciones")
    if (savedCalificaciones) {
      setCalificaciones(JSON.parse(savedCalificaciones))
    }
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagenPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona una calificación",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const nuevaCalificacion: CalificacionPlato = {
      id: Date.now().toString(),
      imagen: imagenPreview || "/healthy-meal.png",
      calificacion: rating,
      descripcion,
      fecha: new Date().toISOString(),
      semanaGestacion: user?.semanaGestacion || 0,
    }

    const updatedCalificaciones = [nuevaCalificacion, ...calificaciones]
    setCalificaciones(updatedCalificaciones)
    localStorage.setItem("calificaciones", JSON.stringify(updatedCalificaciones))

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Calificación guardada",
        description: "Tu comida ha sido registrada exitosamente",
        className: "bg-[#aeebb8] border-[#aeebb8]",
      })
      setRating(0)
      setDescripcion("")
      setImagenPreview("")
    }, 500)
  }

  return (
    <div className="min-h-screen pb-24">
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/nutricion" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Calificar Plato</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Form Card */}
        <Card className="border-2 shadow-lg">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-3">
                <Label>Foto del Plato</Label>
                <div className="relative">
                  {imagenPreview ? (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-muted">
                      <Image src={imagenPreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => setImagenPreview("")}
                      >
                        Cambiar
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Camera className="w-10 h-10 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Toca para tomar foto o subir</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-3">
                <Label>Calificación</Label>
                <div className="flex gap-2 justify-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-10 h-10 ${
                          star <= rating ? "fill-[#ffec61] text-[#ffec61]" : "text-muted-foreground"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Label htmlFor="descripcion">Descripción (opcional)</Label>
                <Textarea
                  id="descripcion"
                  placeholder="¿Cómo estuvo tu comida? ¿Qué ingredientes tenía?"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                  className="rounded-xl min-h-24"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-[#d7e874] hover:bg-[#d7e874]/90 text-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar Calificación"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* History */}
        {calificaciones.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Historial de Comidas</h2>
            {calificaciones.map((cal) => (
              <Card key={cal.id} className="border-2">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-muted">
                      <Image src={cal.imagen || "/placeholder.svg"} alt="Comida" fill className="object-cover" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= cal.calificacion ? "fill-[#ffec61] text-[#ffec61]" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {cal.descripcion || "Sin descripción"}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{new Date(cal.fecha).toLocaleDateString("es-ES")}</span>
                        <span>•</span>
                        <span>Semana {cal.semanaGestacion}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
