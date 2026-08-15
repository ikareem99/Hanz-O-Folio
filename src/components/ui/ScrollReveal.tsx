import { motion } from "framer-motion";
import type { ReactNode } from "react";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  yOffset = 30,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Framer-style ease out curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
