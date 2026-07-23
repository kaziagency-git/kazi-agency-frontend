"use client";

import { motion } from "framer-motion";

interface ScoreCardProps {
  score: number;
}

function getScoreTone(score: number) {
  if (score >= 80) {
    return {
      ring: "from-emerald-400 to-teal-500",
      text: "text-emerald-300",
      badge: "Strong",
    };
  }

  if (score >= 60) {
    return {
      ring: "from-amber-300 to-orange-500",
      text: "text-amber-200",
      badge: "Needs Improvement",
    };
  }

  return {
    ring: "from-rose-400 to-red-500",
    text: "text-rose-200",
    badge: "Critical",
  };
}

export function ScoreCard({ score }: ScoreCardProps) {
  const clampedScore = Math.max(0, Math.min(100, score));
  const tone = getScoreTone(clampedScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-slate-200/70">Overall Business Score</p>
      <div className="mt-5 flex items-center gap-5">
        <div className={`flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br ${tone.ring} p-[3px]`}>
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-950/85">
            <span className="text-2xl font-bold text-white">{clampedScore}</span>
          </div>
        </div>

        <div>
          <p className={`text-lg font-semibold ${tone.text}`}>{tone.badge}</p>
          <p className="text-sm text-slate-200/80">AI evaluated from your submitted business context.</p>
        </div>
      </div>
    </motion.div>
  );
}
