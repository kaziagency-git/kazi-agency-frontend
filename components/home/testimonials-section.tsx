"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Star, Sparkles, Play } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

const testimonials = [
  {
    video: "/video/review-1.mp4",
    text: "Kazi Agency transformed our entire marketing operation. We saved thousands per month and tripled our leads.",
    author: "Sarah Johnson",
    title: "Marketing Director",
    rating: 5,
  },
  {
    video: "/video/review-2.mp4",
    text: "The automation workflows are incredible. What used to take our team days now happens automatically.",
    author: "Mike Chen",
    title: "CEO, Tech Startup",
    rating: 5,
  },
  {
    video: "/video/review-3.mp4",
    text: "Finally, one platform that does everything we need. No more juggling 10 different tools.",
    author: "Jessica Martinez",
    title: "Agency Owner",
    rating: 5,
  },
  {
    video: "/video/review-4.mp4",
    text: "The team made the entire process simple and our results improved faster than we expected.",
    author: "David Thompson",
    title: "Business Owner",
    rating: 5,
  },
];

export function TestimonialsSection() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlay = async (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    videoRefs.current.forEach((otherVideo, otherIndex) => {
      if (otherIndex !== index && otherVideo && !otherVideo.paused) {
        otherVideo.pause();
      }
    });

    try {
      await video.play();
      setPlayingIndex(index);
    } catch {
      setPlayingIndex(index);
    }
  };

  const handlePause = (index: number) => {
    const video = videoRefs.current[index];
    if (video) video.pause();
    setPlayingIndex((current) => (current === index ? null : current));
  };

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
      setPlayingIndex(null);
      setSelectedIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="relative overflow-hidden bg-[#f0f7ff] px-6 py-24 text-slate-900">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[-15%] h-80 w-80 rounded-full bg-[#046BAF]/12 blur-3xl" />
        <div className="absolute right-[-10%] bottom-[-20%] h-112 w-md rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(4,107,175,0.08),transparent_42%),linear-gradient(180deg,rgba(248,250,252,1),rgba(241,245,249,1))]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#046BAF]/10 bg-white/80 px-4 py-2 text-sm font-semibold text-[#046BAF] shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-[#046BAF]" />
            Real client video reviews
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl text-balance">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-lg text-slate-600 md:text-xl">
            A modern video slider that lets visitors watch quick customer stories without leaving the page.
          </p>
        </motion.div>

        <Carousel opts={{ loop: true }} setApi={setApi} className="relative">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-slate-600">
              Swipe or use the arrows to browse all {testimonials.length} reviews.
            </p>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="static h-11 w-11 border border-slate-200 bg-white text-slate-900 shadow-lg shadow-slate-200/70 hover:bg-slate-50 hover:text-slate-900" />
              <CarouselNext className="static h-11 w-11 border border-slate-200 bg-white text-slate-900 shadow-lg shadow-slate-200/70 hover:bg-slate-50 hover:text-slate-900" />
            </div>
          </div>

          <CarouselContent className="-ml-6">
            {testimonials.map((testimonial, i) => (
              <CarouselItem key={i} className="pl-6 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="group h-full rounded-4xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/70 transition duration-300 hover:-translate-y-1 hover:border-[#046BAF]/30 hover:shadow-2xl"
                >
                  <div className="pt-0">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600">
                        Verified
                      </span>
                    </div>

                    <p className="text-lg leading-relaxed text-slate-700 text-balance">
                      &quot;{testimonial.text}&quot;
                    </p>

                    <div className="mt-5 border-t border-slate-200 pt-4">
                      <p className="font-semibold text-slate-900">{testimonial.author}</p>
                      <p className="text-sm text-slate-300">{testimonial.title}</p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.author}
              type="button"
              onClick={() => api?.scrollTo(index)}
              className={`h-2.5 rounded-full transition-all ${
                index === selectedIndex ? "w-10 bg-[#046BAF]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
