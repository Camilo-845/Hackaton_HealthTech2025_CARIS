"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const teamMembers = [
  {
    name: "Isabella Orejarena",
    role: "Enfermería",
    avatar: "/Profiles/IsabellaProfile.jpg",
    fallback: "IO",
  },
  {
    name: "Angella Sanchez",
    role: "Enfermería",
    avatar: "/Profiles/AngellaProfile.jpg",
    fallback: "AS",
  },
  {
    name: "Camilo Sarmiento",
    role: "Ingeniería de Sistemas",
    avatar: "/Profiles/CamiloProfile.jpg",
    fallback: "CS",
  },
  {
    name: "Rossimar Jimenez",
    role: "Ingeniería de Sistemas",
    avatar: "/Profiles/RossimarProfile.jpg",
    fallback: "RJ",
  },
  {
    name: "Santiago Cavadia",
    role: "Ingeniería Electrónica",
    avatar: "/Profiles/SantiagoProfile.jpg",
    fallback: "SC",
  },
];

export default function AboutUs() {
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectMember = (index: number) => {
    const angle = (index / teamMembers.length) * 360;
    setRotation(-angle);
    setSelectedIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/Lati2osLogo.png"
              alt="Lati2os Logo"
              width={180}
              height={50}
            />
          </Link>
        </div>
        <div className="flex gap-2 text-[#FE7AA5]">
          <Button variant="ghost" asChild>
            <Link href="/sobre-nosotros">Sobre Nostros</Link>
          </Button>
        </div>
        <div className="flex gap-2 text-[#FE7AA5]">
          <Button variant="ghost" asChild>
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6 pb-2">
            <div className="flex flex-col items-center space-y-4 text-center ">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#FE7AA5]">
                Sobre Nosotros
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Somos un equipo interdiciplinario de estudiantes conectados bajo
                una misma sintonia de este grandioso proyecto llamado Lati2 del
                que hemos dado y seguiremos dando lo mejor de nosotros.
              </p>
            </div>
          </div>
          <div className="container px-4 md:px-6">
            <Image
              src="/placeholder.jpg"
              alt="Team Banner"
              width={600}
              height={200}
              className="w-full rounded-lg object-cover"
            />
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-8">
              <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl text-[#FE7AA5]">
                Nuestro Equipo
              </h2>
              <div className="relative w-full max-w-lg h-96 flex items-center justify-center">
                <div
                  className="absolute w-full h-full transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    willChange: "transform",
                  }}
                >
                  {teamMembers.map((member, index) => {
                    const angle = (index / teamMembers.length) * 360;
                    const radius = 150;
                    const x = Math.cos((angle - 90) * (Math.PI / 180)) * radius;
                    const y = Math.sin((angle - 90) * (Math.PI / 180)) * radius;

                    return (
                      <div
                        key={member.name}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                        }}
                        onMouseEnter={() => handleSelectMember(index)}
                        onClick={() => handleSelectMember(index)}
                      >
                        <Avatar
                          className={`w-24 h-24 border-4 border-gray dark:border-gray-800 transition-transform duration-500 ease-in-out`}
                          style={{
                            transform: `rotate(${-rotation}deg) scale(${selectedIndex === index ? 1.4 : 1})`,
                            willChange: "transform",
                          }}
                        >
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.fallback}</AvatarFallback>
                        </Avatar>
                      </div>
                    );
                  })}
                </div>
                <div className="absolute text-center">
                  <h3 className="text-xl font-bold">
                    {teamMembers[selectedIndex].name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {teamMembers[selectedIndex].role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
