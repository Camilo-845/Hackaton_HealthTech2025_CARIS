export interface User {
  nombre: string
  apellido: string
  email: string
  edad: number
  talla: number
  peso: number
  tipoSangre: string
  fum: string
  semanaGestacion: number
}

export interface Vacuna {
  id: string
  nombre: string
  descripcion: string
  semanaRecomendada: number
  aplicada: boolean
  fechaAplicacion?: string
}

export interface Cita {
  id: string
  fecha: string
  hora: string
  motivo: string
  lugar: string
  notas?: string
}

export interface Receta {
  id: string
  nombre: string
  imagen: string
  ingredientes: string[]
  instrucciones: string[]
  beneficios: string[]
  micronutrientes: string[]
}

export interface CalificacionPlato {
  id: string
  imagen: string
  calificacion: number
  descripcion: string
  fecha: string
  semanaGestacion: number
}

export interface Ejercicio {
  id: string
  nombre: string
  tipo: "estimulacion" | "fisico"
  descripcion: string
  instrucciones: string[]
  semanaRecomendada: number
  duracion?: string
  repeticiones?: string
  imagen?: string
  precauciones?: string[]
  dificultad?: "baja" | "media" | "alta"
}

export interface ContenidoSemanal {
  semana: number
  titulo: string
  descripcion: string
  informacion: string[]
  consejos: string[]
  micronutrientes: string[]
}
