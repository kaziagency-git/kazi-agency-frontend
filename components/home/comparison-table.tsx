"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import ContactModal from "@/components/contact-modal";
import { PRIMARY } from "./constants";

const comparisonData = [
  { feature: "CRM & PIPELINE MANAGEMENT", replaces: "Pipedrive, HubSpot", otherTools: "$99/MONTHLY", hasKazi: true },
  { feature: "UNLIMITED SALES FUNNELS", replaces: "Leadpages, Unbounce", otherTools: "$297/MONTHLY", hasKazi: true },
  { feature: "WEBSITE BUILDER", replaces: "Webflow, Wix, Wordpress", otherTools: "$29/MONTHLY", hasKazi: true },
  { feature: "SURVEYS & FORMS", replaces: "Typeform, JotForm, Wufoo", otherTools: "$49/MONTHLY", hasKazi: true },
  { feature: "EMAIL MARKETING", replaces: "Mailchimp, ConvertKit", otherTools: "$99/MONTHLY", hasKazi: true },
  { feature: "2-WAY SMS MARKETING", replaces: "Twilio, SimpleTexting", otherTools: "$99/MONTHLY", hasKazi: true },
  { feature: "BOOKING & APPOINTMENTS", replaces: "Calendly, Acuity", otherTools: "$29/MONTHLY", hasKazi: true },
  { feature: "WORKFLOW AUTOMATIONS", replaces: "Zapier, Integromat", otherTools: "$169/MONTHLY", hasKazi: true },
  { feature: "COURSES/PRODUCTS", replaces: "Teachable, Kajabi", otherTools: "$99/MONTHLY", hasKazi: true },
  { feature: "CALL TRACKING", replaces: "CallRail, Nomorobo", otherTools: "$49/MONTHLY", hasKazi: true },
  { feature: "REPUTATION MANAGEMENT", replaces: "BrightLocal, Yext", otherTools: "$159/MONTHLY", hasKazi: true },
  { feature: "TRACKING & ANALYTICS", replaces: "Mixpanel", otherTools: "$299/MONTHLY", hasKazi: true },
  { feature: "COMMUNITIES", replaces: "Circle, Mighty Networks", otherTools: "$89/MONTHLY", hasKazi: true },
  { feature: "DOCUMENT SIGNING", replaces: "Docusign, HelloSign", otherTools: "$47/MONTHLY", hasKazi: true },
  { feature: "GRAY LABELED MOBILE APP", replaces: "", otherTools: "UNIQUE TO HIGHLEVEL", hasKazi: true },
  { feature: "WHITE LABELED DESKTOP APP", replaces: "", otherTools: "$5K + $499/MONTHLY", hasKazi: "Optional Add-On" },
  { feature: "SEO (Rank #1 Search Engine)", replaces: "Semrush, SE Ranking", otherTools: "$3500/MONTHLY", hasKazi: true },
  { feature: "Lead Generation", replaces: "Facebook Ads, Google Ads", otherTools: "$4500/MONTHLY", hasKazi: true },
];

export function ComparisonTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 px-6 bg-[#f0f7ff]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-[#046BAF]/10 border border-[#046BAF]/20">
            <span className="text-xs font-bold text-[#046BAF] tracking-widest uppercase">Why Choose Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4 text-balance">
            Compare Other Tools Pricing With Kazi Agency
          </h2>
          <p className="text-2xl font-bold text-[#046BAF] mb-2">
            Save Over $12,000+ Each Month On Sales & Marketing Tools
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="px-6 py-4 text-left font-bold">FEATURES</th>
                <th className="px-6 py-4 text-left font-bold">REPLACES</th>
                <th className="px-6 py-4 text-left font-bold">OTHER TOOLS</th>
                <th className="px-6 py-4 text-center font-bold">KAZI AGENCY</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-slate-200 ${i % 2 === 0 ? "bg-white" : "bg-slate-50"}`}
                >
                  <td className="px-6 py-4 font-semibold text-slate-900 text-sm">{row.feature}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm">{row.replaces || "—"}</td>
                  <td className="px-6 py-4 text-slate-600 text-sm font-medium">{row.otherTools}</td>
                  <td className="px-6 py-4 text-center">
                    {row.hasKazi === true ? (
                      <Check className="w-6 h-6 text-green-500 mx-auto" />
                    ) : (
                      <span className="text-xs font-semibold text-slate-600">{row.hasKazi}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-900 text-white">
                <td colSpan={2} className="px-6 py-4 font-bold">
                  OVERALL PRICE
                </td>
                <td className="px-6 py-4 font-bold">$15,111 PER MONTH</td>
                <td className="px-6 py-4 font-bold text-center">$2,495 PER MONTH</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <ContactModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />

          <button
            onClick={() => setIsModalOpen(true)}
            className={`${PRIMARY.bg} ${PRIMARY.bgHover} text-white px-8 py-4 rounded-lg font-bold text-lg transition-all inline-block`}
          >
            Join Kazi Agency Today!
          </button>
          <p className="text-slate-600 mt-4 font-semibold">Automate 90% Of Your Sales & Marketing Process</p>
        </motion.div>
      </div>
    </section>
  );
}
