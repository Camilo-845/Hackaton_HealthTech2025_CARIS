import type { ContenidoSemanal } from "@/lib/types";

export const contenidoSemanal: ContenidoSemanal[] = [
  {
    semana: 1,
    titulo: "Primera Semana",
    descripcion: "El comienzo de tu viaje",
    informacion: [
      "En tu primera semana es importante que te alimentes bien y gestiones tus emociones",
      "Tu cuerpo está comenzando a prepararse para el embarazo",
      "Es fundamental mantener una dieta balanceada rica en ácido fólico",
    ],
    consejos: [
      "Comienza a tomar ácido fólico si aún no lo haces",
      "Mantén una hidratación adecuada",
      "Evita el alcohol y el tabaco",
      "Descansa lo suficiente",
    ],
    micronutrientes: ["Ácido Fólico", "Hierro", "Calcio"],
  },
  {
    semana: 8,
    titulo: "Semana 8",
    descripcion: "Desarrollo importante",
    informacion: [
      "Tu bebé está desarrollando sus órganos principales",
      "Es normal sentir náuseas matutinas",
      "El corazón de tu bebé late aproximadamente 150 veces por minuto",
    ],
    consejos: [
      "Come pequeñas porciones frecuentes para controlar las náuseas",
      "Mantén una buena ingesta de proteínas",
      "Continúa con tus vitaminas prenatales",
    ],
    micronutrientes: ["Vitamina B6", "Proteínas", "Omega-3"],
  },
  {
    semana: 12,
    titulo: "Semana 12",
    descripcion: "Fin del primer trimestre",
    informacion: [
      "Has completado el primer trimestre",
      "El riesgo de aborto espontáneo disminuye significativamente",
      "Tu bebé mide aproximadamente 5-6 cm",
    ],
    consejos: [
      "Programa tu primera ecografía si no la has hecho",
      "Comienza a usar cremas hidratantes para prevenir estrías",
      "Mantén una rutina de ejercicio suave",
    ],
    micronutrientes: ["Vitamina D", "Calcio", "Hierro"],
  },
  {
    semana: 20,
    titulo: "Semana 20",
    descripcion: "Mitad del embarazo",
    informacion: [
      "¡Has llegado a la mitad de tu embarazo!",
      "Podrás sentir los movimientos de tu bebé con más frecuencia",
      "Es tiempo de la ecografía morfológica",
    ],
    consejos: [
      "Programa tu ecografía de la semana 20",
      "Comienza ejercicios de Kegel",
      "Mantén una postura correcta para evitar dolores de espalda",
    ],
    micronutrientes: ["Hierro", "Proteínas", "Vitamina C"],
  },
  {
    semana: 28,
    titulo: "Semana 28",
    descripcion: "Inicio del tercer trimestre",
    informacion: [
      "Comienzas el tercer y último trimestre",
      "Tu bebé pesa aproximadamente 1 kg",
      "Los pulmones de tu bebé continúan madurando",
    ],
    consejos: [
      "Realiza el test de glucosa si tu médico lo indica",
      "Comienza a pensar en tu plan de parto",
      "Practica técnicas de respiración",
    ],
    micronutrientes: ["Hierro", "Calcio", "Ácidos Grasos Omega-3"],
  },
  {
    semana: 36,
    titulo: "Semana 36",
    descripcion: "Preparándote para el parto",
    informacion: [
      "Tu bebé está casi listo para nacer",
      "Pesa aproximadamente 2.5-2.7 kg",
      "Se está posicionando para el parto",
    ],
    consejos: [
      "Prepara tu maleta para el hospital",
      "Practica ejercicios de respiración diariamente",
      "Descansa todo lo que puedas",
      "Mantén contacto regular con tu médico",
    ],
    micronutrientes: ["Hierro", "Vitamina K", "Calcio"],
  },
];

export function obtenerContenidoSemana(semana: number): ContenidoSemanal {
  // Find the closest week content
  const contenido =
    contenidoSemanal.find((c) => c.semana === semana) ||
    contenidoSemanal.reduce((prev, curr) =>
      Math.abs(curr.semana - semana) < Math.abs(prev.semana - semana)
        ? curr
        : prev,
    );

  return contenido;
}
