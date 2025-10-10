"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ChefHat, Star } from "lucide-react"

export default function NutricionPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Mi Nutrición</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Hero Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Alimentación Saludable</h2>
          <p className="text-muted-foreground text-sm">Nutrición balanceada para ti y tu bebé</p>
        </div>

        {/* Main Options */}
        <div className="grid grid-cols-1 gap-4">
          <Link href="/nutricion/recomendaciones">
            <Card className="border-2 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-[#ffb3a3]/20 to-[#ffec61]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#ffb3a3]/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-8 h-8 text-[#ffb3a3]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Recomendación de Platos</h3>
                    <p className="text-sm text-muted-foreground">Recetas saludables y nutritivas para tu embarazo</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/nutricion/calificacion">
            <Card className="border-2 hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer bg-gradient-to-br from-[#d7e874]/20 to-[#aeebb8]/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#d7e874]/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Star className="w-8 h-8 text-[#d7e874]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">Calificación de Platos</h3>
                    <p className="text-sm text-muted-foreground">Registra y califica tus comidas diarias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Info Cards */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Consejos Nutricionales</h3>
          <Card className="border-2 bg-[#c0d0f1]/10">
            <CardContent className="p-4 space-y-2">
              <h4 className="font-semibold text-sm">Hidratación</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bebe al menos 8 vasos de agua al día para mantenerte hidratada y ayudar al desarrollo del bebé.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 bg-[#bae4e2]/10">
            <CardContent className="p-4 space-y-2">
              <h4 className="font-semibold text-sm">Comidas Frecuentes</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Come porciones pequeñas cada 2-3 horas para mantener tu energía y controlar las náuseas.
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 bg-[#aeebb8]/10">
            <CardContent className="p-4 space-y-2">
              <h4 className="font-semibold text-sm">Alimentos a Evitar</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Evita pescados con alto contenido de mercurio, carnes crudas, y quesos no pasteurizados.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
