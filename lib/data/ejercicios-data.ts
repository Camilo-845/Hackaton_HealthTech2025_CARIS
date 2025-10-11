import type { Ejercicio } from "@/lib/types"

export const ejerciciosEstimulacion: Ejercicio[] = [
  {
    id: "e1",
    nombre: "Masaje Abdominal Suave",
    tipo: "estimulacion",
    descripcion: "Masaje circular suave en el abdomen para conectar con tu bebé y estimular su desarrollo sensorial.",
    instrucciones: [
      "Siéntate o recuéstate en una posición cómoda",
      "Aplica aceite o crema hidratante en tus manos",
      "Observa el video para aprender la técnica de masaje",
      "Habla o canta suavemente mientras masajeas",
      "Continúa por 5-10 minutos",
    ],
    semanaRecomendada: 16,
    duracion: "5-10 minutos",
    recursoInteractivo: {
      tipo: "video",
      contenido: "https://www.youtube.com/embed/hJ1MAH0Kggc",
    },
  },
  {
    id: "e2",
    nombre: "Estimulación Musical",
    tipo: "estimulacion",
    descripcion: "Exponer al bebé a música suave para estimular su desarrollo auditivo y crear un vínculo emocional.",
    instrucciones: [
      "Ponte cómoda y busca un lugar tranquilo.",
      "Dale play a la música y relájate.",
      "Coloca tus manos en tu vientre y siente la música con tu bebé.",
      "Observa las reacciones de tu bebé, puede que sientas suaves movimientos.",
      "Realiza esta actividad 2-3 veces al día por 10-15 minutos",
    ],
    semanaRecomendada: 20,
    duracion: "10-15 minutos",
    recursoInteractivo: {
      tipo: "musica",
      contenido: [
        {
          titulo: "MTurkish March",
          url: "/music/Mozart.mp3",
        },
        {
          titulo: "Twinkle Twinkle Little Star",
          url: "/music/Twinkle.mp3",
        },
      ],
    },
  },
  {
    id: "e3",
    nombre: "Lectura en Voz Alta",
    tipo: "estimulacion",
    descripcion: "Leer cuentos o hablar con tu bebé para estimular el reconocimiento de tu voz.",
    instrucciones: [
      "Elige uno de los cuentos de la lista.",
      "Siéntate cómodamente",
      "Lee en voz alta con entonación clara",
      "Coloca tu mano en el abdomen mientras lees",
      "Practica diariamente por 10-15 minutos",
    ],
    semanaRecomendada: 24,
    duracion: "10-15 minutos",
    recursoInteractivo: {
      tipo: "texto",
      contenido: [
        {
          titulo: "El Sol y la Luna",
          texto: "Había una vez un Sol muy grande y una Luna muy brillante que vivían en el cielo. Se querían mucho y les encantaba jugar juntos. Un día, decidieron jugar a las escondidas. La Luna se escondió detrás de una nube y el Sol la buscó por todo el cielo. Cuando la encontró, se rieron tanto que iluminaron todo el universo.",
        },
        {
          titulo: "La Estrellita Viajera",
          texto: "Una pequeña estrella quería conocer el mundo. Cada noche, viajaba un poquito más lejos. Vio planetas de colores, cometas brillantes y nubes de algodón. Estaba muy feliz de ver tantas cosas nuevas. Cuando volvía a casa, le contaba a sus hermanas estrellas todas sus aventuras.",
        },
        {
          titulo: "El Bebé Curioso",
          texto: "Dentro de una barriguita muy calentita, vivía un bebé muy curioso. Le encantaba escuchar la voz de su mamá y sentir sus caricias. A veces, daba pataditas de alegría. Estaba deseando conocer el mundo de fuera y dar un gran abrazo a su mamá.",
        },
      ],
    },
  },
  {
    id: "e4",
    nombre: "Estimulación Táctil con Luz",
    tipo: "estimulacion",
    descripcion: "Usar luz suave para estimular la respuesta visual del bebé en desarrollo.",
    instrucciones: [
      "Busca un lugar oscuro y tranquilo.",
      "Activa la animación de luz.",
      "Mueve tu teléfono lentamente sobre tu abdomen.",
      "Observa si tu bebé responde con movimientos",
      "Practica por 5 minutos, 1-2 veces al día",
    ],
    semanaRecomendada: 28,
    duracion: "5 minutos",
    recursoInteractivo: {
      tipo: "animacion",
      contenido: "LuzSuave",
    },
  },
]

export const ejerciciosFisicos: Ejercicio[] = [
  {
    id: "f1",
    nombre: "Caminata Prenatal",
    tipo: "fisico",
    descripcion: "Ejercicio cardiovascular de bajo impacto ideal para todas las etapas del embarazo.",

    instrucciones: [
      "Usa calzado cómodo y de soporte",
      "Comienza con 10-15 minutos",
      "Mantén un ritmo moderado donde puedas conversar",
      "Hidrátate antes, durante y después",
      "Aumenta gradualmente hasta 30 minutos",
    ],
    semanaRecomendada: 8,
    duracion: "20-30 minutos",
    dificultad: "baja",
    precauciones: ["Evita terrenos irregulares", "No camines en clima extremo", "Detente si sientes mareos"],
  },
  {
    id: "f2",
    nombre: "Ejercicios de Kegel",
    tipo: "fisico",
    descripcion: "Fortalecimiento del suelo pélvico para preparar el parto y prevenir incontinencia.",
    instrucciones: [
      "Identifica los músculos del suelo pélvico (como si detuvieras la orina)",
      "Contrae estos músculos por 5 segundos",
      "Relaja por 5 segundos",
      "Repite 10 veces",
      "Realiza 3 series al día",
    ],
    semanaRecomendada: 12,
    duracion: "5-10 minutos",
    dificultad: "baja",
  },
  {
    id: "f4",
    nombre: "Sentadillas Prenatales",
    tipo: "fisico",
    descripcion: "Fortalecimiento de piernas y preparación para el parto.",
    instrucciones: [
      "Párate con los pies separados al ancho de los hombros",
      "Baja lentamente como si fueras a sentarte",
      "Mantén la espalda recta y el peso en los talones",
      "Baja solo hasta donde te sientas cómoda",
      "Sube lentamente a la posición inicial",
    ],
    semanaRecomendada: 20,
    duracion: "5-10 minutos",
    dificultad: "media",
    precauciones: ["Usa una silla para apoyo si es necesario", "No bajes demasiado", "Detente si sientes presión"],
  },
]
