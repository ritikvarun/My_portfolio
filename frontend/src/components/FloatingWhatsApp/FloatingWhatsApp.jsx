"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { getSettings } from "@/lib/api";

const resolveWhatsappUrl = (val) => {
  if (!val) return "https://wa.me/919808843521";
  if (val.startsWith("http://") || val.startsWith("https://")) {
    return val;
  }
  let digits = val.replace(/\D/g, "");
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  return `https://wa.me/${digits || "919808843521"}`;
};

export default function FloatingWhatsApp() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const whatsappUrl = resolveWhatsappUrl(settings?.whatsappUrl || "9808843521");

  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[99999] pointer-events-auto select-none"
      style={{
        bottom: "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 1rem))",
        right: "max(1.25rem, calc(env(safe-area-inset-right, 0px) + 1rem))",
      }}
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative isolate flex items-center justify-center w-12 h-12 sm:w-auto sm:h-auto p-3 sm:p-3.5 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white rounded-full shadow-2xl shadow-emerald-500/50 hover:shadow-emerald-500/70 transition-all duration-300 hover:scale-105 active:scale-95 touch-manipulation cursor-pointer"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-40 animate-ping pointer-events-none -z-10" />

        {/* WhatsApp Icon with explicit sizing */}
        <FontAwesomeIcon icon={faWhatsapp} className="w-6 h-6 sm:w-7 sm:h-7 text-2xl shrink-0 block" />

        {/* Expandable Label on Hover (Desktop) */}
        <span className="hidden sm:inline-block max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2.5 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap text-sm font-semibold">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
