"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import { recetasPrenatales } from "@/lib/data/recetas-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Receta } from "@/lib/types"
import Image from "next/image"

export default function RecomendacionesPage() {
  const [selectedReceta, setSelectedReceta] = useState<Receta | null>(null)

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/nutricion" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Recetas Saludables</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-2 bg-gradient-to-br from-[#ffb3a3]/20 to-[#ffec61]/20">
          <CardContent className="p-4">
            <p className="text-sm text-center leading-relaxed">
              Recetas diseñadas especialmente para el embarazo, ricas en nutrientes esenciales para ti y tu bebé.
            </p>
          </CardContent>
        </Card>

        {/* Recipes Grid */}
        <div className="space-y-4">
          {recetasPrenatales.map((receta) => (
            <Dialog key={receta.id}>
              <DialogTrigger asChild>
                <Card
                  className="border-2 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02]"
                  onClick={() => setSelectedReceta(receta)}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0 rounded-l-xl overflow-hidden bg-muted">
                        <Image
                          src={receta.imagen || "/placeholder.svg"}
                          alt={receta.nombre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 py-4 pr-4 space-y-2">
                        <h3 className="font-bold text-sm leading-tight">{receta.nombre}</h3>
                        <div className="flex flex-wrap gap-1">
                          {receta.micronutrientes.slice(0, 2).map((micro) => (
                            <Badge key={micro} variant="secondary" className="text-xs bg-[#aeebb8]/20 text-foreground">
                              {micro}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">{receta.beneficios[0]}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{receta.nombre}</DialogTitle>
                  <DialogDescription>Receta nutritiva para el embarazo</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-muted">
                    <Image
                      src={receta.imagen || "/placeholder.svg"}
                      alt={receta.nombre}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Ingredientes</h4>
                      <ul className="space-y-1">
                        {receta.ingredientes.map((ingrediente, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex gap-2">
                            <span className="text-[#aeebb8]">•</span>
                            <span>{ingrediente}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Instrucciones</h4>
                      <ol className="space-y-2">
                        {receta.instrucciones.map((paso, index) => (
                          <li key={index} className="text-sm text-muted-foreground flex gap-2">
                            <span className="font-semibold text-[#ffb3a3] flex-shrink-0">{index + 1}.</span>
                            <span>{paso}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="bg-[#aeebb8]/10 rounded-2xl p-4">
                      <h4 className="font-semibold text-sm mb-2">Beneficios</h4>
                      <ul className="space-y-1">
                        {receta.beneficios.map((beneficio, index) => (
                          <li key={index} className="text-sm text-foreground flex gap-2">
                            <span className="text-[#aeebb8]">✓</span>
                            <span>{beneficio}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-sm mb-2">Micronutrientes</h4>
                      <div className="flex flex-wrap gap-2">
                        {receta.micronutrientes.map((micro) => (
                          <Badge key={micro} className="bg-[#c0d0f1] text-foreground">
                            {micro}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </main>
    </div>
  )
}
