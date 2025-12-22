import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight, Activity, Globe, ShieldCheck } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Text Vertical Reveal
            gsap.from(".hero-text-reveal", {
                y: 100,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.2
            });

            // Cards Cascade In
            gsap.from(".alert-card", {
                x: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "back.out(1.2)",
                delay: 0.6
            });

            // Seismic Wave Background Animation
            gsap.to(".seismic-wave", {
                scale: 2,
                opacity: 0,
                duration: 4,
                repeat: -1,
                stagger: 1,
                ease: "sine.out"
            });

            // Floating Animation for Cards
            gsap.to(cardsRef.current, {
                y: -15,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative pt-24 pb-12 lg:pt-32 lg:pb-0 overflow-hidden min-h-screen bg-[#FAFAFA] dark:bg-black flex items-center font-display transition-colors duration-500">

            {/* Seismic Background Effect */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-40 hidden lg:block">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="seismic-wave absolute inset-0 border border-blue-200/50 dark:border-white/5 rounded-full origin-center" />
                ))}
                <div className="absolute inset-0 bg-gradient-to-l from-[#FAFAFA] dark:from-black to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left: Content */}
                <div className="text-left">
                    <div className="hero-text-reveal inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-8 border border-orange-100 dark:border-orange-500/20 transition-colors">
                        <Activity className="w-3 h-3" />
                        <span>Live Global Monitoring</span>
                    </div>

                    <h1 ref={titleRef} className="text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-8 transition-colors">
                        <div className="overflow-hidden"><span className="hero-text-reveal block">Pioneering IoT Safety</span></div>
                        <div className="overflow-hidden"><span className="hero-text-reveal block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">For A Safer Tomorrow.</span></div>
                    </h1>

                    <div className="hero-text-reveal space-y-4 mb-10 max-w-lg text-lg sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed transition-colors">
                        <p>
                            Pioneering India's first mass earthquake early warning system by combining expert seismology with cutting-edge IoT technology. Saving lives through innovation since 2018.
                        </p>
                    </div>

                    <div className="hero-text-reveal flex flex-wrap gap-4">
                        <button className="h-14 px-8 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black font-semibold hover:bg-black dark:hover:bg-gray-200 hover:scale-105 transition-all duration-300 shadow-xl shadow-gray-200 dark:shadow-none flex items-center gap-2">
                            See How It Works <ArrowRight className="w-4 h-4" />
                        </button>
                        <button className="h-14 px-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 transition-all duration-300 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> System Status
                        </button>
                    </div>


                </div>

                {/* Right: Abstract UI Visualization */}
                <div className="relative h-[600px] hidden lg:flex items-center justify-center perspective-[1000px]">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-blue-100/50 dark:bg-blue-900/20 rounded-full blur-3xl scale-75 animate-pulse transition-colors" />

                    <div ref={cardsRef} className="relative z-10 w-80 transform rotate-y-[-12deg] rotate-x-[12deg] hover:rotate-0 transition-transform duration-700 ease-out preserve-3d">

                        {/* Card 1: Map/Context */}
                        <div className="alert-card absolute top-[-80px] -right-12 w-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md p-4 rounded-3xl border border-white/50 dark:border-white/10 shadow-lg z-0 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center"><Globe className="w-4 h-4 text-gray-400" /></div>
                                <div>
                                    <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Regional Scan</div>
                                    <div className="text-[10px] text-gray-400">Sector 7 • Active</div>
                                </div>
                            </div>
                            <div className="h-24 bg-gray-100/50 dark:bg-white/5 rounded-xl w-full"></div>
                        </div>

                        {/* Card 2: Incoming Wave */}
                        <div className="alert-card absolute top-6 -left-8 w-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl p-5 rounded-3xl border border-white/80 dark:border-white/10 shadow-xl z-10 transition-colors">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg">CAUTION</span>
                                <span className="text-xs text-gray-400">10:42:05 AM</span>
                            </div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">P-Wave Detected</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">Analyzing magnitude signature...</div>
                        </div>

                        {/* Card 3: MAIN ALERT */}
                        <div className="alert-card relative w-[110%] -left-[5%] bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl p-6 rounded-[2rem] border border-red-500/20 dark:border-red-500/30 shadow-2xl shadow-red-500/10 dark:shadow-red-900/20 z-20 transition-colors">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                                    <Activity className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-red-500 uppercase tracking-wide">Critical Alert</div>
                                    <div className="text-xs text-gray-400">EST. ARRIVAL: 24s</div>
                                </div>
                            </div>

                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Earthquake<br />Detected</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Strong shaking expected. Drop, cover, and hold on immediately.</p>

                            <div className="w-full bg-gray-100 dark:bg-white/10 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 w-3/4 h-full rounded-full" />
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
