"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Upload, CheckCircle } from "lucide-react";
import type { CalificacionPlato, User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";
import StarRating from "@/components/ui/star-rating";

export default function CalificacionPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [imagenPreview, setImagenPreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trimestre, setTrimestre] = useState("Primer Trimestre");
  const [analysisResult, setAnalysisResult] = useState<{
    rating: number;
    opinions: string[];
    suggestions: string[];
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) {
      toast({
        title: "Error",
        description: "Por favor selecciona una imagen",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await fetch(
        "https://ae18ec11bee2.ngrok-free.app/analyze-recipe",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Error al analizar la receta");
      }

      const result = await response.json();
      setAnalysisResult(result);

      toast({
        title: "¡Plato analizado!",
        description: "Tu comida ha sido analizada con éxito.",
        className: "bg-green-100 border-green-300",
        icon: <CheckCircle className="text-green-600" />,
      });
    } catch (error) {
      console.error("Error analyzing recipe:", error);
      toast({
        title: "Error",
        description: "No se pudo analizar la receta. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Toaster />
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 py-3 flex items-center justify-between">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/nutricion" className="gap-2 text-gray-600">
              <ArrowLeft className="w-4 h-4" />
              Volver
            </Link>
          </Button>
          <h1 className="text-lg font-bold text-gray-800">Registrar Comida</h1>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="border-2 shadow-lg rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4 text-center">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Sube una foto de tu plato
                  </h2>
                  <p className="text-gray-500">
                    Captura lo que estás comiendo para que podamos darte una
                    retroalimentación personalizada.
                  </p>
                </div>

                {/* Image Upload */}
                <div className="relative group">
                  {imagenPreview ? (
                    <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-dashed border-gray-300">
                      <Image
                        src={imagenPreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          variant="secondary"
                          className="rounded-full"
                          onClick={() => {
                            setImagenPreview("");
                            setImageFile(null);
                          }}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Cambiar Foto
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors">
                      <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                        <Upload className="w-12 h-12" />
                        <p className="text-lg font-semibold">
                          Toca para subir una foto
                        </p>
                        <p className="text-sm">PNG, JPG, o WEBP</p>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-full bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-bold text-lg py-6 shadow-lg transition-transform hover:scale-105"
                  disabled={isSubmitting || !imagenPreview}
                >
                  {isSubmitting ? "Analizando..." : "Analizar Plato"}
                </Button>
              </form>
              {analysisResult && (
                <div className="mt-6 space-y-4">
                  <div className="flex items-center">
                    <p className="mr-2 font-bold text-lg">Calificación:</p>
                    <StarRating rating={analysisResult.rating} />
                  </div>

                  <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Opiniones</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {analysisResult.opinions &&
                        analysisResult.opinions.map((opinion, index) => (
                          <li key={index}>{opinion}</li>
                        ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Sugerencias</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {analysisResult.suggestions &&
                        analysisResult.suggestions.map((suggestion, index) => (
                          <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
