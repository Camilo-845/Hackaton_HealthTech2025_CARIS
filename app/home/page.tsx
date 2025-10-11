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
import WheelCarousel from "@/components/ui/wheel-carousel";

const slides = [
  {
    alt: "Slide 1",
    src: "/casa_mi_info.png",
    title: "Mi Info",
    href: "/mi-info",
  },
  {
    alt: "Slide 2",
    src: "/casa_mi_nutrición.png",
    title: "Mi Nutrición",
    href: "/nutricion",
  },
  {
    alt: "Slide 3",
    src: "/casa_ejercicios.png",
    title: "Ejercicios",
    href: "/ejercicios",
  },
  {
    alt: "Slide 4",
    src: "/casa_estimulacion.png",
    title: "Estimulación",
    href: "/estimulacion",
  },
];

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
        {/* Wheel Carousel Section */}
        <div className="space-y-4 flex flex-col items-center">
          <WheelCarousel slides={slides} />
        </div>

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
    </div>
  );
}
