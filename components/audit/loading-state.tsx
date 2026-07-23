"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const statusItems = [
  "Analyzing your website positioning",
  "Reviewing growth opportunities",
  "Building your branded Kazi Agency report",
];

// Animated dot indicator component
function AnimatedDot({ delay }: { delay: number }) {
  return (
    <motion.div
      className="h-2 w-2 rounded-full bg-cyan-300"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.5, repeat: Infinity, delay }}
    />
  );
}

export function LoadingState() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-white/[0.02] p-8 backdrop-blur-xl"
    >
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, 20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, -15, 0],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="relative mt-1 flex-shrink-0">
            <motion.div
              className="relative h-12 w-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-300 border-r-cyan-300/50" />
              
              {/* Inner pulsing circle */}
              <motion.div
                className="absolute inset-1 rounded-full border border-cyan-300/30"
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-cyan-200" />
              </div>
            </motion.div>
          </div>

          <div className="flex-1">
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-lg font-semibold text-white"
            >
              Generating your free business audit...
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="mt-1 flex items-center gap-2 text-sm text-slate-200/75"
            >
              <span>Powered by AI</span>
              <div className="flex gap-1">
                <AnimatedDot delay={0} />
                <AnimatedDot delay={0.3} />
                <AnimatedDot delay={0.6} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Status items */}
        <div className="space-y-2">
          {statusItems.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.12, duration: 0.4 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-slate-900/30 px-4 py-3 text-sm text-slate-100 transition-all duration-300 hover:border-white/20 hover:bg-slate-900/50"
            >
              {/* Animated gradient background on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* Content */}
              <div className="relative flex items-center gap-3">
                <motion.div
                  className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}
                />
                <span>{item}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer message */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="flex items-center justify-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs text-slate-300/80"
        >
          <Zap className="h-3.5 w-3.5 text-cyan-300" />
          <span>This usually takes a few seconds</span>
        </motion.div>
      </div>
    </motion.section>
  );
}
