import type { Vacuna } from "@/lib/types"

export const vacunasPrenatales: Vacuna[] = [
  {
    id: "1",
    nombre: "Influenza (Gripe)",
    descripcion:
      "La vacuna contra la influenza protege a la madre y al bebé de complicaciones graves. Es segura en cualquier trimestre del embarazo.",
    semanaRecomendada: 12,
    aplicada: false,
  },
  {
    id: "2",
    nombre: "Tdap (Tétanos, Difteria y Tos Ferina)",
    descripcion:
      "Esta vacuna protege al bebé de la tos ferina durante los primeros meses de vida. Se recomienda entre las semanas 27 y 36.",
    semanaRecomendada: 28,
    aplicada: false,
  },
  {
    id: "3",
    nombre: "Hepatitis B",
    descripcion:
      "Si no has sido vacunada previamente, esta vacuna protege contra la hepatitis B, que puede transmitirse al bebé durante el parto.",
    semanaRecomendada: 8,
    aplicada: false,
  },
  {
    id: "4",
    nombre: "COVID-19",
    descripcion:
      "La vacuna contra COVID-19 es segura y recomendada durante el embarazo para proteger a la madre y al bebé de complicaciones graves.",
    semanaRecomendada: 12,
    aplicada: false,
  },
  {
    id: "5",
    nombre: "Vacuna Anti-D (RhoGAM)",
    descripcion:
      "Para madres con Rh negativo, esta vacuna previene problemas de incompatibilidad sanguínea entre madre y bebé.",
    semanaRecomendada: 28,
    aplicada: false,
  },
]
