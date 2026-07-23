"use client";

import { motion } from "framer-motion";
import { Zap, Search, BarChart3, Users, Mail, Bot } from "lucide-react";

const features = [
  {
    title: "Create Full Websites, Funnels & Landing Pages",
    description: "Our intuitive platform allows you to create full featured websites with custom menus. Create high-performing and captivating landing pages all in one place!",
    icon: Zap,
  },
  {
    title: "Drag & Drop Surveys and Forms",
    description: "Built right in is the ability to capture leads through Surveys and capture forms. You can integrate directly with our page builder or embed them on your own sites.",
    icon: Search,
  },
  {
    title: "Online Appointment Scheduling",
    description: "Capture appointments and request appointments. We've built our own calendar application within Kazi Agency so you can capture the appointment all in one straightforward flow.",
    icon: BarChart3,
  },
  {
    title: "Multi-Channel Follow-up Campaigns",
    description: "Our Multi-channel follow up campaigns allow you to automate engaging follow ups and capture engaged responses from your leads.",
    icon: Users,
  },
  {
    title: "Two-Way Communication on Any Device",
    description: "Our full featured mobile app allows you to communicate with your leads on all devices through Phone, SMS, Email, and Facebook Messenger.",
    icon: Mail,
  },
  {
    title: "Fully Automated Lead Management",
    description: "Automatically nurture leads into customers with AI-powered conversations and customizable messaging workflows.",
    icon: Bot,
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
            <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Platform Features</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
            Powerful Features Built For Growth
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Everything you need to capture, nurture, and close leads without the complexity
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-[#f8fbff] rounded-2xl border border-blue-100 hover:border-[#046BAF] hover:bg-blue-50 transition-all"
              >
                <Icon className="w-8 h-8 text-[#046BAF] mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
