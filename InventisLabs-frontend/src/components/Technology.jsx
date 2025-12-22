import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Technology = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [0, -100]);

    // Fade up animation variant
    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <section id="technology" ref={containerRef} className="relative py-24 md:py-32 bg-white dark:bg-black text-gray-900 dark:text-white overflow-hidden transition-colors duration-500">
            {/* Background/Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-0">
                <div className="absolute top-40 left-[10%] w-[400px] h-[400px] bg-blue-100/40 dark:bg-blue-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal animate-pulse transition-colors" />
                <div className="absolute bottom-40 right-[10%] w-[300px] h-[300px] bg-purple-100/40 dark:bg-purple-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-normal animate-pulse transition-colors" style={{ animationDelay: '2s' }} />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm transition-colors">
                        <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300">
                            Unique Structure
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-gray-900 dark:text-white mb-6 transition-colors">
                        Our Technology
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors">
                        Discover the engineering behind milliseconds-latency earthquake detection.
                    </p>
                </motion.div>

                {/* Part 1: Sensor & Network */}
                <div className="grid lg:grid-cols-2 gap-20 mb-32 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                        className="order-2 lg:order-1"
                    >
                        <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white transition-colors">Network of IoT Sensors</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-8 leading-relaxed transition-colors">
                            Our proprietary IoT sensors form a dense network across seismically active regions. These highly sensitive devices can detect <span className="text-blue-600 font-semibold">P-waves</span> — the first, faster-moving but less damaging seismic waves that precede the more destructive S-waves.
                        </p>

                        <div className="bg-white/80 dark:bg-white/5 rounded-3xl p-8 border border-gray-100 dark:border-white/10 shadow-xl shadow-gray-200/50 dark:shadow-none backdrop-blur-md transition-colors">
                            <h4 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-6 pb-2 border-b border-gray-100 dark:border-white/10 transition-colors">Core Specs</h4>
                            <ul className="space-y-4">
                                {[
                                    "High-precision accelerometers (nano-g sensitivity)",
                                    "Autonomous solar charging backup",
                                    "Low-latency LPWAN connectivity",
                                    "Edge AI for false-positive reduction"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-4 group cursor-default"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                            <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-gray-600 dark:text-gray-300 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Advanced Sensor Visualization */}
                    <motion.div
                        className="order-1 lg:order-2 flex justify-center py-10"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ y: yMove }}
                    >
                        <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem]">
                            {/* Orbiting Elements */}
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="absolute inset-0 border border-gray-200 dark:border-white/10 rounded-full transition-colors"
                                    style={{ animation: `spin ${20 + i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}` }}>
                                    <div className="absolute -top-1.5 left-1/2 w-3 h-3 bg-white dark:bg-gray-800 border-2 border-blue-500 rounded-full shadow-md"></div>
                                </div>
                            ))}

                            {/* Central Sensor Core */}
                            <motion.div
                                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)" }}
                                className="absolute inset-0 m-auto w-48 h-48 md:w-56 md:h-56 bg-white dark:bg-black rounded-[2rem] border border-gray-100 dark:border-white/10 shadow-2xl flex flex-col items-center justify-center z-10 overflow-hidden cursor-pointer transition-colors"
                            >
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-50"></div>
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="p-5 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30">
                                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Signal Waves */}
                            <div className="absolute inset-0 m-auto w-48 h-48 rounded-[2rem] border-2 border-blue-500 opacity-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Part 2: Workflow Steps */}
                <div className="mb-32 relative">
                    <div className="text-center mb-20">
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white inline-block transition-colors">
                            Milliseconds to Safety
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                title: "Detection",
                                desc: "Sensors detect initial P-waves instantly.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                ),
                                delay: 0
                            },
                            {
                                title: "Processing",
                                desc: "AI verifies event & estimates arrival time.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                                ),
                                delay: 0.2
                            },
                            {
                                title: "Alert",
                                desc: "Warnings distributed to millions instantly.",
                                icon: (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                                ),
                                delay: 0.4
                            }
                        ].map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: step.delay, duration: 0.5 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)" }}
                                className="relative bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm dark:shadow-none transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-gray-50 dark:bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                                        {step.icon}
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{step.title}</h4>
                                <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Horizontal Flow Line */}
                    <div className="hidden md:block absolute top-[120px] left-10 right-10 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent -z-10 transition-colors"></div>
                </div>

                {/* Part 3: Time Metrics Dashboard */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative rounded-[2.5rem] bg-gray-900 text-white overflow-hidden shadow-2xl"
                >
                    {/* Dashboard Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>

                    <div className="relative z-10 p-8 md:p-16 grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-6">Every Second Counts</h3>
                            <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
                                The time between receiving an alert and feeling the earthquake depends on your distance from the epicenter.
                                <br /><br />
                                <strong className="text-white">Even 5 seconds</strong> is enough to:
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "Take cover under a desk",
                                    "Stop trains & elevators (Automatic)",
                                    "Shut down gas lines"
                                ].map((item, i) => (
                                    <motion.li
                                        key={i}
                                        whileHover={{ x: 5 }}
                                        className="flex items-center gap-3 group cursor-default"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 text-xs">✓</span>
                                        <span className="text-gray-300 group-hover:text-white transition-colors">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-gray-800/50 p-6 rounded-3xl border border-gray-700/50 flex flex-col items-center justify-center aspect-square text-center backdrop-blur-sm cursor-default"
                            >
                                <span className="text-4xl md:text-6xl font-black text-white mb-1">5-10<span className="text-2xl align-top text-gray-500 font-medium">s</span></span>
                                <span className="text-xs uppercase tracking-widest text-blue-400">Warning Time</span>
                                <span className="text-[10px] text-gray-500 mt-2">10-20km distance</span>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl flex flex-col items-center justify-center aspect-square text-center shadow-2xl shadow-blue-900/50 cursor-pointer"
                            >
                                <span className="text-4xl md:text-6xl font-black text-white mb-1">20<span className="text-3xl align-top opacity-70">+</span></span>
                                <span className="text-xs uppercase tracking-widest text-blue-100">Seconds</span>
                                <span className="text-[10px] text-blue-100/60 mt-2">40km+ distance</span>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Technology;
