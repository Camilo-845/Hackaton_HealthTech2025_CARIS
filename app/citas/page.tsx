"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, CalendarIcon, Clock, MapPin, Edit, Trash2 } from "lucide-react"
import type { Cita } from "@/lib/types"
import { formatearFecha } from "@/lib/utils/date-utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function CitasPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [citas, setCitas] = useState<Cita[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCita, setEditingCita] = useState<Cita | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [formData, setFormData] = useState({
    fecha: format(selectedDate || new Date(), "yyyy-MM-dd"),
    hora: "",
    motivo: "",
    lugar: "",
    notas: "",
  })

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const savedCitas = localStorage.getItem("citas")
    if (savedCitas) {
      setCitas(JSON.parse(savedCitas))
    }
  }, [router])

  useEffect(() => {
    localStorage.setItem("citas", JSON.stringify(citas))
  }, [citas])

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fecha: format(selectedDate || new Date(), "yyyy-MM-dd"),
    }))
  }, [selectedDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingCita) {
      // Update existing cita
      const updatedCitas = citas.map((c) =>
        c.id === editingCita.id
          ? {
              ...c,
              ...formData,
            }
          : c,
      )
      setCitas(updatedCitas)
      localStorage.setItem("citas", JSON.stringify(updatedCitas))
      toast({
        title: "Cita actualizada",
        description: "La cita ha sido actualizada correctamente",
        className: "bg-[#c0d0f1] border-[#c0d0f1]",
      })
    } else {
      // Create new cita
      const nuevaCita: Cita = {
        id: Date.now().toString(),
        ...formData,
      }
      const updatedCitas = [...citas, nuevaCita]
      setCitas(updatedCitas)
      localStorage.setItem("citas", JSON.stringify(updatedCitas))
      toast({
        title: "Cita creada",
        description: "La cita ha sido agregada correctamente",
        className: "bg-[#aeebb8] border-[#aeebb8]",
      })
    }

    setFormData({ fecha: format(selectedDate || new Date(), "yyyy-MM-dd"), hora: "", motivo: "", lugar: "", notas: "" })
    setEditingCita(null)
    setIsDialogOpen(false)
  }

  const handleEdit = (cita: Cita) => {
    setEditingCita(cita)
    setFormData({
      fecha: cita.fecha,
      hora: cita.hora,
      motivo: cita.motivo,
      lugar: cita.lugar,
      notas: cita.notas || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    const updatedCitas = citas.filter((c) => c.id !== id)
    setCitas(updatedCitas)
    localStorage.setItem("citas", JSON.stringify(updatedCitas))
    toast({
      title: "Cita eliminada",
      description: "La cita ha sido eliminada correctamente",
      variant: "destructive",
    })
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const citasDelDia = citas.filter(
    (cita) => {
      const citaDate = new Date(cita.fecha);
      const sDate = selectedDate || new Date();
      return (
        citaDate.getFullYear() === sDate.getFullYear() &&
        citaDate.getMonth() === sDate.getMonth() &&
        citaDate.getDate() === sDate.getDate()
      );
    }
  ).sort((a, b) => {
    const dateA = new Date(`${a.fecha}T${a.hora}`)
    const dateB = new Date(`${b.fecha}T${b.hora}`)
    return dateA.getTime() - dateB.getTime()
  })

  const getCitaStatus = (cita: Cita) => {
    const citaDate = new Date(`${cita.fecha}T${cita.hora}`)
    const now = new Date()
    const diffHours = (citaDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (diffHours < 0) {
      return { status: "pasada", color: "bg-muted" }
    } else if (diffHours <= 2) {
      return { status: "próxima", color: "bg-[#fe7b8b]" }
    } else if (diffHours <= 24) {
      return { status: "hoy", color: "bg-[#ffec61]" }
    } else {
      return { status: "programada", color: "bg-[#c0d0f1]" }
    }
  }

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
          <h1 className="text-lg font-bold">Mis Citas</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Info Banner */}
        <Card className="border-2 bg-gradient-to-br from-[#ff95ac]/20 to-[#fe7b8b]/20">
          <CardContent className="p-4 flex gap-3">
            <CalendarIcon className="w-6 h-6 text-[#fe7b8b] flex-shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-sm font-semibold">Control de Citas Médicas</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Organiza tus citas prenatales y recibe recordatorios oportunos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Calendar */}
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date) => {
            setSelectedDate(date)
            setIsDialogOpen(true)
            setEditingCita(null)
            setFormData((prev) => ({
              ...prev,
              fecha: format(date || new Date(), "yyyy-MM-dd"),
              hora: "",
              motivo: "",
              lugar: "",
              notas: "",
            }))
          }}
          initialFocus
          locale={es}
          className="w-full max-w-lg mx-auto rounded-md border shadow"
          classNames={{
            day_today: "bg-[#ffe0e6] text-foreground",
          }}
        />

        {/* Add/Edit Cita Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{editingCita ? "Editar Cita" : "Nueva Cita"}</DialogTitle>
              <DialogDescription>
                {editingCita ? "Actualiza los detalles de tu cita" : "Agrega una nueva cita médica"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => handleChange("fecha", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hora">Hora</Label>
                  <Input
                    id="hora"
                    type="time"
                    value={formData.hora}
                    onChange={(e) => handleChange("hora", e.target.value)}
                    required
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo de la Cita</Label>
                <Input
                  id="motivo"
                  placeholder="Ej: Control prenatal, Ecografía"
                  value={formData.motivo}
                  onChange={(e) => handleChange("motivo", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lugar">Lugar</Label>
                <Input
                  id="lugar"
                  placeholder="Ej: Hospital Central, Consultorio Dr. García"
                  value={formData.lugar}
                  onChange={(e) => handleChange("lugar", e.target.value)}
                  required
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notas">Notas (opcional)</Label>
                <Textarea
                  id="notas"
                  placeholder="Información adicional..."
                  value={formData.notas}
                  onChange={(e) => handleChange("notas", e.target.value)}
                  className="rounded-xl"
                />
              </div>
              <Button type="submit" className="w-full rounded-full bg-[#ff95ac] hover:bg-[#ff95ac]/90 text-white">
                {editingCita ? "Actualizar Cita" : "Guardar Cita"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Appointments List for Selected Day */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Citas programadas</h2>
          {citas.length > 0 ? (
            citas.map((cita) => {
              const { status, color } = getCitaStatus(cita)

              return (
                <Card key={cita.id} className="border-2">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <h3 className="font-bold text-sm mb-1">{cita.motivo}</h3>
                          <Badge variant="secondary" className={`${color} text-foreground text-xs`}>
                            {status}
                          </Badge>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(cita)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => handleDelete(cita.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <CalendarIcon className="w-4 h-4" />
                          <span>{formatearFecha(cita.fecha)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{cita.hora}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{cita.lugar}</span>
                        </div>
                      </div>

                      {cita.notas && (
                        <div className="bg-muted/50 rounded-xl p-3">
                          <p className="text-xs text-muted-foreground">{cita.notas}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">No tienes citas programadas para este día</p>
                <p className="text-xs text-muted-foreground mt-1">Selecciona un día en el calendario para agregar una cita</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}