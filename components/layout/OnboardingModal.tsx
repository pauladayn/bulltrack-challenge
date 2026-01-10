"use client";

import { useEffect, useState } from "react";
import { Modal } from "@/components/ui";
import { BadgeCheck, ArrowRight, Check } from "lucide-react";
import { ONBOARDING_FEATURES, STORAGE_KEYS } from "@/lib/constants";


export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dismissed = sessionStorage.getItem(STORAGE_KEYS.ONBOARDING_DISMISSED);
    if (!dismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      sessionStorage.setItem(STORAGE_KEYS.ONBOARDING_DISMISSED, "true");
    }
    setIsOpen(false);
  };

  if (!mounted) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div
        className="rounded-3xl p-6 pt-32 flex flex-col"
        style={{
            background: "var(--modal-gradient)",
            boxShadow: "var(--modal-shadow)",
          }}
      >
        {/* Header */}
        <div className="flex gap-6 items-start px-[18px]">
          <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-modal-text leading-5">
              Ranking personalizado según tus criterios
            </h2>
            <p className="text-base text-modal-text">
              Los resultados están ordenados por Bulltrack Score que reflejan
              tus objetivos de producción
            </p>
          </div>
          <BadgeCheck className="w-6 h-6 text-brand-green shrink-0" />
        </div>

        {/* Features card */}
        <div className="bg-modal-card-bg rounded-[8px] p-4 flex flex-col gap-2 mt-6 mx-[18px]">
          <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
            ¿Qué vas a encontrar?
          </p>

          <div className="grid grid-cols-3 gap-4">
            {ONBOARDING_FEATURES.map((feature) => (
              <div key={feature.title} className="flex flex-col px-3 py-2">
                <div className="flex items-center gap-2">
                  <feature.icon className="w-6 h-6 text-brand-green shrink-0" />
                  <span className="text-sm text-white">{feature.title}</span>
                </div>
                <p className="text-sm text-modal-text mt-1">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 px-[18px]">
          {/* Checkbox container */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDontShowAgain(!dontShowAgain)}
          >
            <div
              className={`w-6 h-6 rounded-[8px] border-[1.5px] flex items-center justify-center transition-colors ${
                dontShowAgain
                  ? "bg-brand-green border-brand-green"
                  : "border-modal-checkbox-border bg-transparent"
              }`}
            >
              {dontShowAgain && (
                <Check className="w-4 h-4 text-sidebar" strokeWidth={3} />
              )}
            </div>
            <span className="text-sm font-normal text-modal-text leading-4">
              No volver a mostrar este mensaje
            </span>
          </div>

          {/* Button */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center gap-2 w-[150px] h-10 px-3 py-4 bg-modal-button-bg border border-modal-button-accent rounded-xl"
          >
            <span className="text-sm font-semibold text-modal-button-accent">
              Ver ranking
            </span>
            <ArrowRight className="w-5 h-5 text-modal-button-accent" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </Modal>
  );
}