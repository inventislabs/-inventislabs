import React, { useState } from 'react';
import { Clock, ShieldAlert, Zap, Building2, Landmark, CheckCircle2, ArrowRight, Server, Cloud, Smartphone, Bell } from 'lucide-react';

const EarlyWarning = () => {
    const [activeTab, setActiveTab] = useState('government');

    return (
        <section className="py-24 bg-white dark:bg-black transition-colors duration-500 font-display border-t border-gray-100 dark:border-white/5">
            <div className="max-w-7xl mx-auto px-6">

                {/* Intro Block */}
                <div className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-semibold uppercase tracking-wide mb-6">
                        <ShieldAlert className="w-4 h-4" /> Section A
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        EQ-Alert: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Earthquake Early Warning</span>
                    </h2>

                    <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        EQ-Alert is InventisLabs' indigenous earthquake early warning system designed to detect seismic activity and deliver critical alerts <span className="font-semibold text-gray-900 dark:text-white">seconds before strong shaking arrives</span>.
                    </p>

                    <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                        By leveraging IoT sensors, edge computing, and AI-powered processing, EQ-Alert provides life-saving lead time for governments, industries, and communities across India's most vulnerable seismic zones.
                    </p>
                </div>

                {/* Architecture Illustration */}
                <div className="mb-12 md:mb-20">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-zinc-900 dark:to-blue-950/20 rounded-3xl p-6 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">

                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                            System Architecture
                        </h3>

                        {/* Flow Visualization - Single Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto relative">

                            {/* Connecting Line (hidden on mobile) */}
                            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-orange-300 to-red-300 dark:from-blue-700 dark:via-orange-700 dark:to-red-700 -translate-y-1/2 z-0" style={{ top: '60px' }} />

                            {/* Step 1: Seismic Sensors */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-blue-200 dark:border-blue-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 mx-auto">
                                        <Zap className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Seismic Sensors</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        Distributed IoT Nodes
                                    </p>
                                </div>
                            </div>

                            {/* Step 2: Edge Processing */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-orange-200 dark:border-orange-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center mb-4 mx-auto">
                                        <Server className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Edge Processing</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        P-Wave Analysis
                                    </p>
                                </div>
                            </div>

                            {/* Step 3: Central Alert */}
                            <div className="relative z-10">
                                <div className="bg-white dark:bg-zinc-950 rounded-2xl p-6 border border-red-200 dark:border-red-900/30 shadow-lg hover:shadow-xl transition-shadow">
                                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4 mx-auto">
                                        <Bell className="w-7 h-7 text-white" />
                                    </div>
                                    <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">Central Alert</h4>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                        Cloud & Siren Control
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>{/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-gray-100 dark:bg-zinc-900 rounded-2xl p-2 gap-2 border border-gray-200 dark:border-white/10">
                        <button
                            onClick={() => setActiveTab('government')}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'government'
                                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Landmark className="w-4 h-4" />
                            For Governments & Disaster Authorities
                        </button>
                        <button
                            onClick={() => setActiveTab('industry')}
                            className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === 'industry'
                                ? 'bg-white dark:bg-zinc-800 text-gray-900 dark:text-white shadow-lg'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            For Industry & Infrastructure Operators
                        </button>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="max-w-5xl mx-auto">
                    {activeTab === 'government' && (
                        <div className="bg-gradient-to-br from-white to-blue-50/30 dark:from-zinc-900 dark:to-blue-950/10 rounded-3xl p-6 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                    <Landmark className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Government & Disaster Authorities
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Empower state and national disaster management teams with regional early warning capabilities to protect millions of citizens.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Regional EEW Networks</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Deploy sensor arrays across seismically vulnerable zones for citywide or state-level coverage.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Mass Public Alert Systems</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Integrate with sirens, SMS gateways, mobile apps, and radio for instant public notifications.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Command Center Dashboards</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Real-time monitoring and coordination tools for disaster response teams and control rooms.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Data Analytics & Reporting</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Historical seismic data analysis, event logs, and post-incident reporting for policy planning.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'industry' && (
                        <div className="bg-gradient-to-br from-white to-orange-50/30 dark:from-zinc-900 dark:to-orange-950/10 rounded-3xl p-6 md:p-12 border border-gray-200 dark:border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                    <Building2 className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    Industry & Infrastructure Operators
                                </h3>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                Safeguard critical infrastructure and industrial operations with automated shutdown protocols and real-time alerts.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Site-Specific Early Warning</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Customized EEW for factories, power plants, chemical facilities, and manufacturing units.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Automated Safety Protocols</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Trigger automated gas line shutdowns, elevator halts, and machinery stop sequences.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">SCADA & Control System Integration</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">API-based integration with existing industrial control systems and IoT platforms.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">Asset & Personnel Protection</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Protect high-value equipment and ensure worker safety with advance warning systems.</p>
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

export default EarlyWarning;
