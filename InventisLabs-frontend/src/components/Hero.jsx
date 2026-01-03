import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {
  Activity,
  Globe,
  ShieldCheck,
  ChevronRight,
  AlertTriangle,
  Siren,
} from "lucide-react";

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Master Timeline
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Text Elements Reveal (Staggered Fade Up)
      tl.from(".hero-text-element", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        delay: 0.2,
      });

      // 2. Buttons Reveal
      tl.from(
        ".hero-buttons",
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.5"
      );

      // 3. Visualization Reveal (Scale + Fade)
      tl.from(
        cardsRef.current,
        {
          y: 100,
          scale: 0.95,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out",
        },
        "-=0.8"
      );

      // Floating Animation for Cards (Subtle breathing)
      gsap.to(cardsRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2, // Start after entrance
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-[90vh] bg-[#F5F5F7] dark:bg-black flex flex-col items-center justify-center font-display transition-colors duration-500"
    >
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 text-center lg:text-left">
        {/* Left: Text Content */}
        <div
          ref={contentRef}
          className="flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0"
        >
          {/* Badge */}
          <div className="hero-text-element inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-full mb-6 border border-orange-200 dark:border-orange-800">
            <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider">
              Made in India • Seismic Safety Innovation
            </span>
          </div>

          <h1 className="hero-text-element text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.05] mb-6">
            Seconds of warning.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-red-600">
              Countless lives saved.
            </span>
          </h1>

          <p className="hero-text-element text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-semibold leading-relaxed mb-4">
            India's indigenous earthquake early warning system
          </p>

          <p className="hero-text-element text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-10 max-w-xl">
            InventisLabs delivers cutting-edge IoT and AI-powered seismic
            sensing technology—protecting critical infrastructure, industrial
            facilities, and communities across India's highest-risk zones.
          </p>

          {/* Stats Row */}
          <div className="hero-text-element grid grid-cols-3 gap-6 mb-10 w-full max-w-md">
            <div className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-400">
                10-30s
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                Lead Time
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                59%
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                Land at Risk
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                24/7
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium">
                Monitoring
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="hero-buttons flex flex-wrap justify-center lg:justify-start gap-4">
            {/* Button 1: Filled Orange */}
            <button
              onClick={() =>
                document
                  .getElementById("solutions")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-14 px-8 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold text-base transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-xl shadow-orange-500/30"
            >
              Explore EQ-Alert <ChevronRight className="w-5 h-5" />
            </button>

            {/* Button 2: Outline */}
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="h-14 px-8 rounded-full bg-white dark:bg-zinc-900 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-white/20 hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold text-base transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg"
            >
              Request Pilot Program
            </button>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex items-center justify-center lg:justify-end w-full">
          <div ref={cardsRef} className="relative w-full max-w-lg">
            {/* Background Decorative Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-100/50 to-blue-100/50 dark:from-orange-900/10 dark:to-blue-900/10 rounded-full blur-3xl -z-10" />

            {/* Image Container */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-700 rounded-[2rem] overflow-hidden border border-white/50 dark:border-white/10 shadow-2xl shadow-black/10 flex items-center justify-center">
              {/* Grid Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Placeholder Icon */}
              <Activity className="w-32 h-32 md:w-40 md:h-40 text-orange-500 dark:text-orange-400 opacity-30" />

              {/* Replace above Activity icon with your actual image: */}
              {/* <img src="/path-to-your-image.png" alt="EQ-Alert Device" className="w-full h-full object-cover" /> */}
            </div>
          </div>
        </div>
      </div>

      {/* Credibility Strip */}
      <div className="container mx-auto px-6 mt-20 relative z-10">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-zinc-900/50 dark:to-zinc-800/50 backdrop-blur-md rounded-3xl border border-gray-200/50 dark:border-white/5 p-8 md:p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {/* Credibility Item 1: IIT Roorkee */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                Developed with research guidance from{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  IIT Roorkee
                </span>{" "}
                (Earthquake Engineering).
              </p>
            </div>

            {/* Credibility Item 2: Government Engagement */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                Engaging with{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  chambers and ministries
                </span>{" "}
                on disaster resilience and early warning pilots.
              </p>
            </div>

            {/* Credibility Item 3: PM's Call Alignment */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                Aligned with{" "}
                <span className="font-bold text-gray-900 dark:text-white">
                  Prime Minister's call
                </span>{" "}
                for indigenous EEW systems (IMD 150th Foundation Day).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
