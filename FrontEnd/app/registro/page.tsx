"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, ArrowLeft } from "lucide-react"

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    edad: "",
    talla: "",
    peso: "",
    tipoSangre: "",
    fum: "",
    semanaGestacion: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Create a mutable copy to work with
    const processedFormData = { ...formData }

    // Calculate gestational week from FUM if provided
    if (processedFormData.fum && !processedFormData.semanaGestacion) {
      const fumDate = new Date(processedFormData.fum)
      const today = new Date()
      const diffTime = Math.abs(today.getTime() - fumDate.getTime())
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
      processedFormData.semanaGestacion = diffWeeks.toString()
    }

    // Create a new object with correct types and without the password
    const { password, ...userData } = processedFormData
    const userToSave = {
      ...userData,
      edad: Number.parseInt(userData.edad, 10) || 0,
      talla: Number.parseInt(userData.talla, 10) || 0,
      peso: Number.parseInt(userData.peso, 10) || 0,
      semanaGestacion: Number.parseInt(userData.semanaGestacion, 10) || 0,
    }

    // Simulate registration
    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify(userToSave))
      router.push("/home")
    }, 1000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col p-4 pb-8">
      <div className="mb-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md border-2 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-[#aeebb8]/10 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-[#aeebb8] fill-[#aeebb8]" />
            </div>
            <div>
              <CardTitle className="text-2xl">Crear Cuenta</CardTitle>
              <CardDescription>Comienza tu viaje con Latido</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
                    placeholder="María"
                    value={formData.nombre}
                    onChange={(e) => handleChange("nombre", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido</Label>
                  <Input
                    id="apellido"
                    placeholder="García"
                    value={formData.apellido}
                    onChange={(e) => handleChange("apellido", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input
                    id="edad"
                    type="number"
                    placeholder="28"
                    value={formData.edad}
                    onChange={(e) => handleChange("edad", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="talla">Talla (cm)</Label>
                  <Input
                    id="talla"
                    type="number"
                    placeholder="165"
                    value={formData.talla}
                    onChange={(e) => handleChange("talla", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    placeholder="65"
                    value={formData.peso}
                    onChange={(e) => handleChange("peso", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoSangre">Tipo de Sangre</Label>
                <Select value={formData.tipoSangre} onValueChange={(value) => handleChange("tipoSangre", value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Selecciona tu tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fum">Fecha Última Menstruación (F.U.M.)</Label>
                <Input
                  id="fum"
                  type="date"
                  value={formData.fum}
                  onChange={(e) => handleChange("fum", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="semanaGestacion">Semana de Gestación (opcional)</Label>
                <Input
                  id="semanaGestacion"
                  type="number"
                  placeholder="Se calcula automáticamente"
                  value={formData.semanaGestacion}
                  onChange={(e) => handleChange("semanaGestacion", e.target.value)}
                  className="rounded-xl"
                />
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-[#aeebb8] hover:bg-[#aeebb8]/90 text-foreground"
                disabled={isLoading}
              >
                {isLoading ? "Registrando..." : "Registrarme"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">¿Ya tienes cuenta? </span>
              <Link href="/login" className="text-[#c0d0f1] hover:underline font-semibold">
                Inicia sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
