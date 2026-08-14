"use client";
import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Mouse & physics tracking
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    // Disable on touch devices
    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0)
    ) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instantly position the center dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target;
      const isInteractive =
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("select") ||
          target.closest("[role='button']") ||
          target.closest(".cursor-pointer") ||
          window.getComputedStyle(target).cursor === "pointer");

      setIsHovered(!!isInteractive);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Smooth lerp loop for the outer ring
    const render = () => {
      const lerpFactor = 0.18;
      ring.current.x += (mouse.current.x - ring.current.x) * lerpFactor;
      ring.current.y += (mouse.current.y - ring.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    rafId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.25s ease, width 0.3s cubic-bezier(0.25, 1, 0.5, 1), height 0.3s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.3s ease, border-color 0.3s ease",
        }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform ${
          isHovered
            ? isClicked
              ? "w-10 h-10 border-2 border-zinc-800 bg-zinc-900/20 backdrop-blur-[1px] scale-90"
              : "w-14 h-14 border border-zinc-700 bg-zinc-800/10 backdrop-blur-[1px] shadow-lg shadow-black/5"
            : isClicked
            ? "w-7 h-7 border border-zinc-700 bg-zinc-900/15 scale-90"
            : "w-9 h-9 border border-zinc-500/70 bg-zinc-400/5 shadow-sm"
        }`}
      />

      {/* Inner Precision Dot */}
      <div
        ref={dotRef}
        style={{
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.2s ease, transform 0.05s ease-out, scale 0.2s ease",
        }}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none will-change-transform ${
          isHovered
            ? "w-2.5 h-2.5 bg-zinc-900 ring-2 ring-zinc-400/50 scale-125"
            : isClicked
            ? "w-1.5 h-1.5 bg-zinc-900 scale-75"
            : "w-2 h-2 bg-zinc-800 shadow-sm"
        }`}
      />
    </div>
  );
};

export default CustomCursor;
