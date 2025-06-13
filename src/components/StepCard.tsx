"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface StepCardProps {
  icon: string;
  title: string;
  rowStart: string;
  from: { x?: number; y?: number; opacity?: number };
}

export function StepCard({ icon, title, rowStart, from }: StepCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className={`row-span-4 ${rowStart} bg-white shadow-xl rounded-2xl py-20 flex flex-col items-center`}
      initial={from}
      animate={isInView ? { x: 0, y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <img src={icon} alt={title} className="h-20 mb-4" />
      <h3 className="text-lg font-bold">{title}</h3>
    </motion.div>
  );
}
