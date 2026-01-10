"use client";

import { useState } from "react";
import { Modal, Checkbox } from "@/components/ui";
import { Settings, BarChart3, Star, ArrowRight } from "lucide-react";

const features = [
    {
        icon: BarChart3,
        title: "Ranking inteligente",
        description:
            "Ordenado automáticamente por tu Bull Track Score personal.",
    },
    {
        icon: Settings,
        title: "Análisis profundo",
        description: "Indicadores productivos clave visibles a primera vista.",
    },
    {
        icon: Star,
        title: "Herramientas",
        description:
            "Filtros avanzados, comparador de toros y detalles genéticos.",
    },
];

export default function OnboardingModal() {
    // Initialize based on sessionStorage (only runs on client)
    const [isOpen, setIsOpen] = useState(() => {
        if (typeof window === "undefined") return false;
        return !sessionStorage.getItem("onboarding-dismissed");
    });
    const [dontShowAgain, setDontShowAgain] = useState(false);

    const handleClose = () => {
        if (dontShowAgain) {
            sessionStorage.setItem("onboarding-dismissed", "true");
        }
        setIsOpen(false);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div
                className='rounded-3xl p-6 pb-6 pt-32 flex flex-col gap-6'
                style={{
                    background:
                        "linear-gradient(181deg, rgba(91, 248, 170, 1) 28%, rgba(45, 60, 53, 1) 40%, rgba(25, 30, 28, 1) 91%)",
                }}
            >
                {/* Header */}
                <div className='flex gap-6 items-start'>
                    <div className='flex-1 flex flex-col gap-2'>
                        <h2 className='text-2xl font-semibold text-[#d9d9d9]'>
                            Ranking personalizado según tus criterios
                        </h2>
                        <p className='text-base text-[#d9d9d9]'>
                            Los resultados están ordenados por Bulltrack Score
                            que reflejan tus objetivos de producción
                        </p>
                    </div>
                    <Settings className='w-6 h-6 text-brand-green shrink-0' />
                </div>

                {/* Features card */}
                <div className='bg-sidebar-card rounded-lg p-4 flex flex-col gap-4'>
                    <p className='text-xs font-medium text-white/50 uppercase tracking-wider'>
                        ¿Qué vas a encontrar?
                    </p>

                    <div className='grid grid-cols-3 gap-4'>
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className='flex flex-col gap-1 p-3'
                            >
                                <div className='flex items-center gap-2'>
                                    <feature.icon className='w-6 h-6 text-brand-green' />
                                    <span className='text-sm text-white'>
                                        {feature.title}
                                    </span>
                                </div>
                                <p className='text-sm text-[#d9d9d9] pl-8'>
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                        <Checkbox
                            checked={dontShowAgain}
                            onChange={setDontShowAgain}
                        />
                        <span className='text-sm text-[#d9d9d9]'>
                            No volver a mostrar este mensaje
                        </span>
                    </div>

                    <button
                        onClick={handleClose}
                        className='flex items-center gap-2 px-4 py-3 bg-brand-green-hover border border-brand-green rounded-xl'
                    >
                        <span className='text-sm font-semibold text-brand-green'>
                            Ver ranking
                        </span>
                        <ArrowRight className='w-6 h-6 text-brand-green' />
                    </button>
                </div>
            </div>
        </Modal>
    );
}
