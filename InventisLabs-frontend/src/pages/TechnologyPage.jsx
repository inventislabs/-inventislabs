import React from 'react';
import { Database, Network, Lock, Zap, ArrowRight, Layers, Shield } from 'lucide-react';
import Footer from '../components/Footer';

const TechnologyPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display pt-20 transition-colors duration-500">

            {/* Page Header */}
            <section className="bg-[#F5F5F7] dark:bg-zinc-900 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Technology</h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl">
                        Deep-tech engineering built on years of research, indigenous innovation, and rigorous field testing.
                    </p>
                </div>
            </section>

            {/* Deep Tech Foundation */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Deep-Tech Foundation</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            InventisLabs was born out of a need for indigenous, high-precision sensing in India. Our technology stack is not white-labeled; it is built from the ground up, starting from sensor design to the final alert diffusion algorithms.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            We follow a rigorous R&D pipeline aimed at solving India-specific challenges, such as high population density, varying geography, and the need for cost-effective yet reliable hardware.
                        </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-zinc-900 p-8 rounded-3xl border border-gray-100 dark:border-white/5">
                        <div className="flex flex-col gap-6">
                            {/* Pipeline Diagram Step 1 */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center font-bold text-blue-600 text-sm">01</div>
                                <div>
                                    <h4 className="font-bold">Academic Research</h4>
                                    <p className="text-sm text-gray-500">Guidance from IIT Roorkee Dept. of EQ Engineering</p>
                                </div>
                            </div>
                            <div className="h-8 w-0.5 bg-gray-200 dark:bg-white/10 ml-5"></div>
                            {/* Pipeline Diagram Step 2 */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center font-bold text-indigo-600 text-sm">02</div>
                                <div>
                                    <h4 className="font-bold">Prototype & Lab Testing</h4>
                                    <p className="text-sm text-gray-500">Shake-table verification and sensor calibration</p>
                                </div>
                            </div>
                            <div className="h-8 w-0.5 bg-gray-200 dark:bg-white/10 ml-5"></div>
                            {/* Pipeline Diagram Step 3 */}
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center font-bold text-green-600 text-sm">03</div>
                                <div>
                                    <h4 className="font-bold">Field Deployment</h4>
                                    <p className="text-sm text-gray-500">Real-world feedback loops and AI model tuning</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How EQ Alert Works */}
            <section className="py-24 px-6 bg-[#F5F5F7] dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide mb-4">
                            Mechanism
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">How EQ-Alert Works</h2>
                        <p className="text-gray-500 dark:text-gray-400">From P-wave detection to mass notification in milliseconds.</p>
                    </div>

                    <div className="max-w-5xl mx-auto relative">
                        {/* Connecting Line */}
                        <div className="absolute top-8 left-0 w-full h-0.5 bg-gray-200 dark:bg-white/10 hidden md:block z-0"></div>

                        <div className="grid md:grid-cols-3 gap-10 relative z-10">
                            {/* Step 1 */}
                            <div className="bg-white dark:bg-black p-8 rounded-3xl border border-gray-100 dark:border-white/10 text-center">
                                <div className="w-16 h-16 mx-auto bg-white dark:bg-black border-4 border-[#F5F5F7] dark:border-zinc-800 rounded-full flex items-center justify-center mb-6 relative">
                                    <Zap className="text-yellow-500 w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">1. Detection</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Networked sensors detect the initial, non-damaging Primary (P) waves which travel faster than the destructive Secondary (S) waves.
                                </p>
                            </div>

                            {/* Step 2 */}
                            <div className="bg-white dark:bg-black p-8 rounded-3xl border border-gray-100 dark:border-white/10 text-center">
                                <div className="w-16 h-16 mx-auto bg-white dark:bg-black border-4 border-[#F5F5F7] dark:border-zinc-800 rounded-full flex items-center justify-center mb-6 relative">
                                    <Database className="text-blue-500 w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">2. Processing</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Algorithms instantly analyze the magnitude and location at the edge or cloud, filtering out false positives from traffic or construction.
                                </p>
                            </div>

                            {/* Step 3 */}
                            <div className="bg-white dark:bg-black p-8 rounded-3xl border border-gray-100 dark:border-white/10 text-center">
                                <div className="w-16 h-16 mx-auto bg-white dark:bg-black border-4 border-[#F5F5F7] dark:border-zinc-800 rounded-full flex items-center justify-center mb-6 relative">
                                    <Network className="text-red-500 w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">3. Alert & Action</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                    Warnings are broadcasted to sirens, mobile apps, and control systems to auto-shutdown critical infrastructure before S-waves arrive.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Indigenous Hardware */}
            <section className="py-24 px-6 bg-white dark:bg-black text-white">
                <div className="max-w-7xl mx-auto bg-[#1d1d1f] rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Indigenous Hardware Architecture</h2>
                        <div className="grid md:grid-cols-2 gap-12 text-gray-300">
                            <div>
                                <p className="text-lg leading-relaxed mb-6">
                                    Designed in India, for India. Our hardware is built to withstand extreme environmental conditions while maintaining high-fidelity data acquisition.
                                </p>
                                <p className="text-lg leading-relaxed">
                                    Unlike imported black-box solutions, our modular architecture allows for seamless upgrades, multi-hazard sensing integration, and full data sovereignty.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { label: "MEMS Sensors", icon: <Layers className="w-5 h-5" /> },
                                    { label: "Secure Comms", icon: <Lock className="w-5 h-5" /> },
                                    { label: "Edge AI", icon: <Database className="w-5 h-5" /> },
                                    { label: "Ruggedized", icon: <Shield className="w-5 h-5" /> },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/10 transition-colors">
                                        {item.icon}
                                        <span className="text-sm font-bold text-white">{item.label}</span>
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
