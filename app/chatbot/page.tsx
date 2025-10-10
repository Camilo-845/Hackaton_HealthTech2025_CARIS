"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Bot } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

const respuestasAutomaticas: Record<string, string> = {
  hola: "¡Hola! Soy Gestabot, tu asistente virtual de embarazo. ¿En qué puedo ayudarte hoy?",
  "cómo estás": "¡Estoy aquí para ayudarte! ¿Tienes alguna pregunta sobre tu embarazo?",
  náuseas:
    "Las náuseas son comunes en el embarazo. Te recomiendo: comer porciones pequeñas frecuentemente, evitar alimentos grasosos, y mantenerte hidratada. Si son muy severas, consulta con tu médico.",
  dolor:
    "Si experimentas dolor, es importante identificar su ubicación e intensidad. Para dolores leves, el descanso puede ayudar. Sin embargo, cualquier dolor intenso o persistente debe ser evaluado por tu médico inmediatamente.",
  alimentación:
    "Una dieta balanceada es esencial. Incluye: proteínas, frutas, verduras, granos integrales, y lácteos. Evita pescados con alto mercurio, carnes crudas, y quesos no pasteurizados. Consulta la sección de Nutrición para recetas.",
  ejercicio:
    "El ejercicio moderado es beneficioso durante el embarazo. Caminar, nadar, y yoga prenatal son excelentes opciones. Evita deportes de contacto y actividades de alto impacto. Consulta siempre con tu médico antes de comenzar.",
  vacunas:
    "Las vacunas importantes durante el embarazo incluyen: Influenza, Tdap (tos ferina), y COVID-19. Consulta la sección de Vacunas para más detalles sobre el calendario recomendado.",
  default:
    "Entiendo tu pregunta. Para información más específica, te recomiendo consultar con tu médico o explorar las diferentes secciones de la app. ¿Hay algo más en lo que pueda ayudarte?",
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy Gestabot, tu asistente virtual. Estoy aquí para responder tus preguntas sobre el embarazo. ¿En qué puedo ayudarte?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputText.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Generate bot response
    setTimeout(() => {
      const lowerInput = inputText.toLowerCase()
      let respuesta = respuestasAutomaticas.default

      for (const [key, value] of Object.entries(respuestasAutomaticas)) {
        if (lowerInput.includes(key)) {
          respuesta = value
          break
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: respuesta,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputText("")
  }

  return (
    <div className="min-h-screen flex flex-col pb-0">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/home" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#fe7b8b]/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-[#fe7b8b]" />
            </div>
            <h1 className="text-lg font-bold">Gestabot</h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[80%] border-2 ${
                message.sender === "user" ? "bg-[#c0d0f1]/20 border-[#c0d0f1]" : "bg-white border-border"
              }`}
            >
              <CardContent className="p-3">
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {message.timestamp.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </main>

      {/* Input */}
      <div className="border-t border-border bg-white/80 backdrop-blur-sm p-4">
        <form onSubmit={handleSend} className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="rounded-full"
          />
          <Button
            type="submit"
            size="icon"
            className="rounded-full bg-[#fe7b8b] hover:bg-[#fe7b8b]/90 text-white flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
