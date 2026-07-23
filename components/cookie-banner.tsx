"use client";

import { useState, useEffect } from "react";
import Script from "next/script";
import Link from "next/link";

const GA_ID = "G-7RKH4852JQ";
const CONSENT_KEY = "cookie_consent";

export default function CookieBanner() {
  const [consent, setConsent] = useState<"accepted" | "declined" | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY) as "accepted" | "declined" | null;
    if (stored) {
      setConsent(stored);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  return (
    <>
      {consent === "accepted" && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {visible && (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-100 p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 mb-1">We use cookies</p>
              <p className="text-sm text-slate-500 leading-relaxed">
                We use cookies to improve your experience, analyze site traffic, and personalise content. By clicking{" "}
                <span className="font-medium text-slate-700">Accept</span>, you agree to our use of cookies.{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#046BAF] underline underline-offset-2 hover:text-[#035a94] transition-colors"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={decline}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="cursor-pointer px-5 py-2 text-sm font-semibold text-white bg-[#046BAF] hover:bg-[#035a94] rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
