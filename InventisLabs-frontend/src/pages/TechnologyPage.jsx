import React, { useEffect, useRef } from "react";
import {
  Database,
  Network,
  Lock,
  Zap,
  ArrowRight,
  Layers,
  Shield,
} from "lucide-react";
import Footer from "../components/Footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TechnologyPage = () => {
  const heroRef = useRef(null);
  const deepTechRef = useRef(null);
  const pipelineRef = useRef(null);
  const howWorksRef = useRef(null);
  const hardwareRef = useRef(null);

  useEffect(() => {
    // Hero section animation
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });

    // Deep Tech section animation
    gsap.from(deepTechRef.current?.querySelectorAll(".animate-text"), {
      scrollTrigger: {
        trigger: deepTechRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
    });

    // Pipeline steps animation
    gsap.from(pipelineRef.current?.querySelectorAll(".pipeline-step"), {
      scrollTrigger: {
        trigger: pipelineRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      x: -30,
      duration: 0.6,
      stagger: 0.15,
      ease: "power2.out",
    });

    // How it works cards animation
    gsap.from(howWorksRef.current?.querySelectorAll(".work-card"), {
      scrollTrigger: {
        trigger: howWorksRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.7,
      stagger: 0.2,
      ease: "back.out(1.7)",
    });

    // Hardware section animation
    gsap.from(hardwareRef.current?.querySelectorAll(".hardware-item"), {
      scrollTrigger: {
        trigger: hardwareRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display pt-20 transition-colors duration-500">
      {/* Page Header */}
      <section
        ref={heroRef}
        className="bg-[#F5F5F7] dark:bg-zinc-900 py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
            Technology
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
            Deep-tech engineering built on years of research, indigenous
            innovation, and rigorous field testing.
          </p>
        </div>
      </section>

      {/* Deep Tech Foundation */}
      <section
        ref={deepTechRef}
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="animate-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Deep-Tech Foundation
            </h2>
            <p className="animate-text text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6">
              InventisLabs was born out of a need for indigenous, high-precision
              sensing in India. Our technology stack is not white-labeled; it is
              built from the ground up, starting from sensor design to the final
              alert diffusion algorithms.
            </p>
            <p className="animate-text text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We follow a rigorous R&D pipeline aimed at solving India-specific
              challenges, such as high population density, varying geography,
              and the need for cost-effective yet reliable hardware.
            </p>
          </div>
          <div
            ref={pipelineRef}
            className="animate-text bg-gray-50 dark:bg-zinc-900 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-white/5 shadow-lg"
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              {/* Pipeline Diagram Step 1 */}
              <div className="pipeline-step flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 text-xs sm:text-sm flex-shrink-0">
                  01
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold">
                    Academic Research
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Guidance from IIT Roorkee Dept. of EQ Engineering
                  </p>
                </div>
              </div>
              <div className="pipeline-step h-6 sm:h-8 w-0.5 bg-gray-200 dark:bg-white/10 ml-4 sm:ml-5"></div>
              {/* Pipeline Diagram Step 2 */}
              <div className="pipeline-step flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 text-xs sm:text-sm flex-shrink-0">
                  02
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold">
                    Prototype & Lab Testing
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Shake-table verification and sensor calibration
                  </p>
                </div>
              </div>
              <div className="pipeline-step h-6 sm:h-8 w-0.5 bg-gray-200 dark:bg-white/10 ml-4 sm:ml-5"></div>
              {/* Pipeline Diagram Step 3 */}
              <div className="pipeline-step flex items-center gap-3 sm:gap-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-bold text-green-600 text-xs sm:text-sm flex-shrink-0">
                  03
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold">
                    Field Deployment
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Real-world feedback loops and AI model tuning
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How EQ Alert Works */}
      <section
        ref={howWorksRef}
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 bg-[#F5F5F7] dark:bg-zinc-900/50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] sm:text-xs font-semibold uppercase tracking-wide mb-3 sm:mb-4">
              Mechanism
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
              How EQ-Alert Works
            </h2>
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
              From P-wave detection to mass notification in milliseconds.
            </p>
          </div>

          <div className="max-w-5xl mx-auto relative">
            {/* Connecting Line */}
            <div className="absolute top-6 sm:top-8 left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 hidden md:block z-0"></div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-12 relative z-10">
              {/* Step 1 */}
              <div className="work-card bg-white dark:bg-black p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-white/10 text-center hover:shadow-2xl hover:border-yellow-300 dark:hover:border-yellow-600 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-white dark:bg-black border-2 sm:border-4 border-[#F5F5F7] dark:border-zinc-800 rounded-full flex items-center justify-center mb-4 sm:mb-6 relative">
                  <Zap className="text-yellow-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">
                  1. Detection
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Networked sensors detect the initial, non-damaging Primary (P)
                  waves which travel faster than the destructive Secondary (S)
                  waves.
                </p>
              </div>

              {/* Step 2 */}
              <div className="work-card bg-white dark:bg-black p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-white/10 text-center hover:shadow-2xl hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-white dark:bg-black border-2 sm:border-4 border-[#F5F5F7] dark:border-zinc-800 rounded-full flex items-center justify-center mb-4 sm:mb-6 relative">
                  <Database className="text-blue-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">
                  2. Processing
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Algorithms instantly analyze the magnitude and location at the
                  edge or cloud, filtering out false positives from traffic or
                  construction.
                </p>
              </div>

              {/* Step 3 */}
              <div className="work-card bg-white dark:bg-black p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl sm:rounded-3xl border border-gray-100 dark:border-white/10 text-center sm:col-span-2 md:col-span-1 hover:shadow-2xl hover:border-red-300 dark:hover:border-red-600 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto bg-white dark:bg-black border-2 sm:border-4 border-[#F5F5F7] dark:border-zinc-800 rounded-full flex items-center justify-center mb-4 sm:mb-6 relative">
                  <Network className="text-red-500 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">
                  3. Alert & Action
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  Warnings are broadcasted to sirens, mobile apps, and control
                  systems to auto-shutdown critical infrastructure before
                  S-waves arrive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Indigenous Hardware */}
      <section
        ref={hardwareRef}
        className="py-12 sm:py-16 md:py-20 lg:py-32 px-4 sm:px-6 bg-white dark:bg-black text-white"
      >
        <div className="max-w-7xl mx-auto bg-[#1d1d1f] rounded-2xl sm:rounded-3xl md:rounded-[3rem] p-6 sm:p-8 md:p-12 lg:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-600/20 blur-[80px] sm:blur-[100px] rounded-full pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 text-white">
              Indigenous Hardware Architecture
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-gray-300">
              <div>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">
                  Designed in India, for India. Our hardware is built to
                  withstand extreme environmental conditions while maintaining
                  high-fidelity data acquisition.
                </p>
                <p className="text-sm sm:text-base md:text-lg leading-relaxed">
                  Unlike imported black-box solutions, our modular architecture
                  allows for seamless upgrades, multi-hazard sensing
                  integration, and full data sovereignty.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  {
                    label: "MEMS Sensors",
                    icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                  {
                    label: "Secure Comms",
                    icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                  {
                    label: "Edge AI",
                    icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                  {
                    label: "Ruggedized",
                    icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="hardware-item bg-white/5 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center gap-1.5 sm:gap-2 hover:bg-white/20 hover:scale-105 hover:border-white/30 transition-all duration-300 cursor-pointer"
                  >
                    {item.icon}
                    <span className="text-xs sm:text-sm font-bold text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechnologyPage;
