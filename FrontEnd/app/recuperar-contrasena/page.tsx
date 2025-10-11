"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail } from "lucide-react"

export default function RecuperarContrasenaPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending recovery email
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col p-4">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        </Button>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md border-2 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto w-16 h-16 bg-[#ffec61]/10 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-[#ffec61]" />
            </div>
            <div>
              <CardTitle className="text-2xl">Recuperar Contraseña</CardTitle>
              <CardDescription>
                {emailSent ? "Revisa tu correo electrónico" : "Ingresa tu correo para recibir instrucciones"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {emailSent ? (
              <div className="space-y-4 text-center">
                <div className="bg-[#aeebb8]/10 border border-[#aeebb8] rounded-xl p-4">
                  <p className="text-sm text-foreground">
                    Hemos enviado un enlace de recuperación a <strong>{email}</strong>
                  </p>
                </div>
                <Button className="w-full rounded-full bg-[#c0d0f1] hover:bg-[#c0d0f1]/90 text-foreground" asChild>
                  <Link href="/login">Volver al inicio de sesión</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full rounded-full bg-[#ffec61] hover:bg-[#ffec61]/90 text-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Enviando..." : "Enviar Instrucciones"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
