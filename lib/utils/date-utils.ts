export function calcularSemanaGestacion(fum: string): number {
  const fumDate = new Date(fum)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - fumDate.getTime())
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  return diffWeeks
}

export function calcularDiaEnSemana(fum: string): number {
  const fumDate = new Date(fum)
  const today = new Date()
  const diffTime = Math.abs(today.getTime() - fumDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays % 7
}

export function formatearFecha(fecha: string): string {
  const date = new Date(`${fecha}T00:00:00`)
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function obtenerFechaRecomendadaVacuna(fum: string, semanaRecomendada: number): Date {
  const fumDate = new Date(fum)
  const diasHastaSemana = semanaRecomendada * 7
  const fechaRecomendada = new Date(fumDate.getTime() + diasHastaSemana * 24 * 60 * 60 * 1000)
  return fechaRecomendada
}

export function diasHastaFecha(fecha: Date): number {
  const today = new Date()
  const diffTime = fecha.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}
