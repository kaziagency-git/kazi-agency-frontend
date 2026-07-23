import type { Metadata } from "next";
import AppointmentSchedulingPage from "./appointment-scheduling-page";

export const metadata: Metadata = {
  title: "Booking & Appointment Scheduling | Kazi Agency",
  description:
    "A fully integrated appointment scheduling system that syncs with your CRM, sends automated SMS & email reminders, handles no-shows, and runs post-appointment follow-ups. Go live in under 2 weeks.",
  keywords: [
    "appointment scheduling software",
    "booking system for small business",
    "automated appointment reminders",
    "CRM integrated booking system",
    "Calendly alternative",
    "online booking system",
    "automated scheduling software",
    "no-show reduction",
    "GoHighLevel scheduling",
    "booking automation",
  ],
  authors: [{ name: "Kazi Agency" }],
  creator: "Kazi Agency",
  publisher: "Kazi Agency",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
  alternates: {
    canonical: "https://kaziagency.com/services/appointment-scheduling",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kaziagency.com/services/appointment-scheduling",
    siteName: "Kazi Agency",
    title: "Booking & Appointment Scheduling | Kazi Agency",
    description:
      "Stop playing phone tag. Kazi Agency builds a fully automated booking system with CRM integration, SMS reminders, and post-appointment follow-ups — live in under 2 weeks.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kazi Agency — Booking & Appointment Scheduling",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Booking & Appointment Scheduling | Kazi Agency",
    description:
      "Fully integrated appointment scheduling with CRM sync, automated reminders, and no-show follow-ups. The Calendly replacement that actually grows your business.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function Page() {
  return <AppointmentSchedulingPage />;
}
