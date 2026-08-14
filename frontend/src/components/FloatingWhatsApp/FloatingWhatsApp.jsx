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
      className="fixed bottom-6 right-6 z-[9999] pointer-events-auto"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center justify-center p-3.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 hover:scale-105 active:scale-95"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        {/* Subtle Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-35 animate-ping -z-10" />

        {/* WhatsApp Icon */}
        <FontAwesomeIcon icon={faWhatsapp} className="text-2xl shrink-0" />

        {/* Expandable Label on Hover with zero artifact when collapsed */}
        <span className="max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-hover:ml-2.5 transition-all duration-300 ease-out overflow-hidden whitespace-nowrap text-sm font-semibold">
          Chat on WhatsApp
        </span>
      </a>
    </aside>
  );
}
