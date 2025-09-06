'use client';

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface KimoyoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  beads?: number;
  orbitDuration?: number;
  ringRadius?: number;
  beadSize?: number;
  beadColor?: string;
  glowColor?: string;
  intensity?: "subtle" | "medium" | "bold";
  variant?: "primary" | "secondary" | "live";
  size?: "sm" | "md" | "lg" | "xl";
}

export default function KimoyoButton({
  children,
  beads = 16,
  orbitDuration = 15,
  ringRadius = 40,
  beadSize = 3,
  beadColor,
  glowColor,
  intensity = "medium",
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: KimoyoButtonProps) {
  const reduce = useReducedMotion();

  // Caretaker Harp King color schemes
  const variants = {
    primary: {
      bg: "bg-gradient-to-r from-green-500 via-green-600 to-green-700",
      hoverBg: "hover:from-green-400 hover:via-green-500 hover:to-green-600",
      text: "text-black",
      beadColor: "rgba(34, 197, 94, 0.8)", // green-500
      glowColor: "rgba(34, 197, 94, 0.3)",
      shadow: "shadow-green-500/25"
    },
    secondary: {
      bg: "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700",
      hoverBg: "hover:from-purple-400 hover:via-purple-500 hover:to-purple-600",
      text: "text-white",
      beadColor: "rgba(168, 85, 247, 0.8)", // purple-500
      glowColor: "rgba(168, 85, 247, 0.3)",
      shadow: "shadow-purple-500/25"
    },
    live: {
      bg: "bg-gradient-to-r from-red-500 via-red-600 to-red-700",
      hoverBg: "hover:from-red-400 hover:via-red-500 hover:to-red-600",
      text: "text-white",
      beadColor: "rgba(239, 68, 68, 0.8)", // red-500
      glowColor: "rgba(239, 68, 68, 0.3)",
      shadow: "shadow-red-500/25"
    }
  };

  const sizes = {
    sm: { padding: "px-4 py-2", text: "text-sm", ringRadius: 28, beadSize: 2 },
    md: { padding: "px-6 py-3", text: "text-base", ringRadius: 36, beadSize: 3 },
    lg: { padding: "px-8 py-4", text: "text-lg", ringRadius: 44, beadSize: 4 },
    xl: { padding: "px-12 py-6", text: "text-xl", ringRadius: 52, beadSize: 5 }
  };

  const intensityMap = {
    subtle: { glow: 0.15, pulse: 0.03, hoverBoost: 1.02 },
    medium: { glow: 0.25, pulse: 0.06, hoverBoost: 1.05 },
    bold: { glow: 0.35, pulse: 0.1, hoverBoost: 1.08 },
  };

  const currentVariant = variants[variant];
  const currentSize = sizes[size];
  const I = intensityMap[intensity];

  // Use provided colors or variant defaults
  const finalBeadColor = beadColor || currentVariant.beadColor;
  const finalGlowColor = glowColor || currentVariant.glowColor;
  const finalRingRadius = ringRadius || currentSize.ringRadius;
  const finalBeadSize = beadSize || currentSize.beadSize;

  const beadsArr = Array.from({ length: beads });

  return (
    <div 
      className="relative inline-grid place-items-center" 
      style={{ padding: finalRingRadius / 2 }}
    >
      {/* Button */}
      <motion.button
        className={[
          "relative z-10 select-none rounded-2xl font-bold",
          currentVariant.bg,
          currentVariant.hoverBg,
          currentVariant.text,
          currentSize.padding,
          currentSize.text,
          `shadow-2xl ${currentVariant.shadow}`,
          "ring-2 ring-white/10",
          "transition-all duration-300",
          "focus:outline-none focus:ring-4 focus:ring-white/20",
          "active:scale-[0.98]",
          className,
        ].join(" ")}
        whileHover={{ scale: I.hoverBoost }}
        whileTap={{ scale: 0.98 }}
        onClick={props.onClick}
        disabled={props.disabled}
        type={props.type}
        form={props.form}
        name={props.name}
        value={props.value}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </motion.button>

      {/* Orbiting beads */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 grid place-items-center"
          animate={{ rotate: 360 }}
          transition={{ 
            duration: orbitDuration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        >
          <div
            className="relative"
            style={{ 
              width: finalRingRadius * 2 + finalBeadSize * 2, 
              height: finalRingRadius * 2 + finalBeadSize * 2 
            }}
          >
            {beadsArr.map((_, i) => {
              const angle = (i / beads) * Math.PI * 2;
              const x = Math.cos(angle) * finalRingRadius;
              const y = Math.sin(angle) * finalRingRadius;
              const delay = (i / beads) * 2;

              return (
                <motion.span
                  key={i}
                  className="absolute rounded-full"
                  initial={{ opacity: 0.4, scale: 1 }}
                  animate={{ 
                    opacity: [0.4, 0.8, 0.4], 
                    scale: [1, 1 + I.pulse, 1] 
                  }}
                  transition={{ 
                    duration: 3, 
                    delay, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  style={{
                    width: finalBeadSize,
                    height: finalBeadSize,
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    background: finalBeadColor,
                    boxShadow: `0 0 ${finalBeadSize * 2}px ${finalBeadSize * 0.5}px ${finalGlowColor}`,
                  }}
                />
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}