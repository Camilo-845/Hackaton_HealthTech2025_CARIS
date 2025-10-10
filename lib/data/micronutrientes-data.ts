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
  },
  {
    id: "vitamina-d",
    nombre: "Vitamina D",
    descripcion: "Vitamina esencial que ayuda al cuerpo a absorber el calcio y mantener huesos saludables.",
    beneficios: [
      "Mejora la absorción de calcio",
      "Fortalece el sistema inmunológico",
      "Apoya el desarrollo óseo del bebé",
      "Reduce el riesgo de complicaciones",
    ],
    fuentesAlimenticias: [
      "Pescados grasos (salmón, atún)",
      "Yemas de huevo",
      "Leche fortificada",
      "Hongos expuestos al sol",
      "Exposición solar moderada",
    ],
    dosisRecomendada: "600 UI diarios",
    importanciaPorSemana: [
      {
        inicio: 1,
        fin: 40,
        razon: "Trabaja en conjunto con el calcio durante todo el embarazo",
      },
    ],
    color: "#ffec61",
  },
  {
    id: "omega-3",
    nombre: "Omega-3 (DHA)",
    descripcion: "Ácidos grasos esenciales cruciales para el desarrollo cerebral y visual del bebé.",
    beneficios: [
      "Desarrolla el cerebro y los ojos del bebé",
      "Reduce el riesgo de parto prematuro",
      "Mejora el desarrollo cognitivo",
      "Apoya la salud cardiovascular materna",
    ],
    fuentesAlimenticias: [
      "Salmón y pescados grasos",
      "Nueces y semillas de chía",
      "Semillas de linaza",
      "Aceite de pescado",
      "Huevos enriquecidos con omega-3",
    ],
    dosisRecomendada: "200-300 mg de DHA diarios",
    importanciaPorSemana: [
      {
        inicio: 13,
        fin: 40,
        razon: "El cerebro del bebé se desarrolla rápidamente en el segundo y tercer trimestre",
      },
    ],
    color: "#bae4e2",
  },
  {
    id: "yodo",
    nombre: "Yodo",
    descripcion: "Mineral esencial para la producción de hormonas tiroideas que regulan el metabolismo.",
    beneficios: [
      "Apoya el desarrollo cerebral del bebé",
      "Regula la función tiroidea",
      "Previene el hipotiroidismo congénito",
      "Mantiene el metabolismo saludable",
    ],
    fuentesAlimenticias: ["Sal yodada", "Pescados y mariscos", "Productos lácteos", "Huevos", "Algas marinas"],
    dosisRecomendada: "220 mcg diarios",
    importanciaPorSemana: [
      {
        inicio: 1,
        fin: 40,
        razon: "Crítico para el desarrollo neurológico durante todo el embarazo",
      },
    ],
    color: "#d7e874",
  },
  {
    id: "vitamina-c",
    nombre: "Vitamina C",
    descripcion: "Antioxidante que ayuda en la absorción de hierro y fortalece el sistema inmunológico.",
    beneficios: [
      "Mejora la absorción de hierro",
      "Fortalece el sistema inmunológico",
      "Ayuda en la formación de colágeno",
      "Protege contra infecciones",
    ],
    fuentesAlimenticias: [
      "Naranjas y cítricos",
      "Fresas y kiwi",
      "Pimientos rojos y verdes",
      "Brócoli y tomates",
      "Papaya y mango",
    ],
    dosisRecomendada: "85 mg diarios",
    importanciaPorSemana: [
      {
        inicio: 1,
        fin: 40,
        razon: "Necesaria durante todo el embarazo para la absorción de hierro y salud inmune",
      },
    ],
    color: "#ffb3a3",
  },
  {
    id: "vitamina-b12",
    nombre: "Vitamina B12",
    descripcion: "Vitamina esencial para la formación de glóbulos rojos y el desarrollo del sistema nervioso.",
    beneficios: [
      "Apoya el desarrollo del sistema nervioso",
      "Previene la anemia megaloblástica",
      "Ayuda en la formación de ADN",
      "Mantiene la salud neurológica",
    ],
    fuentesAlimenticias: [
      "Carnes y aves",
      "Pescados y mariscos",
      "Huevos y lácteos",
      "Cereales fortificados",
      "Levadura nutricional",
    ],
    dosisRecomendada: "2.6 mcg diarios",
    importanciaPorSemana: [
      {
        inicio: 1,
        fin: 40,
        razon: "Esencial para el desarrollo neurológico durante todo el embarazo",
      },
    ],
    color: "#ff95ac",
  },
]
