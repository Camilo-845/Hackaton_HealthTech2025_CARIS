import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Baby, Activity } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="w-8 h-8 text-[#fe7b8b] fill-[#fe7b8b]" />
          <h1 className="text-2xl font-bold text-foreground">Latido</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-balance leading-tight">Tu camino a la vida</h2>
            <p className="text-xl text-muted-foreground text-pretty">Este es el hogar de tus latidos</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-border">
            <p className="text-lg text-foreground text-balance leading-relaxed">
              Latido te acompaña en tu proceso prenatal, con educación, ejercicios e IA
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
            <div className="bg-[#c0d0f1]/30 rounded-2xl p-6 space-y-2">
              <Baby className="w-10 h-10 text-[#c0d0f1] mx-auto" />
              <h3 className="font-semibold">Seguimiento Semanal</h3>
              <p className="text-sm text-muted-foreground">Información personalizada para cada semana</p>
            </div>
            <div className="bg-[#bae4e2]/30 rounded-2xl p-6 space-y-2">
              <Activity className="w-10 h-10 text-[#bae4e2] mx-auto" />
              <h3 className="font-semibold">Ejercicios y Nutrición</h3>
              <p className="text-sm text-muted-foreground">Guías adaptadas a tu etapa</p>
            </div>
            <div className="bg-[#aeebb8]/30 rounded-2xl p-6 space-y-2">
              <Heart className="w-10 h-10 text-[#aeebb8] mx-auto" />
              <h3 className="font-semibold">Asistente IA</h3>
              <p className="text-sm text-muted-foreground">Respuestas a tus dudas 24/7</p>
            </div>
          </div>

          <div className="pt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-[#fe7b8b] hover:bg-[#fe7b8b]/90 text-white"
              asChild
            >
              <Link href="/registro">Comenzar Ahora</Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">Para mamás gestantes de cualquier territorio</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-sm text-muted-foreground">
        <p>© 2025 Latido. Cuidando tu embarazo con amor y tecnología.</p>
      </footer>
    </div>
  )
}
