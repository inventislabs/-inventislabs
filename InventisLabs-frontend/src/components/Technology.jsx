import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Cpu, Radio, Zap, Clock, ShieldCheck, Server, Smartphone, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Technology = () => {
    const containerRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Header Reveal
            tl.from(".tech-header", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            // Grid Items Reveal
            gsap.from(".bento-item", {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                },
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Stats Counter Animation
            gsap.from(".stat-number", {
                scrollTrigger: {
                    trigger: ".stats-container",
                    start: "top 80%",
                },
                textContent: 0,
                duration: 2,
                snap: { textContent: 1 },
                stagger: 0.2,
                ease: "power1.out"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="technology" className="relative py-24 md:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-500 font-display">

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-20">
                    <div className="tech-header inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide mb-6 border border-blue-100 dark:border-blue-500/20">
                        <Cpu className="w-3 h-3" />
                        <span>Engineering Excellence</span>
                    </div>
                    <h2 className="tech-header text-4xl md:text-6xl font-semibold tracking-tight text-[#1d1d1f] dark:text-[#f5f5f7] mb-6">
                        Milliseconds Matter.
                    </h2>
                    <p className="tech-header text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto">
                        A proprietary network of high-precision IoT sensors powered by edge AI, delivering the fastest earthquake early warning alerts in the industry.
                    </p>
                </div>

                {/* Bento Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    {/* Large Card: IoT Sensor (Spans 2 cols) */}
                    <div className="bento-item col-span-1 md:col-span-2 relative overflow-hidden rounded-[2.5rem] bg-[#F5F5F7] dark:bg-zinc-900 p-8 md:p-12 min-h-[400px] flex flex-col justify-between group">
                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center mb-6 shadow-sm">
                                <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">IoT Sensor Network</h3>
                            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-md">
                                Detecting <span className="text-blue-600 dark:text-blue-400 font-medium">P-waves</span> instantly with nano-g sensitive accelerometers before the destructive S-waves arrive.
                            </p>
                        </div>

                        {/* Abstract Sensor VIS */}
                        <div className="absolute right-[-20%] bottom-[-20%] w-[80%] h-[80%] opacity-10 dark:opacity-20 pointer-events-none">
                            <div className="w-full h-full border-[20px] border-blue-500 rounded-full animate-pulse opacity-20"></div>
                            <div className="absolute inset-0 m-auto w-[70%] h-[70%] border-[20px] border-blue-500 rounded-full animate-pulse opacity-40 delay-75"></div>
                            <div className="absolute inset-0 m-auto w-[40%] h-[40%] bg-blue-500 rounded-full shadow-2xl shadow-blue-500"></div>
                        </div>
                    </div>

                    {/* Tall Card: Specs (Spans 1 col) */}
                    <div className="bento-item col-span-1 relative overflow-hidden rounded-[2.5rem] bg-indigo-600 text-white p-8 md:p-10 flex flex-col justify-center shadow-2xl shadow-indigo-500/20">
                        <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <h3 className="text-2xl font-bold mb-8 relative z-10">Core Specs</h3>
                        <ul className="space-y-6 relative z-10">
                            {[
                                { icon: <Zap size={18} />, text: "Nano-g sensitivity" },
                                { icon: <Radio size={18} />, text: "Low-latency LPWAN" },
                                { icon: <Server size={18} />, text: "Edge AI Processing" },
                                { icon: <ShieldCheck size={18} />, text: "Autonomous Power" }
                            ].map((spec, i) => (
                                <li key={i} className="flex items-center gap-3 text-indigo-100 font-medium">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white">
                                        {spec.icon}
                                    </div>
                                    {spec.text}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Process Flow Cards (3 across) */}
                    <div className="bento-item md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { title: "Detection", desc: "Instantly captures P-waves", icon: <Activity className="w-5 h-5" /> },
                            { title: "Processing", desc: "Edge AI verifies signal", icon: <Cpu className="w-5 h-5" /> },
                            { title: "Alert", desc: "Mass warning sent", icon: <Smartphone className="w-5 h-5" /> }
                        ].map((step, i) => (
                            <div key={i} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 p-6 rounded-3xl flex items-start gap-4 hover:shadow-lg transition-shadow duration-300">
                                <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white">
                                    {step.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-1">{step.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Full Width Dark Banner */}
                    <div className="bento-item col-span-1 md:col-span-3 mt-8 relative rounded-[2.5rem] overflow-hidden bg-black text-white p-8 md:p-16 text-center stats-container">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-black z-0"></div>
                        <div className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>

                        <div className="relative z-10 max-w-4xl mx-auto">
                            <h3 className="text-3xl md:text-5xl font-bold mb-8">Every Second Counts</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                                <div className="text-left space-y-6">
                                    <p className="text-gray-400 text-lg leading-relaxed">
                                        The time between receiving an alert and feeling the shaking can be the difference between life and death.
                                    </p>
                                    <ul className="space-y-3">
                                        {["Automated train stops", "Gas line shutoffs", "People take cover"].map((action, i) => (
                                            <li key={i} className="flex items-center gap-3 text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-green-500" /> {action}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col items-center justify-center p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                                    <Clock className="w-12 h-12 text-blue-500 mb-4" />
                                    <div className="text-6xl font-bold mb-2 flex items-baseline gap-1">
                                        <span className="stat-number">10</span>
                                        <span className="text-2xl text-gray-500">s</span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest">Average Warning Time</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default Technology;
