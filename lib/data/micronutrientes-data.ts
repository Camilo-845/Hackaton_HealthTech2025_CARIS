export interface Micronutriente {
  id: string
  nombre: string
  descripcion: string
  beneficios: string[]
  fuentesAlimenticias: string[]
  dosisRecomendada: string
  importanciaPorSemana: {
    inicio: number
    fin: number
    razon: string
  }[]
  color: string
}

export const micronutrientes: Micronutriente[] = [
  {
    id: "acido-folico",
    nombre: "Ácido Fólico",
    descripcion:
      "Vitamina B9 esencial para el desarrollo del tubo neural del bebé y la formación de células sanguíneas.",
    beneficios: [
      "Previene defectos del tubo neural",
      "Ayuda en la formación de glóbulos rojos",
      "Reduce el riesgo de anemia",
      "Apoya el crecimiento celular rápido",
    ],
    fuentesAlimenticias: [
      "Espinacas y vegetales de hoja verde",
      "Lentejas y frijoles",
      "Naranjas y cítricos",
      "Aguacate",
      "Cereales fortificados",
    ],
    dosisRecomendada: "400-800 mcg diarios",
    importanciaPorSemana: [
      {
        inicio: 1,
        fin: 12,
        razon: "Crítico para prevenir defectos del tubo neural durante el primer trimestre",
      },
    ],
    color: "#aeebb8",
  },
  {
    id: "hierro",
    nombre: "Hierro",
    descripcion: "Mineral esencial para la producción de hemoglobina y el transporte de oxígeno en la sangre.",
    beneficios: [
      "Previene la anemia durante el embarazo",
      "Transporta oxígeno al bebé",
      "Apoya el desarrollo cerebral del bebé",
      "Aumenta los niveles de energía",
    ],
    fuentesAlimenticias: [
      "Carnes rojas magras",
      "Pollo y pescado",
      "Espinacas y acelgas",
      "Lentejas y garbanzos",
      "Cereales fortificados",
    ],
    dosisRecomendada: "27 mg diarios",
    importanciaPorSemana: [
      {
        inicio: 13,
        fin: 40,
        razon: "El volumen sanguíneo aumenta significativamente en el segundo y tercer trimestre",
      },
    ],
    color: "#ff95ac",
  },
  {
    id: "calcio",
    nombre: "Calcio",
    descripcion: "Mineral fundamental para el desarrollo de huesos y dientes del bebé.",
    beneficios: [
      "Desarrolla huesos y dientes fuertes del bebé",
      "Mantiene la salud ósea materna",
      "Regula la función nerviosa y muscular",
      "Ayuda en la coagulación sanguínea",
    ],
    fuentesAlimenticias: [
      "Leche y productos lácteos",
      "Yogur y queso",
      "Brócoli y col rizada",
      "Sardinas con espinas",
      "Almendras y semillas de sésamo",
    ],
    dosisRecomendada: "1000-1300 mg diarios",
    importanciaPorSemana: [
      {
        inicio: 1,
        fin: 40,
        razon: "Necesario durante todo el embarazo para el desarrollo esquelético del bebé",
      },
    ],
    color: "#c0d0f1",
  }
]
