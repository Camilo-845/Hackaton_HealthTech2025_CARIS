"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Save,
  UserIcon,
  LogOut,
  Stethoscope,
  Pill,
  Bell,
} from "lucide-react";
import { calcularSemanaGestacion } from "@/lib/utils/date-utils";
import type { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function MiInfoPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<User>({
    nombre: "",
    apellido: "",
    email: "",
    edad: 0,
    talla: 0,
    peso: 0,
    tipoSangre: "",
    fum: "",
    semanaGestacion: 0,
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }

    const parsedUser = JSON.parse(userData);
    setFormData(parsedUser);
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Recalculate gestational week if FUM changed
    if (formData.fum) {
      const semana = calcularSemanaGestacion(formData.fum);
      formData.semanaGestacion = semana;
    }

    // Save to localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cambios guardados",
        description: "Tu información ha sido actualizada correctamente.",
        className: "bg-[#aeebb8] border-[#aeebb8]",
      });
    }, 500);
  };

  const handleChange = (field: keyof User, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="min-h-screen pb-24">
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold">Mi Información</h1>
          <div className="w-20"></div>
        </div>
      </header>
      {/* Navigation Cards */}
      <div className="space-y-4 ">
        <div className="grid grid-cols-2 gap-4">
          {/* Vacunas */}
          <Link href="/vacunas">
            <Card className="border-2 hover:shadow-xl transition-all hover:scale-105 cursor-pointer bg-gradient-to-br from-[#bae4e2]/20 to-[#c0d0f1]/20">
              <CardContent className="p-6 space-y-3 text-center">
                <div className="w-14 h-14 mx-auto bg-[#bae4e2]/20 rounded-2xl flex items-center justify-center">
                  <Stethoscope className="w-7 h-7 text-[#bae4e2]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Vacunas</h4>
                  <p className="text-xs text-muted-foreground mt-1">Control</p>
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

      <main className="px-4 py-6 space-y-6">
        {/* Profile Header */}
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#c0d0f1] to-[#bae4e2] rounded-full flex items-center justify-center">
            <UserIcon className="w-12 h-12 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {formData.nombre} {formData.apellido}
            </h2>
            <p className="text-muted-foreground">
              Semana {formData.semanaGestacion} de gestación
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input
                    id="nombre"
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
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  className="rounded-xl"
                  disabled
                />
                <p className="text-xs text-muted-foreground">
                  El correo no puede ser modificado
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad</Label>
                  <Input
                    id="edad"
                    type="number"
                    value={formData.edad}
                    onChange={(e) =>
                      handleChange("edad", Number.parseInt(e.target.value))
                    }
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="talla">Talla (cm)</Label>
                  <Input
                    id="talla"
                    type="number"
                    value={formData.talla}
                    onChange={(e) =>
                      handleChange("talla", Number.parseInt(e.target.value))
                    }
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input
                    id="peso"
                    type="number"
                    value={formData.peso}
                    onChange={(e) =>
                      handleChange("peso", Number.parseInt(e.target.value))
                    }
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoSangre">Tipo de Sangre</Label>
                <Select
                  value={formData.tipoSangre}
                  onValueChange={(value) => handleChange("tipoSangre", value)}
                >
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
                <p className="text-xs text-muted-foreground">
                  La semana de gestación se calcula automáticamente desde esta
                  fecha
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="semanaGestacion">Semana de Gestación</Label>
                <Input
                  id="semanaGestacion"
                  type="number"
                  value={formData.semanaGestacion}
                  onChange={(e) =>
                    handleChange(
                      "semanaGestacion",
                      Number.parseInt(e.target.value),
                    )
                  }
                  className="rounded-xl"
                />
                <p className="text-xs text-muted-foreground">
                  Se actualiza automáticamente cada día basado en tu F.U.M.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full rounded-full bg-[#c0d0f1] hover:bg-[#c0d0f1]/90 text-foreground"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="border-2 bg-[#ffec61]/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{formData.semanaGestacion}</p>
              <p className="text-sm text-muted-foreground">Semanas</p>
            </CardContent>
          </Card>
          <Card className="border-2 bg-[#aeebb8]/10">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">
                {40 - formData.semanaGestacion}
              </p>
              <p className="text-sm text-muted-foreground">Semanas restantes</p>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          variant="outline"
          className="w-full rounded-full border-2 border-[#fe7b8b] text-[#fe7b8b] hover:bg-[#fe7b8b] hover:text-white bg-transparent"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </Button>
      </main>
    </div>
  );
}
