import React, { useState } from 'react';
import { Activity, Radio, Cpu, Server, ShieldCheck, ArrowRight, CheckCircle2, Building2 } from 'lucide-react';
import Footer from '../components/Footer';

const Solutions = () => {
    const [activeTab, setActiveTab] = useState('government');

    return (
        <div className="min-h-screen bg-white dark:bg-black text-[#1d1d1f] dark:text-white font-display pt-20 transition-colors duration-500">

            {/* Page Header */}
            <section className="bg-[#F5F5F7] dark:bg-zinc-900 py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Solutions</h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-10">
                        Advanced sensing and early warning systems for resilience, safety, and operational continuity.
                    </p>

                    {/* Anchor Navigation */}
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#eq-alert"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-900 dark:text-white hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all"
                        >
                            <Activity className="w-4 h-4" />
                            EQ-Alert (EEW)
                        </a>
                        <a
                            href="#structural"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-900 dark:text-white hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all"
                        >
                            <Building2 className="w-4 h-4" />
                            Structural Monitoring
                        </a>
                        <a
                            href="#embedded"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-white/10 rounded-full text-sm font-semibold text-gray-900 dark:text-white hover:border-purple-500 dark:hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                        >
                            <Cpu className="w-4 h-4" />
                            Embedded & IoT Lab
                        </a>
                    </div>
                </div>
            </section>

            {/* Section A: EQ-Alert */}
            <section id="eq-alert" className="py-24 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs font-semibold uppercase tracking-wide mb-4">
                            Flagship Product
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">EQ-Alert: Earthquake Early Warning</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl leading-relaxed">
                            A state-of-the-art, indigenous early warning system that detects primary seismic waves to provide crucial seconds of warning before destructive shaking arrives.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex flex-col md:flex-row gap-8 mb-16">
                        <div className="flex md:flex-col gap-2 md:w-1/4">
                            <button
                                onClick={() => setActiveTab('government')}
                                className={`text-left px-6 py-4 rounded-xl font-medium transition-all ${activeTab === 'government' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
                            >
                                For Governments & Authorities
                            </button>
                            <button
                                onClick={() => setActiveTab('industry')}
                                className={`text-left px-6 py-4 rounded-xl font-medium transition-all ${activeTab === 'industry' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-700'}`}
                            >
                                For Industry & Infrastructure
                            </button>
                        </div>

                        <div className="flex-1 bg-gray-50 dark:bg-zinc-900/50 rounded-3xl p-8 border border-gray-100 dark:border-white/5 min-h-[300px]">
                            {activeTab === 'government' ? (
                                <div className="animate-fadeIn">
                                    <h3 className="text-2xl font-bold mb-4">City & State-Wide Protection</h3>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Mass alerting via sirens and public broadcast systems.",
                                            "Integration with Emergency Operation Centers (EOC).",
                                            "Real-time shake maps for rapid response deployment.",
                                            "Public safety mobile app integration."
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="animate-fadeIn">
                                    <h3 className="text-2xl font-bold mb-4">Operational Continuity & Safety</h3>
                                    <ul className="space-y-4 mb-8">
                                        {[
                                            "Automated shutdown of gas valves and hazardous lines.",
                                            "Controlled elevator stopping and door opening.",
                                            "Industrial plant safe-mode activation.",
                                            "Employee safety notifications via PA systems."
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle2 className="w-5 h-5 text-green-500 mt-1" />
                                                <span className="text-gray-700 dark:text-gray-300">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* System Architecture Diagram */}
                    <div className="bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-white/10 p-8 md:p-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-slate-100 dark:bg-grid-slate-900/[0.04] mask-gradient" />
                        <h3 className="text-xl font-bold mb-12 relative z-10 text-center">System Architecture</h3>

                        <div className="relative z-10 flex items-center justify-center gap-8 md:gap-16">
                            {/* Step 1 */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                                    <Radio className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold mb-2 text-center">Seismic Sensors</h4>
                                <p className="text-sm text-gray-500 text-center">Distributed IoT Nodes</p>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center text-gray-300">
                                <ArrowRight className="w-6 h-6" />
                            </div>

                            {/* Step 2 */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400">
                                    <Cpu className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold mb-2 text-center">Edge Processing</h4>
                                <p className="text-sm text-gray-500 text-center">P-Wave Analysis</p>
                            </div>

                            {/* Arrow */}
                            <div className="flex justify-center text-gray-300">
                                <ArrowRight className="w-6 h-6" />
                            </div>

                            {/* Step 3 */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4 text-red-600 dark:text-red-400">
                                    <Server className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold mb-2 text-center">Central Alert</h4>
                                <p className="text-sm text-gray-500 text-center">Cloud & Siren Control</p>
                            </div>
                        </div>
                    </div>

                    {/* Learn More Button */}
                    <div className="mt-12 flex flex-wrap gap-4">
                        <a
                            href="/solutions/eq-alert"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-orange-500/20 hover:scale-105"
                        >
                            Learn more about EQ-Alert <ArrowRight className="w-4 h-4" />
                        </a>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:text-white rounded-full font-semibold transition-all"
                        >
                            Request Pilot Program
                        </a>
                    </div>
                </div>
            </section >

            {/* Section B: Structural Monitoring */}
            < section id="structural" className="py-24 px-6 bg-[#F5F5F7] dark:bg-zinc-900/50" >
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wide mb-4">
                            Infrastructure Health
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Structural & Geotechnical Monitoring</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            Continuous, intelligent sensing for bridges, high-rise buildings, dams, and industrial foundations. Our systems detect tilt, vibration, and stress anomalies before they become critical failures.
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 mb-8">
                            Fully integrable with the EQ-Alert network to provide automated structural soundness assessments post-earthquake.
                        </p>
                        <ul className="space-y-3">
                            {["Tilt & Vibration Sensing", "Foundation Settlement Monitoring", "Crack Detection", "Load Monitoring"].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 font-medium">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> {item}
                                </li>
                            ))}
                        </ul>

                        {/* Learn More Button */}
                        <a
                            href="/solutions/structural-monitoring"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-indigo-500/20 hover:scale-105 mt-8"
                        >
                            Learn more about Structural Monitoring <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                    <div className="relative">
                        <div className="aspect-[4/3] bg-white dark:bg-black rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl p-8 flex items-center justify-center relative overflow-hidden">
                            {/* Abstract Building Visualization */}
                            <Building2 className="w-48 h-48 text-gray-200 dark:text-zinc-800" strokeWidth={0.5} />

                            {/* Sensor Points */}
                            <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-500/20" />
                            <div className="absolute bottom-1/3 right-1/3 w-4 h-4 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-500/20 delay-100" />
                            <div className="absolute bottom-10 left-1/2 w-4 h-4 rounded-full bg-blue-500 animate-pulse ring-4 ring-blue-500/20 delay-200" />

                            <div className="absolute top-4 right-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">
                                Structural Health: Good
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Section C: Embedded & IoT Lab */}
            < section id="embedded" className="py-24 px-6 bg-white dark:bg-black" >
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-xs font-semibold uppercase tracking-wide mb-4">
                        R&D Services
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Embedded & IoT Engineering Lab</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
                        We don't just build our own products; we engineer custom hardware-software systems for founders, enterprises, and research labs.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        {[
                            { title: "Custom PCB Design", desc: "High-speed, multi-layer board design and prototyping.", icon: <Cpu /> },
                            { title: "Firmware Development", desc: "Real-time RTOS, bare-metal coding, and driver development.", icon: <Server /> },
                            { title: "Industrial Integration", desc: "Connecting legacy machinery to modern cloud infrastructure.", icon: <Activity /> }
                        ].map((card, i) => (
                            <div key={i} className="bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-white/5 p-8 rounded-3xl text-left hover:border-purple-500/30 transition-colors">
                                <div className="w-12 h-12 bg-white dark:bg-white/5 rounded-xl flex items-center justify-center mb-6 text-purple-600 dark:text-purple-400">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{card.desc}</p>
                            </div>
                        ))}
                    </div>

                    <a href="/solutions/iot-engineering" className="inline-flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-purple-500/20 hover:scale-105 mr-4">
                        Learn more about IoT Engineering Lab <ArrowRight className="w-4 h-4" />
                    </a>
                    <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white rounded-full font-semibold transition-all">
                        Discuss a Hardware Project <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section >

            <Footer />
        </div >
    );
};

export default Solutions;
