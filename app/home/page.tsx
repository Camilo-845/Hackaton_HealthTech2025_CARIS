"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  User,
  Globe,
  Stethoscope,
  Apple,
  Activity,
  Baby,
  MessageCircle,
  Bell,
  Pill,
} from "lucide-react";
import {
  calcularSemanaGestacion,
  calcularDiaEnSemana,
} from "@/lib/utils/date-utils";
import { obtenerContenidoSemana } from "@/lib/data/contenido-semanal";
import type { User as UserType } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [semanaActual, setSemanaActual] = useState(1);
  const [diaEnSemana, setDiaEnSemana] = useState(1);
  const [contenido, setContenido] = useState(obtenerContenidoSemana(1));
  const [language, setLanguage] = useState<"ES" | "ING">("ES");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    if (parsedUser.fum) {
      const semana = calcularSemanaGestacion(parsedUser.fum);
      const dia = calcularDiaEnSemana(parsedUser.fum);
      setSemanaActual(semana);
      setDiaEnSemana(dia);
      setContenido(obtenerContenidoSemana(semana));
    }
  }, [router]);

  if (!user) {
    return null;
  }

  const progressPercentage = ((diaEnSemana + 1) / 7) * 100;

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fe7b8b]/10 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[#fe7b8b]" />
            </div>
            <div>
              <p className="text-sm font-semibold">{user.nombre}</p>
              <p className="text-xs text-muted-foreground">
                Semana {semanaActual}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "ES" ? "ING" : "ES")}
              className="text-xs"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#fe7b8b] rounded-full"></span>
            </Button>
          </div>
        </div>
      </header>

      <main className="px-2 py-6 space-y-6">
        {/* Week Progress Bar */}
        <Card className="border-none overflow-hidden py-2 bg-transparent border-transparent">
          <CardContent className="">
            <div className="space-y-2 flex justify-center items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-[#c0d0f1] to-[#bae4e2] rounded-full flex items-center justify-center">
                <p className="text-white">{semanaActual}</p>
              </div>
              <Progress value={progressPercentage} className="h-3 mx-3" />
              <div className="w-8 h-8 bg-gradient-to-br from-[#c0d0f1] to-[#bae4e2] rounded-full flex items-center justify-center">
                <p className="text-white">{semanaActual + 1}</p>
              </div>
            </div>
            <div className="flex items-center justify-center m-0">
              <h2 className="text-large font-bold m-0">
                Semana {semanaActual}
              </h2>
            </div>
          </CardContent>
        </Card>

        {/* Information Section */}
        <Card className="border-2 shadow-lg bg-gradient-to-br from-[#c0d0f1]/10 to-[#bae4e2]/10">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-xl font-bold">{contenido.titulo}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {contenido.descripcion}
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 space-y-3">
              <p className="text-sm font-semibold">Información importante:</p>
              <ul className="space-y-2">
                {contenido.informacion.map((info, index) => (
                  <li
                    key={index}
                    className="text-sm text-foreground flex gap-2"
                  >
                    <span className="text-[#aeebb8] mt-1">•</span>
                    <span className="flex-1">{info}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#ffec61]/20 rounded-2xl p-4">
              <p className="text-sm font-semibold mb-2">
                Consejos de la semana:
              </p>
              <ul className="space-y-1">
                {contenido.consejos.slice(0, 2).map((consejo, index) => (
                  <li
                    key={index}
                    className="text-sm text-foreground flex gap-2"
                  >
                    <span className="text-[#ffec61]">✓</span>
                    <span className="flex-1">{consejo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Casas Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Tus Módulos</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Bot Latido */}
            <Link href="/chatbot">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#ff95ac]/20 to-[#fe7b8b]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#fe7b8b]/20 rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-7 h-7 text-[#fe7b8b]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Bot Latido</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Asistente IA
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Estimulación */}
            <Link href="/estimulacion">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#d7e874]/20 to-[#aeebb8]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#aeebb8]/20 rounded-2xl flex items-center justify-center">
                    <Baby className="w-7 h-7 text-[#aeebb8]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Estimulación</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Ejercicios
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Mi Nutrición */}
            <Link href="/nutricion">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#ffb3a3]/20 to-[#ffec61]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#ffb3a3]/20 rounded-2xl flex items-center justify-center">
                    <Apple className="w-7 h-7 text-[#ffb3a3]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Mi Nutrición</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Alimentación
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Mi Info */}
            <Link href="/mi-info">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#c0d0f1]/20 to-[#bae4e2]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#c0d0f1]/20 rounded-2xl flex items-center justify-center">
                    <User className="w-7 h-7 text-[#c0d0f1]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Mi Info</h4>
                    <p className="text-xs text-muted-foreground mt-1">Perfil</p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Vacunas */}
            <Link href="/vacunas">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#bae4e2]/20 to-[#c0d0f1]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#bae4e2]/20 rounded-2xl flex items-center justify-center">
                    <Stethoscope className="w-7 h-7 text-[#bae4e2]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Vacunas</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Control
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Ejercicios */}
            <Link href="/ejercicios">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#d7e874]/20 to-[#ffec61]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#d7e874]/20 rounded-2xl flex items-center justify-center">
                    <Activity className="w-7 h-7 text-[#d7e874]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Ejercicios</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Físicos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Micronutrientes */}
            <Link href="/micronutrientes">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#ffec61]/20 to-[#d7e874]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#ffec61]/20 rounded-2xl flex items-center justify-center">
                    <Pill className="w-7 h-7 text-[#ffec61]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Micronutrientes</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Vitaminas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Citas */}
            <Link href="/citas">
              <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#ff95ac]/20 to-[#fe7b8b]/20">
                <CardContent className="p-6 space-y-3 text-center">
                  <div className="w-14 h-14 mx-auto bg-[#ff95ac]/20 rounded-2xl flex items-center justify-center">
                    <Bell className="w-7 h-7 text-[#ff95ac]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Mis Citas</h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      Calendario
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/signos-alarma">
            <Button className="w-full h-auto py-4 rounded-2xl bg-[#fe7b8b] hover:bg-[#fe7b8b]/90 text-white flex flex-col gap-2">
              <Stethoscope className="w-6 h-6" />
              <span className="text-sm font-semibold">Signos de Alarma</span>
            </Button>
          </Link>
          <Link href="/chatbot">
            <Button className="w-full h-auto py-4 rounded-2xl bg-[#ff95ac] hover:bg-[#ff95ac]/90 text-white flex flex-col gap-2">
              <MessageCircle className="w-6 h-6" />
              <span className="text-sm font-semibold">Gestabot</span>
            </Button>
          </Link>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border">
        <div className="flex justify-around items-center py-3 px-4">
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1"
            asChild
          >
            <Link href="/home">
              <Heart className="w-5 h-5 text-[#fe7b8b] fill-[#fe7b8b]" />
              <span className="text-xs font-semibold text-[#fe7b8b]">
                Inicio
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1"
            asChild
          >
            <Link href="/nutricion">
              <Apple className="w-5 h-5" />
              <span className="text-xs">Nutrición</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1"
            asChild
          >
            <Link href="/citas">
              <Bell className="w-5 h-5" />
              <span className="text-xs">Citas</span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col gap-1"
            asChild
          >
            <Link href="/mi-info">
              <User className="w-5 h-5" />
              <span className="text-xs">Perfil</span>
            </Link>
          </Button>
        </div>
      </nav>
    </div>
  );
}
