"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faPhone,
  faArrowUp,
  faCopy,
  faCheck,
  faLocationDot,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
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

const Footer = () => {
  const [settings, setSettings] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  const email = settings?.contactEmail || "ritikvarun64@gmail.com";
  const phone = settings?.contactPhone || "9808433521";
  const whatsappUrl = resolveWhatsappUrl(settings?.whatsappUrl || "9808843521");
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#f8fafc] text-slate-900 border-t border-slate-200/90 pt-20 pb-12 overflow-hidden">
      {/* Ambient background soft light aura */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vmax] h-[400px] bg-gradient-to-b from-slate-200/40 via-emerald-500/[0.03] to-transparent blur-3xl pointer-events-none -z-1" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 space-y-16">
        {/* Top CTA & Contact Hub */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Heading & Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 space-y-6"
          >
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-mono font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Opportunities
            </div>

            {/* Display Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.15]">
              Let’s create something{" "}
              <span className="font-serif italic font-normal text-slate-600" style={{ fontFamily: "Georgia, serif" }}>
                extraordinary
              </span>{" "}
              together.
            </h2>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
              Have a project in mind, want to discuss web development, or just say hi? My inbox is always open.
            </p>

            {/* Direct Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={gmailUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                <span>Say Hello</span>
                <FontAwesomeIcon icon={faArrowRight} className="text-xs ml-1" />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold text-sm shadow-xs hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-emerald-600 text-base" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Contact Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Email Contact Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                  <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  <FontAwesomeIcon icon={copied ? faCheck : faCopy} className={copied ? "text-emerald-600" : ""} />
                  <span>{copied ? "Copied!" : "Copy"}</span>
                </button>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Email Me At
                </p>
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors break-all mt-1 inline-block"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Phone Contact Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <FontAwesomeIcon icon={faPhone} className="text-base" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Call & WhatsApp
                </p>
                <a
                  href={`tel:${phone}`}
                  className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition-colors mt-1 inline-block"
                >
                  {phone}
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800">
                <FontAwesomeIcon icon={faLocationDot} className="text-base" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                  Location
                </p>
                <p className="text-sm sm:text-base font-bold text-slate-900 mt-1">
                  Agra, Uttar Pradesh, India
                </p>
              </div>
            </div>

            {/* Social Quick Links Matrix */}
            <div className="p-5 rounded-2xl bg-slate-900 text-white shadow-md flex flex-col justify-between space-y-4">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Social Networks
              </p>
              <div className="flex items-center gap-2.5">
                {settings?.githubUrl && (
                  <a
                    href={settings.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-slate-900 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faGithub} className="text-lg" />
                  </a>
                )}
                {settings?.linkedinUrl && (
                  <a
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-slate-900 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                  </a>
                )}
                {settings?.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-slate-900 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                  >
                    <FontAwesomeIcon icon={faInstagram} className="text-lg" />
                  </a>
                )}
                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Gmail"
                  title="Open Gmail to send message"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white hover:text-slate-900 text-white flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar: Copyright, Nav Links & Back To Top */}
        <div className="pt-8 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-sm text-slate-500 font-normal text-center sm:text-left">
            <p>© {new Date().getFullYear()} <strong className="text-slate-800 font-semibold">Ritik Varun</strong></p>
          </div>

          {/* Quick Nav & Back to Top */}
          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-slate-950 transition-colors">
                Home
              </Link>
              <Link href="/about" className="hover:text-slate-950 transition-colors">
                About
              </Link>
              <Link href="/projects" className="hover:text-slate-950 transition-colors">
                Projects
              </Link>
            </nav>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-200 cursor-pointer shadow-2xs"
            >
              <span>TOP</span>
              <FontAwesomeIcon icon={faArrowUp} className="text-[10px]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
