import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IndiaMap from './IndiaMap';

const Coverage = () => {
    const [hoveredRegion, setHoveredRegion] = useState(null);

    const regions = [
        {
            id: 'north',
            name: "Northern Region (Zone IV-V)",
            desc: "Critical coverage for the Himalayan belt, including Delhi NCR, Uttrakhand, and Himachal Pradesh.",
            count: "450+",
            color: "text-red-500",
            bg: "bg-red-500/10",
            border: "border-red-500/50"
        },
        {
            id: 'west',
            name: "Western Region (Zone III-IV)",
            desc: "Extensive sensor grid covering Kutch, Gujarat, extending down to Mumbai and Pune.",
            count: "350+",
            color: "text-orange-500",
            bg: "bg-orange-500/10",
            border: "border-orange-500/50"
        },
        {
            id: 'east',
            name: "Eastern Region (Zone V)",
            desc: "High-density deployment in Assam, Meghalaya, and the Shillong Plateau.",
            count: "300+",
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-purple-500/50"
        },
        {
            id: 'central',
            name: "Central Region (Zone III)",
            desc: "Monitoring the Narmada-Son lineament and seismically active zones in MP/Maharashtra border.",
            count: "200+",
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/50"
        }
    ];

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section id="coverage" className="relative py-32 bg-gray-50 dark:bg-zinc-950 overflow-hidden transition-colors duration-500">
            {/* Glow Effects - Light Mode */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/60 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-100/60 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none mix-blend-multiply dark:mix-blend-normal transition-colors"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Header */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm transition-colors mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-green-600 dark:text-green-400">
                            Live Network Status
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 font-display transition-colors">
                        Pan-India Coverage
                    </h2>
                    <p className="text-xl text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors">
                        Deployed in high-risk zones (Seismic Zones IV & V) to ensure maximum safety for population centers.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                    {/* Interactive Map Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 relative flex justify-center"
                    >
                        {/* Map Container */}
                        <div className="relative w-full max-w-xl aspect-[4/5] bg-white/60 dark:bg-zinc-900/60 rounded-[3rem] border-2 border-white dark:border-white/20 shadow-2xl shadow-blue-900/5 dark:shadow-none p-4 md:p-8 backdrop-blur-xl flex items-center justify-center transition-colors">

                            {/* The Code-Based SVG Map */}
                            <IndiaMap
                                hoveredRegion={hoveredRegion}
                            />

                            {/* Bottom Status Bar */}
                            <div className="hidden md:flex absolute bottom-6 left-6 right-6 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-2xl border border-white/60 dark:border-white/10 shadow-lg p-4 justify-between items-center group hover:scale-[1.02] transition-transform">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-zinc-700 border-2 border-white dark:border-zinc-800 flex items-center justify-center text-[10px] text-gray-400 font-bold shadow-sm transition-colors">
                                                <span className="animate-pulse text-blue-500">●</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        <p className="font-semibold text-gray-900 dark:text-white">System Optimizing</p>
                                        <p>Real-time sync active</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white tracking-tight">1,342</p>
                                    <p className="text-[10px] uppercase tracking-wider text-green-600 dark:text-green-400 font-bold">Sensors Online</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Region Details List */}
                    <div className="lg:col-span-5 space-y-4">
                        {regions.map((region) => (
                            <motion.div
                                key={region.id}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                onMouseEnter={() => setHoveredRegion(region.id)}
                                onMouseLeave={() => setHoveredRegion(null)}
                                className={`group p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${hoveredRegion === region.id
                                    ? `bg-white dark:bg-zinc-900 border-blue-100 dark:border-blue-900/30 shadow-xl shadow-blue-500/10 scale-[1.02]`
                                    : 'bg-white/50 dark:bg-white/5 border-transparent hover:bg-white dark:hover:bg-zinc-800 hover:border-gray-200 dark:hover:border-white/10 hover:shadow-md'
                                    }`}
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className={`text-lg font-bold transition-colors ${hoveredRegion === region.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                                        {region.name}
                                    </h3>
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium font-mono ${region.bg} ${region.color}`}>
                                        {region.count} Nodes
                                    </span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed transition-colors">
                                    {region.desc}
                                </p>
                            </motion.div>
                        ))}

                        {/* Expansion Card */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            onMouseEnter={() => setHoveredRegion('south')}
                            onMouseLeave={() => setHoveredRegion(null)}
                            className="mt-8 p-1 rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 cursor-pointer shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-shadow"
                        >
                            <div className="bg-white/95 dark:bg-zinc-900/95 rounded-[22px] p-6 text-center backdrop-blur-sm transition-colors">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-2 transition-colors">Expanding to Zone III</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-5 transition-colors">
                                    We are actively deploying 500+ new sensors in Southern India this quarter.
                                </p>
                                <button className="w-full py-3 rounded-xl bg-gray-50 dark:bg-white/10 text-gray-900 dark:text-white font-semibold text-sm hover:bg-gray-100 dark:hover:bg-white/20 transition-colors border border-gray-200 dark:border-white/10">
                                    View Expansion Roadmap
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Coverage;
