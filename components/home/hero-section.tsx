"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import Script from "next/script";
import { PRIMARY } from "./constants";

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const handlePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      v.muted = false;
      await v.play();
      v.controls = true;
      setIsMuted(false);
      setIsPlaying(true);
    } catch (err) {
      // autoplay might be blocked — enable controls so user can start
      v.controls = true;
    }
  };

  const togglePlayPause = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIsPlaying(true);
    } else {
      v.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const enterFullScreen = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.requestFullscreen) {
      await v.requestFullscreen();
    } else if ((v as any).webkitEnterFullscreen) {
      (v as any).webkitEnterFullscreen();
    }
  };

  useEffect(() => {
    const v = videoRef.current;
    return () => {
      if (v && !v.paused) v.pause();
    };
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-6 bg-gradient-to-br from-white via-sky-50/50 to-blue-50 overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-[-6%] top-[-6%] w-96 h-96 rounded-full bg-gradient-to-tr from-[#046BAF]/30 to-[#7c3aed]/12 blur-2xl opacity-95 transform -translate-x-1/6 -translate-y-1/6" />
        <div className="absolute right-[-4%] bottom-[-4%] w-[520px] h-[520px] rounded-full bg-gradient-to-br from-[#06b6d4]/18 to-[#7c3aed]/12 blur-2xl opacity-90" />
        <svg className="absolute left-1/2 top-[-8%] -translate-x-1/2 w-[1000px] h-[480px] opacity-18" viewBox="0 0 1200 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="#046BAF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.08" />
            </linearGradient>
          </defs>
          <path d="M0 300 C200 100 400 100 600 300 C800 500 1000 500 1200 300 L1200 600 L0 600 Z" fill="url(#g1)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-blue-50 rounded-full border border-blue-200"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-600">All-In-One Sales & Marketing Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-semibold text-slate-900 mb-4"
            >
              We Help Brands Scale With Our All-In-One Sales & AI Marketing Technology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg text-slate-600 mb-6 max-w-xl"
            >
              Kazi Agency is the first-ever all-in-one platform that gives you unlimited marketing automation, lead generation, CRM management, and white-label solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-start"
            >
              <a href="#pricing" className={`${PRIMARY.bg} ${PRIMARY.bgHover} text-white px-8 py-4 rounded-lg font-bold text-lg transition-all`}>
                Pricing
              </a>
              <a href="#how-it-works" className={`border-2 ${PRIMARY.border} ${PRIMARY.text} px-8 py-4 rounded-lg font-bold text-lg hover:${PRIMARY.bg} transition-all`}>
                Our Services
              </a>
            </motion.div>
          </div>

          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              {videoError ? (
                <img
                  src="/thumb-hero-video.webp"
                  alt="Hero video thumbnail"
                  className="w-full h-[240px] md:h-[360px] lg:h-[460px] object-cover"
                />
              ) : (
                <video
                  ref={videoRef}
                  src="/home-hero-video.mp4"
                  className="w-full h-[240px] md:h-[360px] lg:h-[460px] object-cover bg-black"
                  playsInline
                  preload="metadata"
                  muted
                  poster="/thumb-hero-video.webp "
                  onError={() => setVideoError(true)}
                  onLoadedData={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    try {
                      v.pause();
                    } catch (e) {}
                  }}
                />
              )}

              {!isPlaying && !videoError && (
                <button
                  aria-label="Play video"
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40"
                >
                  <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 transition rounded-full p-4">
                    <Play className="w-12 h-12 text-white" />
                    <span className="text-white font-semibold text-lg hidden md:inline">Watch Video</span>
                  </div>
                </button>
              )}

              {isPlaying && (
                <div className="absolute left-4 bottom-4 flex items-center gap-3 bg-black/40 rounded-lg p-2">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-md text-white hover:bg-white/5"
                    aria-label={isPlaying ? "Pause" : "Play"}
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-md text-white hover:bg-white/5"
                    aria-label={isMuted ? "Unmute" : "Mute"}
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={enterFullScreen}
                    className="p-2 rounded-md text-white hover:bg-white/5"
                    aria-label="Fullscreen"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
