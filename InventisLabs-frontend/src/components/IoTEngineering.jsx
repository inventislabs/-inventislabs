import React, { useState } from 'react';
import { Cpu, Zap, CheckCircle2, Lightbulb, Layers, Smartphone, Workflow } from 'lucide-react';

const IoTEngineering = () => {
    const [activeTab, setActiveTab] = useState('founders');

    return (
        <section className="py-24 bg-white dark:bg-black transition-colors duration-500 font-display border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* Intro Block */}
                <div className="text-center max-w-4xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 text-sm font-semibold uppercase tracking-wide mb-6">
                        <Cpu className="w-4 h-4" /> Section C
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        Embedded & IoT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">Engineering Lab</span>
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        Custom hardware-software systems designed and built for <span className="font-semibold text-gray-900 dark:text-white">founders, enterprises, and research institutions</span>.
                    </p>

                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                        Our engineering lab specializes in end-to-end IoT product development—from concept and prototyping to production-ready devices with cloud integration, mobile apps, and edge AI capabilities.
                    </p>
                </div>

                {/* Architecture Illustration */}
                <div className="mb-20">
                    <div className="bg-gradient-to-br from-gray-50 to-purple-50/30 dark:from-zinc-900 dark:to-purple-950/20 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            Full-Stack IoT Development
                        </h3>

                        {/* Flow Visualization - Single Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">

                            {/* Connecting Line (hidden on mobile) */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-300 via-pink-300 to-orange-300 dark:from-purple-700 dark:via-pink-700 dark:to-orange-700 -translate-y-1/2 z-0" style={{ top: '60px' }} />

                            {/* Step 1: Hardware Design */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-purple-200 dark:border-purple-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4 mx-auto">
                                        <Cpu className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Hardware Design</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        Embedded PCBs & Sensors
                                    </p>
                                </div>
                            </div>

                            {/* Step 2: Firmware & Edge AI */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-pink-200 dark:border-pink-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center mb-4 mx-auto">
                                        <Workflow className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Firmware & Edge AI</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        On-Device Intelligence
                                    </p>
                                </div>
                            </div>

                            {/* Step 3: Cloud & Apps */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-orange-200 dark:border-orange-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 mx-auto">
                                        <Smartphone className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Cloud & Apps</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        Backend & Mobile UI
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 dark:bg-zinc-900 rounded-2xl p-2 gap-2 border border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => setActiveTab('founders')}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'founders'
                                    ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Lightbulb className="w-4 h-4" />
                            For Founders & Startups
                        </button>
                        <button
                            onClick={() => setActiveTab('enterprise')}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'enterprise'
                                    ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-lg'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Layers className="w-4 h-4" />
                            For Enterprises & Research Labs
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-5xl mx-auto">
                    {activeTab === 'founders' && (
                        <div className="bg-gradient-to-br from-white to-purple-50/30 dark:from-zinc-900 dark:to-purple-950/10 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                                    <Lightbulb className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Founders & Startups
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Turn your IoT product vision into reality with full-stack engineering support—from MVP to market-ready devices.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Rapid Prototyping</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Go from concept sketch to working prototype in weeks, not months—ideal for investor demos.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Custom PCB & Sensor Integration</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Embedded hardware design with sensor fusion, low-power optimization, and wireless connectivity.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Cloud Backend & API Development</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Scalable cloud infrastructure with data pipelines, analytics, and REST/MQTT APIs.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Mobile & Web App Development</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Cross-platform apps (iOS/Android) and responsive dashboards for device control and monitoring.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'enterprise' && (
                        <div className="bg-gradient-to-br from-white to-pink-50/30 dark:from-zinc-900 dark:to-pink-950/10 rounded-3xl p-8 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-orange-600 flex items-center justify-center">
                                    <Layers className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Enterprises & Research Labs
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Partner with us for mission-critical IoT systems, industrial automation, and advanced research instrumentation.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Industrial IoT Solutions</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">SCADA integration, PLC interfacing, and factory automation with predictive analytics.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Research Instrumentation</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Custom data acquisition systems, high-precision sensors, and lab automation tools.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Edge AI & Machine Learning</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Deploy TinyML models on embedded devices for real-time inference and anomaly detection.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-pink-600 dark:text-pink-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Compliance & Certification Support</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Assistance with CE, FCC, UL certifications and adherence to industry standards.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </section>
    );
};

export default IoTEngineering;
