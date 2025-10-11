"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Camera, Upload, CheckCircle } from "lucide-react"
import type { CalificacionPlato, User } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Image from "next/image"

export default function CalificacionPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [imagenPreview, setImagenPreview] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }
    setUser(JSON.parse(userData))
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
    if (!imagenPreview) {
      toast({
        title: "Error",
        description: "Por favor selecciona una imagen",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const nuevaCalificacion: CalificacionPlato = {
      id: Date.now().toString(),
      imagen: imagenPreview,
      calificacion: 0, // Default value
      descripcion: "", // Default value
      fecha: new Date().toISOString(),
      semanaGestacion: user?.semanaGestacion || 0,
    }

    const savedCalificaciones = localStorage.getItem("calificaciones")
    const calificaciones = savedCalificaciones ? JSON.parse(savedCalificaciones) : []
    const updatedCalificaciones = [nuevaCalificacion, ...calificaciones]
    localStorage.setItem("calificaciones", JSON.stringify(updatedCalificaciones))

    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "¡Plato guardado!",
        description: "Tu comida ha sido registrada para análisis.",
        className: "bg-green-100 border-green-300",
        icon: <CheckCircle className="text-green-600" />,
      })
      setImagenPreview("")
      
      // Redirect to nutrition page after a short delay
      setTimeout(() => {
        router.push("/nutricion")
      }, 1500)

    }, 500)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/nutricion" className="gap-2 text-gray-600">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold text-gray-800">Registrar Comida</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="border-2 shadow-lg rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">Sube una foto de tu plato</h2>
                  <p className="text-gray-500">
                    Captura lo que estás comiendo para que podamos darte una retroalimentación personalizada.
                  </p>
                </div>

                {/* Image Upload */}
                <div className="relative group">
                  {imagenPreview ? (
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-300">
                      <Image src={imagenPreview} alt="Preview" fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="secondary"
                          className="rounded-full"
                          onClick={() => setImagenPreview("")}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Cambiar Foto
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                        <Upload className="w-12 h-12" />
                        <p className="text-lg font-semibold">Toca para subir una foto</p>
                        <p className="text-sm">PNG, JPG, o WEBP</p>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-bold text-lg py-6 shadow-lg transition-transform hover:scale-105"
                  disabled={isSubmitting || !imagenPreview}
                >
                  {isSubmitting ? "Guardando..." : "Guardar Plato"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
