"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  className?: string;
  titleClassName?: string;
  itemClassName?: string;
  triggerClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  iconClassName?: string;
}

export function FAQ({
  items,
  title = "Frequently Asked Questions",
  className = "",
  titleClassName = "text-slate-900",
  itemClassName = "bg-white border border-slate-200",
  triggerClassName = "hover:bg-slate-50",
  questionClassName = "text-slate-900",
  answerClassName = "border-slate-200 text-slate-600",
  iconClassName = "text-slate-500",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={`w-full ${className}`}>
      {title && <h2 className={`text-4xl font-bold mb-12 text-center ${titleClassName}`}>{title}</h2>}

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div key={index} className={`rounded-lg overflow-hidden ${itemClassName}`} initial={false}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className={`w-full px-6 py-4 flex items-center justify-between transition-colors ${triggerClassName}`}
            >
              <h3 className={`text-lg font-semibold text-left ${questionClassName}`}>{item.question}</h3>
              <ChevronDown
                className={`w-5 h-5 transition-transform flex-shrink-0 ml-4 ${iconClassName} ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{
                height: openIndex === index ? "auto" : 0,
                opacity: openIndex === index ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`px-6 py-4 border-t leading-relaxed ${answerClassName}`}>
                {item.answer}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
