"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Moon, Compass, ChevronDown, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import logo from "../images/Logo.png";
import appleIcon from "../images/Apple.png";
import moon01 from "../images/Moon01.png";
import moon02 from "../images/Moon02.png";
import moon03 from "../images/Moon03.png";
import moon04 from "../images/Moon04.png";
import moon05 from "../images/Moon05.png";
import moon06 from "../images/Moon06.png";
import moon07 from "../images/Moon07.png";
import heroLandscape from "../images/Photo001.webp";
import principlesBackground from "../images/Foto01.jpg";

const BASE_PATH = "/EonBook";

// Real app screenshots mapping
const SCREENSHOTS = {
  bookshelf: `${BASE_PATH}/screenshots/002.jpg`,
  reader: `${BASE_PATH}/screenshots/008A.png`,
  philosophy: `${BASE_PATH}/screenshots/003.jpg`,
  experience: `${BASE_PATH}/screenshots/004.jpg`,
  highlights: `${BASE_PATH}/screenshots/010.PNG`,
  thoughts: `${BASE_PATH}/screenshots/005.jpg`,
  moonProfile: `${BASE_PATH}/screenshots/006.PNG`,
};

// Interface for iPhone mockup
interface IPhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
}

const IPhoneFrame: React.FC<IPhoneFrameProps> = ({ src, alt, className = "" }) => {
  return (
    <div className={`relative mx-auto flex w-full max-w-[280px] sm:max-w-[310px] aspect-[9/19] rounded-[48px] border-[6px] border-neutral-900 bg-black shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] outline outline-1 outline-accent-gold/20 p-2 z-10 ${className}`}>
      {/* Dynamic Island / Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-5 bg-neutral-900 rounded-full z-30 flex items-center justify-between px-3">
        <div className="w-2.5 h-2.5 bg-neutral-950 rounded-full border border-neutral-800/40"></div>
        <div className="w-4 h-1.5 bg-neutral-950 rounded-full border border-neutral-800/40"></div>
      </div>
      
      {/* Screen Container */}
      <div className="relative min-h-0 w-full flex-1 rounded-[38px] overflow-hidden bg-[#0B0B0C]">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover select-none pointer-events-none"
        />
        {/* Subtle glass overlay reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20"></div>
      </div>
    </div>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moonPhase, setMoonPhase] = useState(2); // Default to Half Moon
  const [carouselIndex, setCarouselIndex] = useState(0);
  const autoProgressRef = useRef<NodeJS.Timeout | null>(null);

  // Auto progression for Moon Phase (stops if user taps)
  const [isAutoProgressing, setIsAutoProgressing] = useState(true);

  useEffect(() => {
    if (isAutoProgressing) {
      autoProgressRef.current = setInterval(() => {
        setMoonPhase((prev) => (prev + 1) % 7);
      }, 5000);
    }
    return () => {
      if (autoProgressRef.current) clearInterval(autoProgressRef.current);
    };
  }, [isAutoProgressing]);

  useEffect(() => {
    const screenshotPreloaders = Object.values(SCREENSHOTS).map((src) => {
      const image = new window.Image();
      image.src = src;
      return image;
    });

    return () => {
      screenshotPreloaders.forEach((image) => {
        image.src = "";
      });
    };
  }, []);

  const handleMoonPhaseClick = (index: number) => {
    setIsAutoProgressing(false);
    if (autoProgressRef.current) clearInterval(autoProgressRef.current);
    setMoonPhase(index);
  };

  const moonPhasesData = [
    { name: "New Moon", shortName: "New", image: moon01, desc: "Everything begins where nothing is seen.", requirement: "0 Hours" },
    { name: "Glimmer", shortName: "Glimmer", image: moon02, desc: "A quiet light starts to form.", requirement: "60 Hours" },
    { name: "Rising", shortName: "Rising", image: moon03, desc: "You begin to rise above yourself.", requirement: "140 Hours" },
    { name: "Half-Lit", shortName: "Half-Lit", image: moon04, desc: "You are no longer where you started.", requirement: "260 Hours" },
    { name: "Waxing Glow", shortName: "Waxing", image: moon05, desc: "Growth becomes your new nature.", requirement: "440 Hours" },
    { name: "Near Full", shortName: "Near Full", image: moon06, desc: "You are standing at the edge of completion.", requirement: "700 Hours" },
    { name: "Full Moon", shortName: "Full", image: moon07, desc: "You are fully seen.", requirement: "1,200 Hours" },
  ];

  const carouselItems = [
    { title: "Bookshelf", img: SCREENSHOTS.bookshelf, desc: "A quiet room for your digital library. Beautiful custom typography covers present your literature without commercial clutter." },
    { title: "Reader", img: SCREENSHOTS.reader, desc: "Built entirely for comfort. Impeccable margins, optimized typeface spacing, and zero distraction." },
    { title: "Highlights", img: SCREENSHOTS.highlights, desc: "A personal commonplace book. Tap to save passages, preserve wisdom, and return to them in a single, focused journal." },
    { title: "Thoughts", img: SCREENSHOTS.thoughts, desc: "Write alongside the margins. Record your reflections, build connections, and develop your own philosophy." },
    { title: "Moon Profile", img: SCREENSHOTS.moonProfile, desc: "Watch your devotion reflect in the lunar cycles. A quiet metric of time well spent in literature." },
  ];

  const nextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
  };

  const prevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  // Generate background stars
  const starsArray = [
    { top: "12%", left: "15%", size: 1, type: "star-slow" },
    { top: "25%", left: "80%", size: 2, type: "star-med" },
    { top: "35%", left: "45%", size: 1, type: "star-fast" },
    { top: "45%", left: "20%", size: 2, type: "star-slow" },
    { top: "18%", left: "60%", size: 1, type: "star-med" },
    { top: "50%", left: "75%", size: 1.5, type: "star-fast" },
    { top: "8%", left: "85%", size: 1, type: "star-slow" },
    { top: "62%", left: "10%", size: 2, type: "star-med" },
    { top: "70%", left: "90%", size: 1, type: "star-slow" },
    { top: "30%", left: "30%", size: 1.5, type: "star-fast" },
    { top: "7%", left: "7%", size: 1.5, type: "star-fast" },
    { top: "16%", left: "27%", size: 1, type: "star-med" },
    { top: "9%", left: "42%", size: 2, type: "star-slow" },
    { top: "22%", left: "51%", size: 1, type: "star-fast" },
    { top: "6%", left: "70%", size: 1.5, type: "star-med" },
    { top: "28%", left: "93%", size: 2, type: "star-fast" },
    { top: "38%", left: "6%", size: 1, type: "star-slow" },
    { top: "43%", left: "34%", size: 1.5, type: "star-med" },
    { top: "40%", left: "63%", size: 1, type: "star-fast" },
    { top: "36%", left: "87%", size: 1.5, type: "star-slow" },
    { top: "53%", left: "4%", size: 1, type: "star-fast" },
    { top: "57%", left: "28%", size: 2, type: "star-slow" },
    { top: "55%", left: "57%", size: 1.5, type: "star-med" },
    { top: "60%", left: "84%", size: 1, type: "star-fast" },
    { top: "68%", left: "18%", size: 1, type: "star-med" },
    { top: "65%", left: "42%", size: 1.5, type: "star-fast" },
    { top: "72%", left: "67%", size: 2, type: "star-slow" },
    { top: "76%", left: "96%", size: 1, type: "star-med" },
    { top: "4%", left: "20%", size: 1, type: "star-slow" },
    { top: "13%", left: "35%", size: 1.5, type: "star-fast" },
    { top: "5%", left: "54%", size: 1, type: "star-med" },
    { top: "14%", left: "76%", size: 2, type: "star-fast" },
    { top: "20%", left: "5%", size: 1, type: "star-med" },
    { top: "24%", left: "22%", size: 1.5, type: "star-slow" },
    { top: "27%", left: "39%", size: 1, type: "star-fast" },
    { top: "19%", left: "91%", size: 1.5, type: "star-med" },
    { top: "33%", left: "13%", size: 2, type: "star-slow" },
    { top: "32%", left: "55%", size: 1, type: "star-med" },
    { top: "45%", left: "93%", size: 1, type: "star-fast" },
    { top: "48%", left: "12%", size: 1.5, type: "star-med" },
    { top: "47%", left: "48%", size: 1, type: "star-slow" },
    { top: "50%", left: "68%", size: 2, type: "star-fast" },
    { top: "58%", left: "19%", size: 1, type: "star-fast" },
    { top: "63%", left: "34%", size: 1.5, type: "star-slow" },
    { top: "61%", left: "51%", size: 1, type: "star-med" },
    { top: "67%", left: "78%", size: 1.5, type: "star-fast" },
    { top: "73%", left: "5%", size: 1, type: "star-slow" },
    { top: "74%", left: "31%", size: 2, type: "star-med" },
    { top: "78%", left: "55%", size: 1, type: "star-fast" },
    { top: "75%", left: "82%", size: 1.5, type: "star-slow" },
    ...Array.from({ length: 50 }, (_, idx) => ({
      top: `${3 + ((idx * 17) % 76)}%`,
      left: `${2 + ((idx * 37) % 96)}%`,
      size: [1, 1.5, 2][idx % 3],
      type: ["star-slow", "star-med", "star-fast"][idx % 3],
    })),
  ];

  return (
    <div className="flex-1 flex flex-col relative overflow-x-hidden">
      
      {/* Floating Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0C]/40 backdrop-blur-md border-b border-white/[0.03] transition-all">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-5 flex items-center justify-between">
          <a href="#" aria-label="EonBook home" className="block">
            <Image
              src={logo}
              alt="EonBook"
              className="w-[120px] sm:w-[128px]"
              priority
            />
          </a>
          
          <nav className="hidden md:flex items-center gap-10 text-xs tracking-[0.2em] uppercase text-text-sec">
            <a href="#philosophy" className="hover:text-accent-gold transition-colors">Philosophy</a>
            <a href="#experience" className="hover:text-accent-gold transition-colors">Experience</a>
            <a href="#principles" className="hover:text-accent-gold transition-colors">Principles</a>
            <a href="#moon-journey" className="hover:text-accent-gold transition-colors">Moon Journey</a>
            <a href="#screenshots" className="hover:text-accent-gold transition-colors">Screenshots</a>
          </nav>
          
          <div className="hidden md:block">
            <a href="#download" className="px-5 py-2.5 rounded-full border border-accent-gold/30 hover:border-accent-gold text-accent-gold text-xs tracking-[0.15em] uppercase transition-all duration-300 bg-accent-gold/5">
              Get App
            </a>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-text-pri hover:text-accent-gold transition-colors">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0B0B0C] flex flex-col justify-center px-10 py-20 md:hidden"
          >
            <nav className="flex flex-col gap-8 text-lg font-serif text-text-pri tracking-[0.05em]">
              <a onClick={() => setMobileMenuOpen(false)} href="#philosophy" className="hover:text-accent-gold transition-colors">Philosophy</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#experience" className="hover:text-accent-gold transition-colors">Experience</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#principles" className="hover:text-accent-gold transition-colors">Principles</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#moon-journey" className="hover:text-accent-gold transition-colors">Moon Journey</a>
              <a onClick={() => setMobileMenuOpen(false)} href="#screenshots" className="hover:text-accent-gold transition-colors">Screenshots</a>
            </nav>
            <div className="mt-12 pt-8 border-t border-white/[0.05]">
              <a onClick={() => setMobileMenuOpen(false)} href="https://apps.apple.com/sg/app/eonbook/id6766190345" target="_blank" rel="noopener noreferrer" className="inline-block w-full text-center py-3.5 rounded-full bg-accent-gold text-[#0B0B0C] font-sans font-medium tracking-[0.1em] uppercase text-xs hover:bg-[#F5F3EE] transition-all">
                Download on App Store
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* SECTION 1 — HERO */}
      <section className="h-screen w-full isolate relative bg-gradient-to-b from-[#121722] via-[#1E2A40] to-[#121722] flex flex-col justify-between overflow-hidden pt-24">
        {/* The complete landscape sits above the sky layers without being cropped. */}
        <div className="hero-landscape absolute bottom-0 left-1/2 z-[2] -translate-x-1/2 pointer-events-none select-none">
          <Image
            src={heroLandscape}
            alt=""
            priority
            sizes="100vw"
            className="block h-auto w-full"
          />
        </div>

        {/* Star Field */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          {starsArray.map((star, idx) => (
            <div
              key={idx}
              className={`absolute rounded-full bg-white opacity-40 ${star.type}`}
              style={{
                top: star.top,
                left: star.left,
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            />
          ))}
        </div>

        {/* Ambient Moonlight Sky Overlay */}
        <div className="absolute top-[10%] right-[10%] z-[1] w-[30vw] h-[30vw] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        {/* Crescent Moon */}
        <div className="absolute top-[16%] right-[15%] z-[1] pointer-events-none md:right-[20%]">
          <svg className="w-10 h-10 sm:w-14 sm:h-14 text-accent-gold/80 filter drop-shadow-[0_0_12px_rgba(214,178,110,0.3)]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M50 20 A30 30 0 1 0 80 50 A24 24 0 1 1 50 20 Z" />
          </svg>
        </div>

        {/* Hero Copy */}
        <div className="flex-1 flex flex-col justify-center items-center text-center px-6 z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-accent-gold font-light mb-6"
          >
            Read without noise.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg md:text-xl text-text-sec font-light tracking-[0.05em] mb-12 max-w-md"
          >
            A beautiful home for your books.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
<a href="https://apps.apple.com/sg/app/eonbook/id6766190345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-[#F5F3EE] hover:bg-accent-gold text-[#0B0B0C] px-7 py-3 rounded-xl transition-all duration-300 group shadow-lg">
  <Image src={appleIcon} alt="" className="w-5 h-5 object-contain" />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-wider text-[#0B0B0C]/70">Download on the</p>
                <p className="font-semibold text-xs -mt-0.5">App Store</p>
              </div>
            </a>
            
            <a href="#experience" className="group text-text-sec hover:text-text-pri text-sm tracking-[0.1em] flex items-center gap-1.5 transition-all">
              View Screenshots
            </a>
          </motion.div>
        </div>

        {/* Keeps the hero's lower spacing and scroll affordance. */}
        <div className="w-full relative h-[38vh] sm:h-[40vh] min-h-[250px] max-h-[420px] select-none z-10">
          <svg className="hidden" preserveAspectRatio="none" viewBox="0 0 1440 400">
            <defs>
              {/* Moon reflection vertical gradient */}
              <linearGradient id="water-glow" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#D6B26E" stopOpacity="0.45" />
                <stop offset="30%" stopColor="#D6B26E" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10141D" stopOpacity="0" />
              </linearGradient>
              {/* Highlight on pages */}
              <radialGradient id="book-light" cx="50%" cy="40%" r="50%">
                <stop offset="0%" stopColor="#F5F3EE" />
                <stop offset="80%" stopColor="#E6E2D8" />
                <stop offset="100%" stopColor="#C4BFAF" />
              </radialGradient>
              {/* Gold gradient for book page borders */}
              <linearGradient id="gold-edges" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D6B26E" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#D6B26E" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D6B26E" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Calm Water Surface */}
            <rect y="160" width="1440" height="240" fill="#0B0B0C" />
            <rect y="160" width="1440" height="240" fill="url(#water-glow)" opacity="0.35" />

            {/* Shimmering Moon reflection ripples in water */}
            <g className="water-ripple opacity-80">
              <path d="M 680 180 Q 720 178, 760 180" stroke="#D6B26E" strokeWidth="1.5" fill="none" opacity="0.8" />
              <path d="M 660 195 Q 720 192, 780 195" stroke="#D6B26E" strokeWidth="2" fill="none" opacity="0.6" />
              <path d="M 690 200 Q 720 198, 750 200" stroke="#D6B26E" strokeWidth="1" fill="none" opacity="0.7" />
            </g>
            <g className="water-ripple-slow opacity-60">
              <path d="M 620 215 Q 720 210, 820 215" stroke="#D6B26E" strokeWidth="1.5" fill="none" opacity="0.5" />
              <path d="M 650 235 Q 720 230, 790 235" stroke="#D6B26E" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M 580 260 Q 720 252, 860 260" stroke="#D6B26E" strokeWidth="2" fill="none" opacity="0.3" />
            </g>
            <g className="water-ripple-fast opacity-50">
              <path d="M 700 170 Q 720 169, 740 170" stroke="#D6B26E" strokeWidth="1" fill="none" opacity="0.9" />
              <path d="M 670 188 Q 720 186, 770 188" stroke="#D6B26E" strokeWidth="1.5" fill="none" opacity="0.7" />
            </g>

            {/* Rocky Shoreline in the foreground */}
            {/* Left shore */}
            <path d="M -50 400 L -50 220 Q 150 200, 300 240 Q 420 270, 500 330 T 600 400 Z" fill="#060607" />
            {/* Right shore */}
            <path d="M 1490 400 L 1490 250 Q 1300 240, 1150 280 Q 1000 310, 920 400 Z" fill="#060607" />
            
            {/* Dark foreground shore elements where the book sits (centered) */}
            <path d="M 450 400 C 500 330, 600 230, 720 230 C 850 230, 950 320, 1020 400 Z" fill="#080809" />
            <path d="M 530 400 C 580 320, 650 260, 720 260 C 800 260, 870 320, 930 400 Z" fill="#0B0B0C" />

            {/* A detailed open-book vector, resting on the rocks, illuminated by the crescent moon */}
            <g transform="translate(625, 205) scale(0.65)" className="filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              {/* Book shadow on rocks */}
              <ellipse cx="140" cy="115" rx="150" ry="25" fill="#000000" opacity="0.75" />
              
              {/* Outer cover backing */}
              <path d="M 12 90 C 80 102, 140 102, 140 102 C 140 102, 200 102, 268 90 L 274 100 C 200 114, 140 114, 140 114 C 140 114, 80 114, 6 100 Z" fill="#2E2417" />
              
              {/* Pages stacking effect (left page) */}
              <path d="M 140 96 C 100 68, 55 68, 25 80 L 25 90 C 55 78, 100 78, 140 106 Z" fill="url(#gold-edges)" />
              <path d="M 140 94 C 100 66, 55 66, 25 78 L 25 86 C 55 74, 100 74, 140 102 Z" fill="#E6E2D8" />
              <path d="M 140 92 C 100 64, 55 64, 25 76 L 25 82 C 55 70, 100 70, 140 98 Z" fill="url(#book-light)" />
              
              {/* Pages stacking effect (right page) */}
              <path d="M 140 96 C 180 68, 225 68, 255 80 L 255 90 C 225 78, 180 78, 140 106 Z" fill="url(#gold-edges)" />
              <path d="M 140 94 C 180 66, 225 66, 255 78 L 255 86 C 225 74, 180 74, 140 102 Z" fill="#E6E2D8" />
              <path d="M 140 92 C 180 64, 225 64, 255 76 L 255 82 C 225 70, 180 70, 140 98 Z" fill="url(#book-light)" />

              {/* Book spine line */}
              <line x1="140" y1="58" x2="140" y2="98" stroke="#D6B26E" strokeWidth="2" opacity="0.6" />
              
              {/* Soft lunar glow highlight on open page center */}
              <ellipse cx="140" cy="78" rx="80" ry="25" fill="#D6B26E" opacity="0.12" style={{ mixBlendMode: "screen" }} />
            </g>
          </svg>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-sec text-xs tracking-[0.2em] uppercase cursor-pointer hover:text-accent-gold transition-colors z-20">
            <a href="#philosophy" className="flex flex-col items-center gap-1">
              <span>Scroll</span>
              <ChevronDown size={14} className="animate-bounce" />
            </a>
          </div>
        </div>
      </section>


      {/* SECTION 2 — PHILOSOPHY */}
      <section id="philosophy" className="pt-[46px] pb-[56px] md:pt-[94px] md:pb-[104px] bg-[#151D2D] w-full relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center">
          {/* Text Left */}
          <div className="md:col-span-7 flex flex-col justify-center">
            <span className="font-serif italic text-accent-gold text-base sm:text-lg mb-4 block">Our Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-pri font-light leading-tight tracking-tight mb-8">
              Books deserve a quieter place.
            </h2>
            
            <div className="font-sans text-base sm:text-lg text-text-sec space-y-6 max-w-xl font-light leading-relaxed">
              <p>
                Most reading apps are built for content platforms—optimizing for continuous engagement, screens full of recommendations, and notification badges.
              </p>
              <p className="font-medium text-text-pri">
                EonBook is built for readers.
              </p>
              <div className="pt-4 space-y-3.5 border-l border-accent-gold/20 pl-6 text-sm sm:text-base">
                <p className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                  <span>No feeds.</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                  <span>No recommendations.</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-gold"></span>
                  <span>No advertisements.</span>
                </p>
              </div>
              <p className="pt-2 text-accent-gold italic font-serif">
                Just you and your books.
              </p>
            </div>
          </div>

          {/* Screenshot Mockup Right */}
          <div className="md:col-span-5 flex justify-center items-center relative py-6">
            {/* Subtle glow background */}
            <div className="absolute w-[80%] h-[80%] bg-accent-gold/5 blur-[80px] rounded-full -z-10 pointer-events-none"></div>
            <IPhoneFrame
              src={SCREENSHOTS.philosophy}
              alt="EonBook Reader View Screenshot"
            />
          </div>
        </div>
        </div>
      </section>


      {/* SECTION 3 — WHAT READING FEELS LIKE */}
      <section id="experience" className="pt-[46px] pb-[76px] md:pt-[94px] md:pb-[124px] bg-[#2B364E]/30 border-y border-white/[0.02] w-full relative z-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-16 md:mb-24">
            <span className="font-serif italic text-accent-gold text-base sm:text-lg mb-4 block">The Experience</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-pri font-light tracking-tight">
              A place where books can breathe.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Styled Book Page / Excerpt Layout (Left) */}
            <div className="lg:col-span-7 bg-[#0B0B0C] border border-white/[0.04] p-8 sm:p-12 md:p-16 rounded-3xl relative shadow-2xl">
              <div className="absolute top-0 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"></div>
              
              {/* Literary Excerpt */}
              <div className="font-serif max-w-xl mx-auto">
                <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase text-accent-gold/60 mb-10 border-b border-white/[0.05] pb-4">
                  <span>Meditations</span>
                  <span>Marcus Aurelius</span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl text-text-pri font-medium mb-6">Book IV, 3</h3>
                
                <div className="space-y-6 font-light text-text-sec text-base leading-[1.7] sm:text-lg sm:leading-[1.75]">
                  <p>
                    <span className="float-left mt-1 mr-1 font-serif text-6xl font-light leading-[0.8] text-accent-gold sm:text-7xl">P</span>
                    eople look for retreats for themselves, in the country, by the coast, or in the hills... There is nowhere that a person can find a more peaceful and trouble-free retreat than in his own mind. Especially if he has resources within himself, which he can look into and immediately attain perfect ease.
                  </p>
                  <p>
                    By ease I mean nothing other than orderly thinking. Constantly grant yourself this retreat, and renew yourself. Let your principles be brief and fundamental, the kind that will at once restore your mind completely and send you back without any irritation.
                  </p>
                </div>
                
                <div className="mt-12 text-right text-xs italic text-accent-gold/40 border-t border-white/[0.05] pt-6">
                  Page 87
                </div>
              </div>
            </div>

            {/* Large Real App Screenshot in iPhone Frame (Right) */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative">
                {/* Glow ring */}
                <div className="absolute inset-0 bg-accent-gold/5 blur-[50px] rounded-full pointer-events-none"></div>
                <IPhoneFrame
                  src={SCREENSHOTS.experience}
                  alt="EonBook App Reading Atmosphere"
                />
                <p className="absolute top-full left-1/2 mt-[30px] w-max max-w-[calc(100vw-3rem)] -translate-x-1/2 font-sans text-xs tracking-[0.15em] uppercase text-text-sec text-center">
                  Comfortable margins & warm paper theme
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* SECTION 4 — THREE PRINCIPLES */}
      <section id="principles" className="py-24 md:py-36 w-full relative z-10 overflow-hidden bg-[#182337]">
        <Image
          src={principlesBackground}
          alt=""
          className="absolute top-0 left-1/2 h-full w-auto max-w-none -translate-x-1/2"
        />
        <div className="absolute inset-0 bg-[#10141D]/45"></div>
        <div className="max-w-6xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <span className="font-serif italic text-accent-gold text-base sm:text-lg mb-4 block">Three Principles</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-pri font-light tracking-tight">
            Built for meaningful reading.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-[#10141D]/[0.01] backdrop-blur-sm border border-accent-gold/50 p-8 sm:p-10 rounded-2xl flex flex-col items-start hover:border-accent-gold transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-8 border border-accent-gold/25">
              <Book size={20} className="stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-text-pri font-medium mb-4">
              A Home For Your Books
            </h3>
            <p className="font-sans text-sm sm:text-base text-text-sec font-light leading-relaxed">
              Import your own EPUB library seamlessly. No subscription models, no corporate ecosystem lock-in. Your books remain yours.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#10141D]/[0.01] backdrop-blur-sm border border-accent-gold/50 p-8 sm:p-10 rounded-2xl flex flex-col items-start hover:border-accent-gold transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-8 border border-accent-gold/25">
              <Compass size={20} className="stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-text-pri font-medium mb-4">
              Read Without Distraction
            </h3>
            <p className="font-sans text-sm sm:text-base text-text-sec font-light leading-relaxed">
              No endless scrolls, no gamified badges, and no social feeds. We believe reading is a sacred act of concentration.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#10141D]/[0.01] backdrop-blur-sm border border-accent-gold/50 p-8 sm:p-10 rounded-2xl flex flex-col items-start hover:border-accent-gold transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.28)]">
            <div className="w-12 h-12 rounded-xl bg-accent-gold/10 flex items-center justify-center text-accent-gold mb-8 border border-accent-gold/25">
              <Moon size={20} className="stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-xl sm:text-2xl text-text-pri font-medium mb-4">
              Leave A Trace Upon The Moon
            </h3>
            <p className="font-sans text-sm sm:text-base text-text-sec font-light leading-relaxed">
              Every book read leaves a trace on your quiet lunar profile. Transform your reading hours into a serene visual journey.
            </p>
          </div>
        </div>
        </div>
      </section>


      {/* SECTION 5 — MOON JOURNEY */}
      <section id="moon-journey" className="pt-0 pb-[60px] md:pt-[44px] bg-[#111A29] border-t border-white/[0.02] w-full relative z-10 overflow-hidden">
        {/* Sky glow */}
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[60vw] h-[30vw] bg-accent-gold/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative">
          <span className="font-serif italic text-accent-gold text-base sm:text-lg mb-4 block">The Moon Journey</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-pri font-light tracking-tight mb-8">
            Every book leaves a trace upon the moon.
          </h2>

          {/* Moon Phases Horizontal Display */}
          <div className="mx-auto my-16 flex max-w-2xl flex-wrap items-center justify-center gap-y-2 sm:flex-nowrap sm:justify-between sm:gap-2">
            {moonPhasesData.map((phase, idx) => {
              const isActive = moonPhase === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleMoonPhaseClick(idx)}
                  className="group relative flex basis-1/4 flex-none flex-col items-center py-4 focus:outline-none sm:flex-1 sm:basis-auto"
                >
                  {/* Moon phase visual */}
                  <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center relative mb-4 transition-all duration-500 border ${isActive ? "border-accent-gold shadow-[0_0_15px_rgba(214,178,110,0.25)] bg-[#10141D]/20 scale-110" : "border-white/[0.08] hover:border-accent-gold/40"}`}>
                    <Image
                      src={phase.image}
                      alt=""
                      className={`h-7 w-7 object-contain transition-all duration-500 sm:h-11 sm:w-11 ${
                        isActive
                          ? "opacity-100 drop-shadow-[0_0_8px_rgba(214,178,110,0.6)]"
                          : "opacity-40 group-hover:opacity-70"
                      }`}
                    />
                  </div>
                  
                  <span className={`text-[10px] sm:text-xs tracking-[0.1em] uppercase transition-colors duration-300 ${isActive ? "text-accent-gold font-medium" : "text-text-sec/50"}`}>
                    {phase.shortName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Phase Card details */}
          <div className="min-h-[140px] max-w-xl mx-auto flex flex-col justify-center items-center bg-[#10141D]/25 border border-white/[0.03] p-8 rounded-2xl relative shadow-lg">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-accent-gold/30"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={moonPhase}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <p className="text-xs font-sans tracking-[0.2em] uppercase text-accent-gold/80">
                  Unlocked at {moonPhasesData[moonPhase].requirement}
                </p>
                <h4 className="font-serif text-xl sm:text-2xl text-text-pri font-medium">
                  {moonPhasesData[moonPhase].name}
                </h4>
                <p className="font-sans text-sm sm:text-base text-text-sec leading-relaxed font-light max-w-md mx-auto">
                  {moonPhasesData[moonPhase].desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="pt-[25px]">
            <p className="font-sans text-sm text-text-sec/60 italic">
              The more you read, <span className="text-accent-gold font-light not-italic">the more of the moon you light.</span>
            </p>
          </div>
        </div>
      </section>


      {/* SECTION 6 — SCREENSHOTS */}
      <section id="screenshots" className="py-0 md:py-[44px] bg-[#202C43] border-y border-white/[0.02] w-full relative z-10 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          <div className="text-center mb-[4px] md:mb-[36px]">
            <span className="font-serif italic text-accent-gold text-base sm:text-lg mb-4 block">The Gallery</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-pri font-light tracking-tight">
              A home for your books.
            </h2>
          </div>

          {/* Carousel Layout */}
          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center justify-between gap-4 md:gap-12">
              
              {/* Left Arrow Button */}
              <button 
                onClick={prevCarousel} 
                className="w-10 h-10 rounded-full border border-white/[0.08] hover:border-accent-gold text-text-sec hover:text-accent-gold flex items-center justify-center transition-all bg-[#0B0B0C]/40"
                aria-label="Previous screenshot"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Center Slider */}
              <div className="flex-1 flex flex-col items-center">
                <div className="relative w-full h-[820px] sm:h-[860px] md:h-[700px]">
                  <AnimatePresence initial={false} mode="sync">
                    <motion.div
                      key={carouselIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      style={{ willChange: "opacity, transform", backfaceVisibility: "hidden" }}
                      className="absolute inset-0 mx-auto flex w-full max-w-3xl flex-col items-center justify-center gap-12 py-6 md:flex-row"
                    >
                      {/* Left: Mobile phone mockup */}
                      <div className="flex-shrink-0">
                        <IPhoneFrame
                          src={carouselItems[carouselIndex].img}
                          alt={`${carouselItems[carouselIndex].title} View`}
                        />
                      </div>
                      
                      {/* Right: Description of the screen */}
                      <div className="max-w-sm text-center md:text-left space-y-4">
                        <span className="text-xs font-sans tracking-[0.2em] uppercase text-accent-gold">
                          Screen {carouselIndex + 1} of {carouselItems.length}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-text-pri font-medium">
                          {carouselItems[carouselIndex].title}
                        </h3>
                        <p className="font-sans text-sm sm:text-base text-text-sec leading-relaxed font-light">
                          {carouselItems[carouselIndex].desc}
                        </p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dot Indicators */}
                <div className="flex items-center gap-2.5 mt-8">
                  {carouselItems.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${carouselIndex === idx ? "w-6 bg-accent-gold" : "bg-white/10 hover:bg-white/30"}`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Right Arrow Button */}
              <button 
                onClick={nextCarousel} 
                className="w-10 h-10 rounded-full border border-white/[0.08] hover:border-accent-gold text-text-sec hover:text-accent-gold flex items-center justify-center transition-all bg-[#0B0B0C]/40"
                aria-label="Next screenshot"
              >
                <ChevronRight size={18} />
              </button>

            </div>
          </div>
        </div>
      </section>


      {/* SECTION 7 — FINAL CTA */}
      <section id="download" className="pt-32 pb-[78px] md:pt-48 md:pb-[142px] px-6 sm:px-8 text-center relative z-10 w-full bg-gradient-to-b from-[#172033] to-[#0F1623]">
        {/* Soft Gold glow circle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-accent-gold/[0.03] blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-2xl mx-auto space-y-12 relative">
          <span className="font-serif italic text-accent-gold text-base sm:text-lg mb-4 block">EonBook</span>
          
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-pri font-light leading-tight tracking-tight max-w-xl mx-auto">
            Some books stay with us for a lifetime.
          </h2>
          
          <p className="font-sans text-base text-text-sec font-light tracking-[0.05em] max-w-md mx-auto">
            Download EonBook on the App Store.
          </p>

          <div className="pt-4 flex justify-center">
            <a href="https://apps.apple.com/sg/app/eonbook/id6766190345" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-[#F5F3EE] hover:bg-accent-gold text-[#0B0B0C] px-9 py-4 rounded-xl transition-all duration-300 group shadow-2xl">
              <Image src={appleIcon} alt="" className="w-6 h-6 object-contain" />
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-[#0B0B0C]/70">Download on the</p>
                <p className="font-semibold text-sm -mt-0.5">App Store</p>
              </div>
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 pt-8 border-t border-white/[0.03] max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-sec/40 tracking-[0.1em] font-light">
          <p>© {new Date().getFullYear()} EonBook. All rights reserved.</p>
          <p className="font-serif italic text-accent-gold/40">Made for readers.</p>
        </div>
      </section>

    </div>
  );
}
