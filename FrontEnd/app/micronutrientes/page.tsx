"use client"

import { useState } from "react"
import { ArrowLeft, Info } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { micronutrientes, type Micronutriente } from "@/lib/data/micronutrientes-data"

export default function MicronutrientesPage() {
  const [selectedMicronutriente, setSelectedMicronutriente] = useState<Micronutriente | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCardClick = (micro: Micronutriente) => {
    setSelectedMicronutriente(micro)
    setDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/home">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-balance">Micronutrientes</h1>
              <p className="text-sm text-muted-foreground">Nutrientes esenciales para tu embarazo</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Info Card */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex gap-3">
              <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">¿Por qué son importantes?</p>
                <p className="text-sm text-muted-foreground text-pretty">
                  Los micronutrientes son vitaminas y minerales esenciales que tu cuerpo necesita en pequeñas cantidades
                  para funcionar correctamente y apoyar el desarrollo saludable de tu bebé.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Micronutrientes Grid */}
        <div className="grid gap-4">
          {micronutrientes.map((micro) => (
            <Card
              key={micro.id}
              className="cursor-pointer transition-all hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => handleCardClick(micro)}
              style={{ borderLeftWidth: "4px", borderLeftColor: micro.color }}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{micro.nombre}</CardTitle>
                    <CardDescription className="mt-1 text-pretty">{micro.descripcion}</CardDescription>
                  </div>
                  <Badge
                    variant="secondary"
                    className="flex-shrink-0"
                    style={{ backgroundColor: `${micro.color}20`, color: micro.color }}
                  >
                    {micro.dosisRecomendada}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Info className="h-4 w-4" />
                  <span>Toca para ver más información</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selectedMicronutriente && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: selectedMicronutriente.color }}
                  />
                  <DialogTitle className="text-2xl">{selectedMicronutriente.nombre}</DialogTitle>
                </div>
                <DialogDescription className="text-base text-pretty">
                  {selectedMicronutriente.descripcion}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Dosis Recomendada */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Badge
                      style={{
                        backgroundColor: `${selectedMicronutriente.color}20`,
                        color: selectedMicronutriente.color,
                      }}
                    >
                      Dosis Recomendada
                    </Badge>
                  </h3>
                  <p className="text-lg font-medium">{selectedMicronutriente.dosisRecomendada}</p>
                </div>

                {/* Beneficios */}
                <div>
                  <h3 className="font-semibold mb-3">Beneficios durante el embarazo</h3>
                  <ul className="space-y-2">
                    {selectedMicronutriente.beneficios.map((beneficio, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span className="text-sm text-pretty">{beneficio}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Fuentes Alimenticias */}
                <div>
                  <h3 className="font-semibold mb-3">Fuentes alimenticias</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMicronutriente.fuentesAlimenticias.map((fuente, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {fuente}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Importancia por Semana */}
                <div>
                  <h3 className="font-semibold mb-3">Importancia durante el embarazo</h3>
                  <div className="space-y-3">
                    {selectedMicronutriente.importanciaPorSemana.map((periodo, index) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="pt-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary" className="text-xs">
                              Semanas {periodo.inicio}-{periodo.fin}
                            </Badge>
                          </div>
                          <p className="text-sm text-pretty">{periodo.razon}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button
                  onClick={() => setDialogOpen(false)}
                  className="w-full"
                  style={{ backgroundColor: selectedMicronutriente.color }}
                >
                  Entendido
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
