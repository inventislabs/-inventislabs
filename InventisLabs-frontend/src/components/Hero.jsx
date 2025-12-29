import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Activity, Globe, ShieldCheck, ChevronRight, AlertTriangle, Siren } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const cardsRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Master Timeline
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // 1. Text Elements Reveal (Staggered Fade Up)
            tl.from(".hero-text-element", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                delay: 0.2
            });

            // 2. Buttons Reveal
            tl.from(".hero-buttons", {
                y: 20,
                opacity: 0,
                duration: 0.8,
            }, "-=0.5");

            // 3. Visualization Reveal (Scale + Fade)
            tl.from(cardsRef.current, {
                y: 100,
                scale: 0.95,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            }, "-=0.8");

            // Floating Animation for Cards (Subtle breathing)
            gsap.to(cardsRef.current, {
                y: -10,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2 // Start after entrance
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden min-h-[90vh] bg-[#F5F5F7] dark:bg-black flex flex-col items-center justify-center font-display transition-colors duration-500">

            {/* Background Ambient Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10 text-center lg:text-left">

                {/* Left: Text Content */}
                <div ref={contentRef} className="flex flex-col items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
                    <h1 className="hero-text-element text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] leading-[1.1] mb-6">
                        Building indigenous <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600 font-bold">
                            early warning
                        </span> <br />
                        and intelligent sensing systems for a safer India.
                    </h1>

                    <p className="hero-text-element text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-10 max-w-xl">
                        InventisLabs is a deep-tech startup from Uttar Pradesh developing IoT- and AI-powered Earthquake Early Warning (EEW) and structural monitoring systems.
                    </p>

                    {/* Buttons */}
                    <div className="hero-buttons flex flex-wrap justify-center lg:justify-start gap-4">
                        {/* Button 1: Filled Orange */}
                        <button
                            onClick={() => document.getElementById('solutions')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-12 px-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-medium text-base transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-lg shadow-orange-500/20"
                        >
                            Explore EQ-Alert <ChevronRight className="w-4 h-4" />
                        </button>

                        {/* Button 2: Outline Navy */}
                        <button
                            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                            className="h-12 px-8 rounded-full text-blue-900 dark:text-blue-300 border-2 border-blue-900 dark:border-blue-700 hover:bg-blue-900 hover:text-white dark:hover:bg-blue-800 dark:hover:text-white font-medium text-base transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                            Pilot EQ-Alert in Your Region
                        </button>
                    </div>
                </div>

                {/* Right: Visualization (Dashboard Mock) */}
                <div className="flex items-center justify-center lg:justify-end w-full">
                    <div ref={cardsRef} className="relative w-full max-w-lg perspective-[2000px]">

                        {/* Background Decorative Blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-100/50 to-blue-100/50 dark:from-orange-900/10 dark:to-blue-900/10 rounded-full blur-3xl -z-10" />

                        {/* Main Dashboard Card */}
                        <div className="relative w-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white/50 dark:border-white/10 shadow-2xl shadow-black/10 z-20">

                            {/* Header Bar */}
                            <div className="flex justify-between items-center mb-8 border-b border-gray-100 dark:border-white/5 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Live Monitoring</span>
                                </div>
                                <div className="text-xs font-mono text-gray-400">NET-ID: NCR-004</div>
                            </div>

                            {/* Alert Content */}
                            <div className="flex flex-col items-center text-center space-y-6">

                                {/* Siren / Warning Icon */}
                                <div className="relative">
                                    <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 animate-pulse rounded-full" />
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center text-white shadow-xl shadow-red-500/30">
                                        <Siren className="w-10 h-10 animate-bounce" />
                                    </div>
                                    {/* Ripple Effect */}
                                    <div className="absolute inset-0 border-4 border-red-500 rounded-2xl animate-ping opacity-20" />
                                </div>

                                <div className="space-y-2">
                                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                                        EQ-Alert: <span className="text-red-600">WARNING</span>
                                    </h3>
                                    <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                                        Strong Shaking Expected in
                                    </p>
                                </div>

                                {/* Countdown Timer */}
                                <div className="text-6xl md:text-7xl font-bold font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">
                                    30s
                                </div>

                                {/* Action Message */}
                                <div className="px-6 py-3 bg-red-50 dark:bg-red-900/20 rounded-xl text-red-600 dark:text-red-400 font-bold text-sm uppercase tracking-wide animate-pulse">
                                    Drop • Cover • Hold On
                                </div>
                            </div>

                        </div>

                        {/* Floating Small Card: Active Sensors */}
                        <div className="absolute -bottom-6 -left-6 md:-left-12 bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-white/5 z-30 flex items-center gap-4 animate-float">
                            <div className="flex -space-x-2">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 border-2 border-white dark:border-zinc-800 flex items-center justify-center text-[10px] font-bold text-blue-600 dark:text-blue-400">
                                        S{i}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-gray-900 dark:text-white">Active Nodes</div>
                                <div className="text-[10px] text-gray-500">Processing real-time data</div>
                            </div>
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
                                Developed with research guidance from <span className="font-bold text-gray-900 dark:text-white">IIT Roorkee</span> (Earthquake Engineering).
                            </p>
                        </div>

                        {/* Credibility Item 2: Government Engagement */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                                <Globe className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                                Engaging with <span className="font-bold text-gray-900 dark:text-white">chambers and ministries</span> on disaster resilience and early warning pilots.
                            </p>
                        </div>

                        {/* Credibility Item 3: PM's Call Alignment */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 group">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110">
                                <Activity className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            </div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                                Aligned with <span className="font-bold text-gray-900 dark:text-white">Prime Minister's call</span> for indigenous EEW systems (IMD 150th Foundation Day).
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;